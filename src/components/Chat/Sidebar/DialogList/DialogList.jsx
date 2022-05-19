import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ref,
  get,
  query,
  startAt,
  orderByChild,
  endAt,
  onValue,
  onChildAdded,
  equalTo
} from 'firebase/database';

import styles from '../Sidebar.module.scss';
import { database } from '../../../../api/firebase';

export const DialogList = (props) => {
  const [accordionActiveDialog, setAccordionActiveDialog] = useState(false);
  const [accordionCompletedDialog, setAccordionCompletedDialog] =
    useState(false);
  const [accordionSavedDialog, setAccordionSavedDialog] = useState(false);
  const [dialog, setDialog] = useState({});
  const [countActiveDialog, setCountActiveDialog] = useState([]);
  const { selectDialog, operatorId } = props;

  // const [count, setCount] = useState('');

  useEffect(() => {
    // countDialog();
    getAllDialog();
  }, []);

  const getAllDialog = async () => {
    const queryDialog = query(ref(database, 'dialogs/'));
    get(queryDialog).then((snapshot) => {
      if (snapshot.exists()) {
        setDialog({ ...snapshot.val() });
      } else {
        console.log('No data available');
      }
    });
  };
  const activeAccordionDialog = () => {
    setAccordionActiveDialog(!accordionActiveDialog);
    if (accordionCompletedDialog === true) {
      setAccordionCompletedDialog(!accordionCompletedDialog);
    }
    if (accordionSavedDialog === true) {
      setAccordionSavedDialog(!accordionSavedDialog);
    }
  };
  const completedAccordionDialog = () => {
    setAccordionCompletedDialog(!accordionCompletedDialog);
    if (accordionActiveDialog === true) {
      setAccordionActiveDialog(!accordionActiveDialog);
    }
    if (accordionSavedDialog === true) {
      setAccordionSavedDialog(!accordionSavedDialog);
    }
  };
  const savedAccordionDialog = () => {
    setAccordionSavedDialog(!accordionSavedDialog);
    if (accordionActiveDialog === true) {
      setAccordionActiveDialog(!accordionActiveDialog);
    }
    if (accordionCompletedDialog === true) {
      setAccordionCompletedDialog(!accordionCompletedDialog);
    }
  };
  // const countDialog = async () => {
  //   Object.keys(dialog).map((uid) => {
  //     if (
  //       dialog[uid].status == 'active' &&
  //       dialog[uid].operatorId === operatorId
  //     ) {
  //       count++;
  //       // console.log(counts)
  //     }
  //   });
  //   // for (let key in dialog) {
  //   //
  //   // }
  //   setCount(count);
  //   clearInterval();
  // };
  // console.log(count);

  return (
    <div className={styles['dialogs-wrapper']}>
      {/* Активные */}
      <div
        className={
          styles['dialog-item'] +
          ' ' +
          styles[accordionActiveDialog ? 'active' : '']
        }
      >
        <div
          className={
            styles['dialog-item__wrapper'] +
            ' ' +
            styles['dialog-item__wrapper-active']
          }
          onClick={activeAccordionDialog}
        >
          <div className={styles['dialog-item__logo']}>
            <span>
              <i className="fa-solid fa-comment"></i>
            </span>
          </div>
          <div className={styles['dialog-item__title']}>
            <span>Активные</span>
          </div>
          <div className={styles['dialog-item__counter']}>
            <span></span>
          </div>
        </div>

        <div className={styles['user-list__wrapper']}>
          <ul className={styles['user-list']}>
            {Object.keys(dialog).map((uid) => {
              if (
                dialog[uid].status == 'active' &&
                dialog[uid].operatorId === operatorId
              ) {
                return (
                  <li
                    className={styles['user-item']}
                    key={uid}
                    onClick={() => selectDialog(dialog[uid])}
                  >
                    <div className={styles['user-title']}>
                      <span className={styles['name']}>
                        {dialog[uid].clientName}
                      </span>
                      <div className="justify-around flex">
                        <span className={styles['theme']}>
                          Тема: {dialog[uid].themeOfTheAppeal}
                        </span>
                        <span className={styles['theme']}>
                          Подтема: {dialog[uid].subtopic}
                        </span>
                      </div>
                    </div>
                    <div className={styles['dispatch-time']}>
                      {dialog[uid].lastActivity}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>

      {/* Завершенные */}

      <div
        className={
          styles['dialog-item'] +
          ' ' +
          styles[accordionCompletedDialog ? 'active' : '']
        }
      >
        <div
          className={
            styles['dialog-item__wrapper'] +
            ' ' +
            styles['dialog-item__wrapper-completed']
          }
          onClick={completedAccordionDialog}
        >
          <div className={styles['dialog-item__logo']}>
            <span>
              <i className="fa-solid fa-comment-slash"></i>
            </span>
          </div>
          <div className={styles['dialog-item__title']}>
            <span>Завершенные</span>
          </div>
          <div className={styles['dialog-item__counter']}>
            {Object.keys(dialog).map((uid) => {
              if (
                dialog[uid].status == 'completed' &&
                dialog[uid].operatorId === operatorId
              ) {
                return <span>{[uid].length}</span>;
              }
            })}
          </div>
        </div>
        <div className={styles['user-list__wrapper']}>
          <ul className={styles['user-list']}>
            {Object.keys(dialog).map((uid) => {
              if (
                dialog[uid].status == 'completed' &&
                dialog[uid].operatorId === operatorId
              ) {
                return (
                  <li
                    className={styles['user-item']}
                    key={uid}
                    onClick={() => selectDialog(dialog[uid])}
                  >
                    <div className={styles['user-title']}>
                      <span className={styles['name']}>
                        {dialog[uid].clientName}
                      </span>
                      <div className="justify-around flex">
                        <span className={styles['theme']}>
                          Тема: {dialog[uid].themeOfTheAppeal}
                        </span>
                        <span className={styles['theme']}>
                          Подтема: {dialog[uid].subtopic}
                        </span>
                      </div>
                    </div>
                    {/* <div className={styles['dispatch-time']}>
          {activeDialog[uid].timestamp}
          </div> */}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>

      {/* // Сохраненные */}

      <div
        className={
          styles['dialog-item'] +
          ' ' +
          styles[accordionSavedDialog ? 'active' : '']
        }
      >
        <div
          className={
            styles['dialog-item__wrapper'] +
            ' ' +
            styles['dialog-item__wrapper-saved']
          }
          onClick={savedAccordionDialog}
        >
          <div className={styles['dialog-item__logo']}>
            <span>
              <i className="fa-solid fa-floppy-disk"></i>
            </span>
          </div>
          <div className={styles['dialog-item__title']}>
            <span>Сохраненные</span>
          </div>
          <div className={styles['dialog-item__counter']}>
            {/* {Object.keys(dialog).map((uid) => {
              if (
                dialog[uid].status == 'saved' &&
                dialog[uid].operatorId === operatorId
              ) {
                return <span>{dialog.dialogId.length}</span>;
              }
            })} */}
          </div>
        </div>
        <div className={styles['user-list__wrapper']}>
          <ul className={styles['user-list']}>
            {Object.keys(dialog).map((uid) => {
              if (
                dialog[uid].status == 'saved' &&
                dialog[uid].operatorId === operatorId
              ) {
                return (
                  <li
                    className={styles['user-item']}
                    key={uid}
                    onClick={() => selectDialog(dialog[uid])}
                  >
                    <div className={styles['user-title']}>
                      <span className={styles['name']}>
                        {dialog[uid].clientName}
                      </span>
                      <div className="justify-around flex">
                        <span className={styles['theme']}>
                          Тема: {dialog[uid].themeOfTheAppeal}
                        </span>
                        <span className={styles['theme']}>
                          Подтема: {dialog[uid].subtopic}
                        </span>
                      </div>
                    </div>
                    {/* <div className={styles['dispatch-time']}>
          {activeDialog[uid].timestamp}
          </div> */}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

DialogList.propTypes = {
  dialogId: PropTypes.string,
  selectDialog: PropTypes.func.isRequired
};

DialogList.defaultProps = {
  selectDialog() {}
};

export default DialogList;
