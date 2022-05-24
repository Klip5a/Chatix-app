import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ref,
  get,
  query,
  update,
  equalTo,
  orderByChild
} from 'firebase/database';

import styles from './DialogListQueue.module.scss';
import { database } from '../../api/firebase';
import { toast } from 'react-toastify';

const DialogListQueue = ({ operatorId, setCountQueueDialog }) => {
  const [dialogQueue, setDialogQueue] = useState({});
  const [dialogListView, setDialogListView] = useState(true);
  useEffect(() => {
    getDialogQueue();
  }, [dialogQueue]);

  const getDialogQueue = () => {
    const queryDialog = query(
      ref(database, 'dialogs/'),
      orderByChild('status'),
      equalTo('queue')
    );
    get(queryDialog).then((snapshot) => {
      if (snapshot.exists()) {
        setDialogListView(true);
        setDialogQueue({ ...snapshot.val() });
        const arrData = Object.keys(snapshot.val());
        setCountQueueDialog(arrData.length);
      } else {
        setDialogListView(!dialogListView);
        setCountQueueDialog(0);
      }
    });
  };

  const takeDialog = async (event) => {
    await update(ref(database, 'dialogs/' + event.dialogId), {
      status: 'active',
      operatorId: operatorId
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
