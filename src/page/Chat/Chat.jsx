import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//
import { ref, set, get, query, onValue, update } from 'firebase/database';
import {
  getDownloadURL,
  uploadBytes,
  ref as ref_storage
} from 'firebase/storage';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import 'moment/locale/ru';
import { usePubNub } from 'pubnub-react';

import { database, storage } from '../../api/firebase';
// styles
import styles from './Chat.module.scss';
// components
import Sidebar from '../../components/Sidebar/Sidebar';
import MessageForm from '../../components/MessageForm/MessageForm';
import Message from '../../components/Message/Message';
import DialogListQueue from '../../components/DialogListQueue/DialogListQueue';

// Redux
import ChatHeader from '../../components/ChatHeader/ChatHeader';

const Chat = () => {
  const pubnub = usePubNub();
  const { user } = useSelector(({ auth }) => auth);
  const [dialog, setDialog] = useState({});
  const [img, setImg] = useState('');
  const [message, setMessage] = useState([]);
  const [operator, setOperator] = useState({});
  const [text, setText] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [countQueueDialog, setCountQueueDialog] = useState([]);
  const [dialogStatus, setDialogStatus] = useState('');
  const [indicatorMessage, setIndicatorMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const operatorId = user.uid;

  moment.locale('ru');

  useEffect(() => {
    viewOperator();
    fetchDialog();
    fetchingStatusDialog();
    typingMegase();
  }, [countQueueDialog, dialog, indicatorMessage]);

  const viewOperator = async () => {
    const operatorRef = ref(database, 'operators/' + user.uid);
    onValue(operatorRef, (snapshot) => {
      setOperator(snapshot.val());
    });
  };

  const fetchingStatusDialog = async () => {
    const dialogRef = query(ref(database, 'dialogs/' + dialog.dialogId));
    get(dialogRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          setDialogStatus(data.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const selectDialog = async (dialogData) => {
    setDialog(dialogData);
    setShowMessage(true);
    const msgRef = query(ref(database, 'messages/' + dialogData.dialogId));
    get(msgRef).then((snapshot) => {
      setMessage(snapshot.val());
    });
  };

  const fetchDialog = async () => {
    const msgRef = query(ref(database, 'messages/' + dialog.dialogId));
    get(msgRef).then((snapshot) => {
      if (snapshot.exists()) {
        setMessage({ ...snapshot.val() });
      }
    });
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!text || !text.length) {
      toast.warning('Введите что-нибудь...');
      return false;
    }

    let url;
    if (img) {
      const imgRef = ref_storage(storage, `images/${img.name}`);
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(
        ref_storage(storage, snap.ref.fullPath)
      );
      url = dlUrl;
    }

    const msgArr = Object.keys(message);
    const id = msgArr.length;
    const data = {
      writtenBy: 'operator',
      content: text,
      media: url || '',
      timestamp: moment().format()
    };
    await update(ref(database, 'dialogs/' + dialog.dialogId), {
      lastMessage: text,
      lastActivity: moment().format()
    });
    await set(ref(database, 'messages/' + dialog.dialogId + `/${id}`), data);

    setText('');
    setImg('');
  };

  const typingMegase = () => {
    const inputHasText = indicatorMessage.length > 0;
    if ((inputHasText && isTyping) || (!inputHasText && !isTyping)) {
      setIsTyping(!isTyping);
      pubnub.signal({
        channel: 'is-typing',
        message: inputHasText ? '1' : '0'
      });
    }
  };

  return (
    <div className={styles['container']}>
      <Sidebar dialogData={selectDialog} operatorId={operatorId} />
      <div className={styles['chat-wrapper']}>
        <ChatHeader operator={operator} />
        <div className={styles['counter-search__wrapper']}>
          {!showMessage ? (
            <div className={styles['client-queue']}>
              Клиентов в очереди: <span>{countQueueDialog}</span>
            </div>
          ) : (
            <button
              className="bg-blue-100 text-black p-2 rounded-xl w-full"
              onClick={() => setShowMessage(false)}
            >
              Закрыть диалог
            </button>
          )}
        </div>
        <div className={styles['dialog-wrapper']}>
          {showMessage ? (
            <div className={styles['messages-wrapper']}>
              <InfiniteScroll
                loadMore={fetchDialog}
                hasMore={true}
                className={styles['inf-scroller']}
              >
                {Object.keys(message).map((id, index) => {
                  return (
                    <Message
                      key={id}
                      index={index}
                      dialog={dialog}
                      clientName={dialog.clientName}
                      message={message[id]}
                    />
                  );
                })}
                {!isTyping ? <div>message is typing</div> : null}
              </InfiniteScroll>
              {dialogStatus === 'active' ? (
                <MessageForm
                  handleSendMessage={handleSendMessage}
                  text={text}
                  setText={setText}
                  setImg={setImg}
                  operator={operator}
                  setIndicatorMessage={setIndicatorMessage}
                />
              ) : (
                <div className={styles['disabled-message']}>
                  <span>{dialog.clientName + ' завершил диалог'}</span>
                </div>
              )}
            </div>
          ) : (
            <DialogListQueue
              operatorId={operatorId}
              setCountQueueDialog={setCountQueueDialog}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
