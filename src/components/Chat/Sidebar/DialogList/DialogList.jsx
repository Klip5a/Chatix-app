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
  equalTo,
  update
} from 'firebase/database';

import styles from '../Sidebar.module.scss';
import { database } from '../../../../api/firebase';

export const DialogList = (props) => {
  const [accordionActiveDialog, setAccordionActiveDialog] = useState(false);
  const [accordionCompletedDialog, setAccordionCompletedDialog] =
    useState(false);
  const [accordionSavedDialog, setAccordionSavedDialog] = useState(false);
  const [countActiveDialog, setCountActiveDialog] = useState([]);
  const [countCompletedDialog, setCountCompletedDialog] = useState([]);
  const [countSavedDialog, setCountSavedDialog] = useState([]);
  const [counterActDlgByOperator, setCounterActDlgByOperator] = useState('');
  const [counterCmplDlgByOperator, setCounterCmplDlgByOperator] = useState('');
  const [counterSvdDlgByOperator, setCounterSvdDlgByOperator] = useState('');
  const [dialog, setDialog] = useState([]);
  const { selectDialog, operatorId } = props;

  useEffect(() => {
    getAllDialog();
    countDialogActiveDialog();
    countDialogCompletedDialog();
    countDialogSavedDialog();
    setInterval(() => {
      countActiveDialogByOperatorId();
      countCompletedDialogByOperatorId();
      countSavedDialogByOperatorId();
    }, []);
  }, [dialog]);

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
  // Accordion
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
  //
  // Count Dialog
  const countDialogActiveDialog = async () => {
    const queryDialog = query(
      ref(database, 'dialogs/'),
      orderByChild('status'),
      equalTo('active')
    );
    get(queryDialog).then((snapshot) => {
      if (snapshot.exists()) {
        setCountActiveDialog(snapshot.val());
      } else {
        console.log('No data available');
      }
    });
  };
  const countActiveDialogByOperatorId = async () => {
    Object.keys(countActiveDialog).map((uid) => {
      if (countActiveDialog[uid].operatorId == operatorId) {
        const count = Object.keys(countActiveDialog);
        setCounterActDlgByOperator(count.length);
      }
    });
  };
  const countDialogCompletedDialog = async () => {
    const queryDialog = query(
      ref(database, 'dialogs/'),
      orderByChild('status'),
      equalTo('completed')
    );
    get(queryDialog).then((snapshot) => {
      if (snapshot.exists()) {
        setCountCompletedDialog(snapshot.val());
      } else {
        console.log('No data available');
      }
    });
  };
  const countCompletedDialogByOperatorId = async () => {
    Object.keys(countCompletedDialog).map((uid) => {
      if (countCompletedDialog[uid].operatorId == operatorId) {
        const count = Object.keys(countCompletedDialog);
        setCounterCmplDlgByOperator(count.length);
      }
    });
  };
  const countDialogSavedDialog = async () => {
    const queryDialog = query(
      ref(database, 'dialogs/'),
      orderByChild('status'),
      equalTo('saved')
    );
    get(queryDialog).then((snapshot) => {
      if (snapshot.exists()) {
        setCountSavedDialog(snapshot.val());
      } else {
        console.log('No data available');
      }
    });
  };
  const countSavedDialogByOperatorId = async () => {
    Object.keys(countSavedDialog).map((uid) => {
      if (countSavedDialog[uid].operatorId == operatorId) {
        const count = Object.keys(countSavedDialog);
        setCounterSvdDlgByOperator(count.length);
      }
    });
  };
  //
  const saveDialog = async (event) => {
    update(ref(database, 'dialogs/' + event.dialogId), {
      status: 'saved'
    }).then(
      alert('dialog has saved').catch((error) => {
        alert('there was an error saving dialog, details: ' + error.message);
      })
    );
  };
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
            <span>{counterActDlgByOperator}</span>
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
                    <div className={styles['uset-item__content']}>
                      <div className={styles['name']}>
                        {dialog[uid].clientName}
                      </div>
                      <div className={styles['message']}>
                        {dialog[uid].lastMessage}
                      </div>
                      <div className={styles['dispatch-time']}>
                        {dialog[uid].lastActivity}
                      </div>
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
            {counterCmplDlgByOperator}
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
                  <li className={styles['user-item']} key={uid}>
                    <div
                      className={styles['uset-item__content']}
                      onClick={() => selectDialog(dialog[uid])}
                    >
                      <div className={styles['name']}>
                        {dialog[uid].clientName}
                      </div>
                      <div className={styles['message']}>
                        {dialog[uid].lastMessage}
                      </div>
                      <div className={styles['dispatch-time']}>
                        {dialog[uid].lastActivity}
                      </div>
                    </div>
                    <button
                      className={styles['btn-save']}
                      onClick={() => saveDialog(dialog[uid])}
                    >
                      <i className="fa-solid fa-floppy-disk"></i>
                    </button>
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
            {counterSvdDlgByOperator}
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
                  <li className={styles['user-item']} key={uid}>
                    <div
                      className={styles['uset-item__content']}
                      onClick={() => selectDialog(dialog[uid])}
                    >
                      <div className={styles['name']}>
                        {dialog[uid].clientName}
                      </div>
                      <div className={styles['message']}>
                        {dialog[uid].lastMessage}
                      </div>
                      <div className={styles['dispatch-time']}>
                        {dialog[uid].lastActivity}
                      </div>
                    </div>
                    <button className={styles['btn-delete']}>
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
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
