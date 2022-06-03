import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ref,
  set,
  get,
  query,
  update,
  equalTo,
  orderByChild
} from 'firebase/database';

import styles from './DialogListQueue.module.scss';
import { database } from '../../api/firebase';
import { toast } from 'react-toastify';
import moment from 'moment';

const DialogListQueue = ({ operator, setCountQueueDialog }) => {
  const [dialogQueue, setDialogQueue] = useState({});
  const [dialogListView, setDialogListView] = useState(true);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    getDialogQueue();
  }, [dialogQueue]);

  const getDialogQueue = async () => {
    const queryDialog = query(
      ref(database, 'dialogs/'),
      orderByChild('status'),
      equalTo('queue')
    );
    get(queryDialog).then((snapshot) => {
      if (snapshot.exists()) {
        setDialogQueue(snapshot.val());
        const arrData = Object.keys(snapshot.val());
        setCountQueueDialog(arrData.length);
        setDialogListView(true);
      } else {
        setDialogListView(!dialogListView);
        setCountQueueDialog(0);
      }
    });
  };

  const takeDialog = async (event) => {
    const msgRef = query(ref(database, 'messages/' + dialogQueue.dialogId));
    get(msgRef).then((snapshot) => {
      if (snapshot.exists()) {
        setMessage({ ...snapshot.val() });
      }
    });
    const msgArr = Object.keys(message);
    const id = msgArr.length;
    const data = {
      writtenBy: 'operator',
      content: operator.automaticGreeting,
      timestamp: moment().format()
    };

    await update(ref(database, 'dialogs/' + event.dialogId), {
      status: 'active',
      operatorId: operator.operatopId,
      lastMessage: operator.automaticGreeting
    }).then(
      toast.success('🦄 Вы взяли диалог!', {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    );
    await set(ref(database, 'messages/' + event.dialogId + `/${id}`), data);
  };

  return (
    <div className={styles['dialog-queue__wrapper']}>
      {dialogListView
        ? Object.keys(dialogQueue).map((uid, index) => {
            return (
              <div className={styles['dialog-item']} key={uid}>
                <div className={styles['dialog-info']}>
                  <div className={styles['queue-number']}>
                    <span>{index + 1}</span>
                  </div>
                  <div className={styles['left-info-dialog']}>
                    <div className={styles['client-name']}>
                      Имя: {dialogQueue[uid].clientName}
                    </div>
                    <div className={styles['theme-appeal']}>
                      Tema: {dialogQueue[uid].themeOfTheAppeal}
                    </div>
                    <div className={styles['subtopic']}>
                      Подтема: {dialogQueue[uid].subtopic}
                    </div>
                  </div>
                  <div className={styles['right-info-dialog']}>
                    <div className={styles['last-message']}>
                      {dialogQueue[uid].lastMessage}
                    </div>
                    <div className={styles['circulation-time']}>
                      <span>{dialogQueue[uid].lastActivity}</span>
                    </div>
                  </div>
                </div>
                <button
                  className={styles['btn-enter-dialog']}
                  onClick={() => takeDialog(dialogQueue[uid])}
                >
                  Войти в диалог
                </button>
              </div>
            );
          })
        : 'нет клиентов в очереди'}
    </div>
  );
};

DialogListQueue.propTypes = {
  setCountQueueDialog: PropTypes.func
};

export default DialogListQueue;
