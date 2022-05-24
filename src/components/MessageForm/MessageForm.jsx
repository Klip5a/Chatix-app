import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
//
import { get, query, ref } from 'firebase/database';

import styles from '../../page/Chat/Chat.module.scss';
import { database } from '../../api/firebase';

const MessageForm = ({ handleSendMessage, text, setText, operatorId }) => {
  const [phraseSheet, setPhraseSheet] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    phraseSheetList();
  }, [text]);

  const phraseSheetList = async () => {
    const querySheetList = query(ref(database, 'operators/' + operatorId));
    get(querySheetList)
      .then((snapshot) => {
        setPhraseSheet([]);
        const arrData = snapshot.val().readyMadePhrases;
        const filterPhrase = (arr, query) => {
          return arr.filter(
            (el) => el.toLowerCase().indexOf(query.toLowerCase()) !== -1
          );
        };
        setPhraseSheet(filterPhrase(arrData, text));
      })
      .catch((err) => console.log(err));
  };

  const itemClickHandler = (event) => {
    setText(event.target.textContent);
    setIsOpen(!isOpen);
  };

  const inputClickHandler = () => {
    setIsOpen(true);
  };

  return (
    <form className={styles['send-message']} onSubmit={handleSendMessage}>
      <div className={styles['input-message__wrapper']}>
        <input
          type="text"
          placeholder="Сообщение"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onClick={inputClickHandler}
        />
        <ul className={styles['autocomplete']}>
          {text && isOpen
            ? phraseSheet.map((key, value) => {
                return (
                  <li key={key} onClick={itemClickHandler}>
                    {phraseSheet[value]}
                  </li>
                );
              })
            : null}
        </ul>
      </div>

      <button>
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
  );
};

// MessageForm.defaultProps = {
//   text: PropTypes.string
// };

MessageForm.propTypes = {
  handleSendMessage: PropTypes.func,
  text: PropTypes.string,
  setText: PropTypes.func
};

export default MessageForm;
