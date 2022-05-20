import React from 'react';
import PropTypes from 'prop-types';

// import styles from './MessageForm.modulse.scss';
import styles from '../../page/Chat/Chat.module.scss';

const MessageForm = ({ handleSendMessage, text, setText }) => {
  return (
    <form className={styles['send-message']} onSubmit={handleSendMessage}>
      <input
        type="text"
        placeholder="Сообщение"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button>
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
  );
};

MessageForm.propTypes = {
  handleSendMessage: PropTypes.func,
  text: PropTypes.string,
  setText: PropTypes.func
};

export default MessageForm;
