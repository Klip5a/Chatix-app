import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
//
import Picker from 'emoji-picker-react';
import { get, query, ref } from 'firebase/database';
import debounce from 'lodash.debounce';

import styles from '../../page/Chat/Chat.module.scss';
import { database } from '../../api/firebase';

const MessageForm = ({ handleSendMessage, text, setText, operatorId }) => {
  const [phraseSheet, setPhraseSheet] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

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
        const debounceAutocomplete = debounce(() =>
          setPhraseSheet(filterPhrase(arrData, text), 2000)
        );
        debounceAutocomplete();
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

  const onEmojiClick = (event, emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  return (
    <form className={styles['send-message']} onSubmit={handleSendMessage}>
      <div className={styles['input-message__wrapper']}>
        {showPicker && (
          <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{ width: '400px', marginLeft: '5px' }}
          />
        )}
        <input
          type="text"
          placeholder="Сообщение"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onClick={inputClickHandler}
        />
        <img
          className={styles['emoji-icon']}
          onClick={() => setShowPicker((val) => !val)}
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

      <button className={styles['btn-phrase']}>
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
