import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import { ref, set, get, query, onValue, update } from 'firebase/database';
import InfiniteScroll from 'react-infinite-scroller';

import { database } from '../../api/firebase';
import { logOut } from '../../store/actions/actions';
import styles from './Chat.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import profileImg from '../../assets/7819_Coll_Pepega.png';
import MessageForm from '../../components/MessageForm/MessageForm';
import Message from '../../components/Message/Message';
import { toast } from 'react-toastify';

const Chat = () => {
  const { user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState({});
  const [message, setMessage] = useState([]);
  const [operator, setOperator] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [text, setText] = useState('');
  const operatorId = user.uid;

  moment.locale('ru');

  useEffect(() => {
    viewOperator();
  }, []);

  function handleLogout() {
    dispatch(logOut());
  }

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

  const fetchDialog = async () => {
    const msgRef = query(ref(database, 'messages/' + dialog.dialogId));

    get(msgRef).then((snapshot) => {
      if (snapshot.exists()) {
        setMessage({ ...snapshot.val() });
      } else {
        console.log('No data available');
      }
    });
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (text == '' || text.length == 0) {
      toast.warning('Введите что-нибудь...');
      return false;
    }

    const msgArr = Object.keys(message);
    const id = msgArr.length + 1;
    const data = {
      writtenBy: 'operator',
      content: text,
      timestamp: moment().format()
    };
    await update(ref(database, 'dialogs/' + dialog.dialogId), {
      lastMessage: text,
      lastActivity: moment().format()
    });
    await set(ref(database, 'messages/' + dialog.dialogId + `/${id}`), data);
    setText('');
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
          </div>
          {showMessage ? (
            <button
              className="bg-blue-100 text-black p-2 rounded-xl"
              onClick={() => setShowMessage(false)}
            >
              Закрыть диалог
            </button>
          ) : null}
        </div>
        <div className={styles['dialog-wrapper']}>
          {showMessage ? (
            <div className={styles['messages-wrapper']}>
              <InfiniteScroll
                loadMore={fetchDialog}
                hasMore={true}
                className={styles['inf-scroller']}
                useWindow={false}
              >
                {Object.keys(message).map((id) => {
                  return (
                    <Message
                      key={id}
                      clientName={dialog.clientName}
                      operatorName={operator.name}
                      writtenBy={message[id].writtenBy}
                      content={message[id].content}
                      timestamp={message[id].timestamp}
                    />
                  );
                })}
              </InfiniteScroll>
              {dialog.status === 'active' ? (
                <MessageForm
                  handleSendMessage={handleSendMessage}
                  text={text}
                  setText={setText}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Chat;
