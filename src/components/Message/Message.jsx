import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { database } from '../../api/firebase';
import styles from '../../page/Chat/Chat.module.scss';
import { ref, remove, set } from 'firebase/database';

const Message = ({ index, message, clientName, dialog }) => {
  const [showDelete, setShowDelete] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const deleteMessage = async () => {
    await remove(ref(database, 'messages/' + dialog.dialogId + `/${index}`));
  };

  const selectMessage = () => {
    setShowDelete(!showDelete);
  };
  return (
    <div
      className={
        styles['message'] +
        ' ' +
        `${
          message.writtenBy === 'client'
            ? styles['message-client']
            : styles['message-operator']
        }` +
        ' ' +
        `${showDelete ? styles['active'] : null}`
      }
      ref={scrollRef}
      onClick={selectMessage}
    >
      {showDelete ? (
        <button className={styles['delete-message']} onClick={deleteMessage}>
          x
        </button>
      ) : null}
      <div className={styles['username']}>
        {message.writtenBy === 'client' ? `Клиент ${clientName}` : 'Вы'}
      </div>
      {message.media ? <img src={message.media} alt={message.text} /> : null}
      <p className={styles['text']}>{message.content}</p>
      <div className={styles['time-message']}>
        {moment(new Date(message.timestamp)).format('LTS')}
      </div>
    </div>
  );
};

Message.propTypes = {
  writtenBy: PropTypes.string,
  operatorName: PropTypes.string,
  clientName: PropTypes.string,
  content: PropTypes.string,
  timestamp: PropTypes.string
};

export default Message;
