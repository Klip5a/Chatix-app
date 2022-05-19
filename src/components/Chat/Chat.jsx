import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ref, get, query, onValue } from 'firebase/database';
import PropTypes from 'prop-types';

import { database } from '../../api/firebase';
import { logOut } from '../../store/actions/actions';
import styles from './Chat.module.scss';
import Sidebar from './Sidebar/Sidebar';
import profileImg from '../../assets/7819_Coll_Pepega.png';

const Chat = () => {
  const { user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState({});
  const [message, setMessage] = useState([]);
  const [operator, setOperator] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const operatorId = user.uid;

  function handleLogout() {
    dispatch(logOut());
  }

  useEffect(() => {
    viewOperator();
  }, []);

  const viewOperator = async () => {
    const operatorRef = ref(database, 'operators/' + user.uid);
    onValue(operatorRef, (snapshot) => {
      setOperator(snapshot.val());
    });
  };

  const selectDialog = async (dialogData) => {
    setDialog(dialogData);
    setShowMessage(true);
    const msgRef = query(ref(database, 'messages/' + dialogData.dialogId));

    get(msgRef).then((snapshot) => {
      if (snapshot.exists()) {
        setMessage({ ...snapshot.val() });
      } else {
        console.log('No data available');
      }
    });
  };

  return (
    <div className={styles['container']}>
      <Sidebar dialogData={selectDialog} operatorId={operatorId} />
      <div className={styles['chat-wrapper']}>
        <div className={styles['chat-header']}>
          <button
            className="bg-blue-600 h-10 text-white rounded-md text-xl"
            type="submit"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <div className={styles['profile']}>
            <span className={styles['profile-email']}>{user.email}</span>
            <img src={profileImg} alt="Pepega.png" />
          </div>
        </div>
        <div className={styles['counter-search__wrapper']}>
          <div className={styles['client-queue']}>
            Клиентов в очереди: <span>10</span>
            <button
              className="bg-red-500 text-white ml-10"
              onClick={() => setShowMessage(false)}
            >
              close dialog
            </button>
          </div>
        </div>
        <div className={styles['chat-message']}>
          {showMessage ? (
            <div className={styles['messages-wrapper']}>
              {Object.keys(message).map((id) => {
                return (
                  <>
                    <div
                      className={
                        styles['message'] +
                        ' ' +
                        `${
                          message[id].writtenBy === 'client'
                            ? styles['message-client']
                            : styles['message-operator']
                        }`
                      }
                      key={id}
                    >
                      <div className={styles['username']}>
                        {message[id].writtenBy === 'client'
                          ? `Клиент ${dialog.clientName}`
                          : `Оператор ${operator.name}`}
                      </div>
                      <p className={styles['text']}>{message[id].content}</p>
                      <div className={styles['time-message']}>
                        {message[id].timestamp}
                      </div>
                    </div>
                    {dialog.status === 'active' ? (
                      <div className={styles['send-message']}>
                        <input type="text" placeholder="Сообщение" />
                        <button>
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

// Chat.propTypes = {
//   operatorId: PropTypes.string.isRequired
// };

export default Chat;
