import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from '../../page/Chat/Chat.module.scss';

const Message = ({ writtenBy, clientName, content, timestamp }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div
      className={
        styles['message'] +
        ' ' +
        `${
          writtenBy === 'client'
            ? styles['message-client']
            : styles['message-operator']
        }`
      }
      ref={scrollRef}
    >
      <div className={styles['username']}>
        {writtenBy === 'client' ? `Клиент ${clientName}` : 'Вы'}
      </div>
      <p className={styles['text']}>{content}</p>
      <div className={styles['time-message']}>
        {moment(new Date(timestamp)).format('LTS')}
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
