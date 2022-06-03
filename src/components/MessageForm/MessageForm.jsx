import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
//
import Picker from 'emoji-picker-react';
import { get, query, ref, remove, set, update } from 'firebase/database';
import Modal from 'react-modal';
import { Formik, Form, Field, FieldArray } from 'formik';

import { database } from '../../api/firebase';
import styles from '../../page/Chat/Chat.module.scss';
import plus from '../../assets/plus-solid.svg';
import emojiSmile from '../../assets/emoji-smile.svg';
import paperClip from '../../assets/paperclip-solid.svg';

Modal.setAppElement('#root');

const MessageForm = ({
  handleSendMessage,
  text,
  setText,
  operator,
  setImg,
  setIndicatorMessage
}) => {
  const [phraseSheet, setPhraseSheet] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [showCommunicationSettings, setwCommunicationSettings] =
    useState(false);
  const [phraseList, setPhraseList] = useState({});
  const [topicList, setTopicList] = useState({});
  const [phraseValue, setPhraseValue] = useState('');
  // const [topicValue, setTopicValue] = useState('');

  useEffect(() => {
    fetchOperatorPhrases();
    // fetchOperatorTopics();
  }, [phraseList, topicList]);

  const fetchOperatorPhrases = async () => {
    const queryOperator = query(
      ref(database, 'operators/' + operator.operatopId)
    );
    get(queryOperator)
      .then((snapshot) => {
        const phrases = snapshot.val().readyMadePhrases;
        const filterPhrase = (arr, query) => {
          return arr.filter(
            (el) => el.toLowerCase().indexOf(query.toLowerCase()) !== -1
          );
        };
        setPhraseSheet(filterPhrase(phrases, text), 2000);
        setPhraseList(phrases);
      })
      .catch((err) => console.log(err));
  };

  // const fetchOperatorTopics = async () => {
  //   const queryOperator = query(
  //     ref(database, 'operators/' + operator.operatopId)
  //   );
  //   get(queryOperator)
  //     .then((snapshot) => {
  //       const SnapTopics = snapshot.val().listOfTopics;
  //       setTopicList(SnapTopics);
  //     })
  //     .catch((err) => console.log(err));
  // };
  
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

  const handleOpenCommunicationSetting = () => {
    setwCommunicationSettings(!showCommunicationSettings);
  };
  const handleCloseCommunicationSetting = () => {
    setwCommunicationSettings(!showCommunicationSettings);
  };

  const addPhrase = async () => {
    if (!phraseValue || !phraseValue.length) {
      return false;
    }
    const phraseArr = Object.keys(phraseList);
    const id = phraseArr.length;

    await set(
      ref(
        database,
        'operators/' + `${operator.operatopId}/readyMadePhrases` + `/${id}`
      ),
      phraseValue
    );
    setPhraseValue('');
  };

  // const addTopic = async () => {
  //   if (!topicValue || !topicValue.length) {
  //     return false;
  //   }
  //   const topicValue = Object.keys(topicValue);
  //   const id = topicValue.length;

  //   await set(
  //     ref(
  //       database,
  //       'operators/' + `${operator.operatopId}/listOfTopics` + `/${id}`
  //     ),
  //     topicValue
  //   );
  //   setTopicValue('');
  // };

  const deletePhrase = async (index) => {
    await remove(
      ref(
        database,
        'operators/' + `${operator.operatopId}/readyMadePhrases` + `/${index}`
      )
    );
  };

  // const deleteTopic = async (index) => {
  //   await remove(
  //     ref(
  //       database,
  //       'operators/' + `${operator.operatopId}/listOfTopics` + `/${index}`
  //     )
  //   );
  // };

  return (
    <form className={styles['send-message']} onSubmit={handleSendMessage}>
      <div className={styles['input-message__wrapper']}>
        {showPicker && (
          <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{ width: '400px', marginLeft: '5px' }}
          />
        )}
        <label htmlFor="img">
          <img src={paperClip} className={styles['paperclip-icon']} />
        </label>
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          id="img"
          accept="image/*"
          style={{ display: 'none' }}
        />
        <input
          type="text"
          placeholder="Сообщение"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyUp={(event) => setIndicatorMessage(event.target.value)}
          onClick={inputClickHandler}
        />
        <ul className={styles['autocomplete']}>
          {text && isOpen
            ? phraseSheet.map((key, value) => {
                return (
                  <li
                    key={key}
                    onClick={itemClickHandler}
                    className="w-full h-full"
                  >
                    <div>{phraseSheet[value]}</div>
                  </li>
                );
              })
            : null}
        </ul>
        <img
          className={styles['emoji-icon']}
          src={emojiSmile}
          onClick={() => setShowPicker((val) => !val)}
        />
        <img
          src={plus}
          className={styles['phrase-icon']}
          onClick={handleOpenCommunicationSetting}
        />
        <Modal
          isOpen={showCommunicationSettings}
          onRequestClose={handleCloseCommunicationSetting}
          className="max-w-lg border-none"
          overlayClassName="absolute inset-0 bg-neutral-600/75 flex justify-center items-center "
        >
          <div className="bg-white rounded-2xl relative px-5 pt-10 pb-2 ">
            <button
              onClick={handleCloseCommunicationSetting}
              className="p-1 absolute top-2 right-2 bg-slate-400 rounded-xl"
            >
              Закрыть
            </button>
            <h2 className="text-center text-xl mb-2 font-bold">
              Настройка общения
            </h2>
            <div>
              <span className="font-semibold">Готовые фразы:</span>
              <Formik initialValues={phraseList} onSubmit={addPhrase}>
                {() => (
                  <Form>
                    <FieldArray
                      name="phrase"
                      render={() => (
                        <div>
                          {phraseList && phraseList.length > 0
                            ? phraseList.map((phrase, index) => (
                                <div key={index} className="flex items-center">
                                  <span>{phrase}</span>
                                  <button
                                    className="ml-5 text-xl text-red-400 flex items-center"
                                    type="button"
                                    onClick={() => deletePhrase(index)}
                                  >
                                    x
                                  </button>
                                </div>
                              ))
                            : null}
                          <div>
                            <Field
                              name="addPhrase"
                              type="text"
                              value={phraseValue}
                              onChange={(event) =>
                                setPhraseValue(event.target.value)
                              }
                              className="border-2 mr-2 p-1"
                            />
                            <button
                              className="px-3 py-1 bg-blue-300 mt-2 rounded-xl"
                              type="submit"
                            >
                              Добавить фразу
                            </button>
                          </div>
                        </div>
                      )}
                    />
                  </Form>
                )}
              </Formik>
              <div className="mt-2 flex flex-col">
                <label htmlFor="autoGreeting">
                  Автоматическое приветствие:
                </label>
                <Formik
                  initialValues={{ autoGreeting: operator.automaticGreeting }}
                  onSubmit={(values) => {
                    update(
                      ref(database, 'operators/' + `${operator.operatopId}`),
                      {
                        automaticGreeting: values.autoGreeting
                      }
                    );
                  }}
                >
                  <Form className="flex flex-col">
                    <Field
                      as="textarea"
                      name="autoGreeting"
                      id="autoGreeting"
                      cols="23"
                      rows="5"
                      className="p-1 border-2"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-blue-300 mt-2 rounded-xl"
                    >
                      Добавить
                    </button>
                  </Form>
                </Formik>
              </div>
              {/* <div className="mt-6">
                <span className="font-semibold">Список тем:</span>
                <Formik initialValues={topicList} onSubmit={addTopic}>
                  {() => (
                    <Form>
                      <FieldArray
                        name="topics"
                        render={() => (
                          <div>
                            {topicList && topicList.length > 0
                              ? topicList.map((topics, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <span>{topics}</span>
                                    <button
                                      className="ml-5 text-xl text-red-400 flex items-center"
                                      type="button"
                                      onClick={() => deleteTopic(index)}
                                    >
                                      x
                                    </button>
                                  </div>
                                ))
                              : null}
                            <div>
                              <Field
                                name="addTopic"
                                type="text"
                                value={topicValue}
                                onChange={(event) =>
                                  setTopicValue(event.target.value)
                                }
                                className="border-2 mr-2 p-1"
                              />
                              <button
                                className="px-3 py-1 bg-blue-300 mt-2 rounded-xl"
                                type="submit"
                              >
                                Добавить тему
                              </button>
                            </div>
                          </div>
                        )}
                      />
                    </Form>
                  )}
                </Formik>
              </div> */}
              {/* <div className="mt-6">
                <span className="font-semibold">Список подтем:</span>
                <ul className="py-2">
                  <li>
                    Фраза1
                    <button className="ml-5 text-xl text-red-400">x</button>
                  </li>
                </ul>
                <input type="text" className="border-2 mr-2 p-1" />
                <button className="px-3 py-1 bg-blue-300 mt-2 rounded-xl">
                  Добавить подтему
                </button>
              </div> */}
            </div>
          </div>
        </Modal>
      </div>
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
