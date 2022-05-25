import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  ref,
  get,
  query,
  update,
  orderByChild,
  equalTo
} from 'firebase/database';

import styles from './SidebarDialogList.module.scss';
import { database } from '../../api/firebase';
import { toast } from 'react-toastify';

const SidebarDialogList = (props) => {
  const { selectDialog, operatorId } = props;
  const [accordionActiveDialog, setAccordionActiveDialog] = useState(false);
  const [accordionCompletedDialog, setAccordionCompletedDialog] =
    useState(false);
  const [accordionSavedDialog, setAccordionSavedDialog] = useState(false);
  const [dialog, setDialog] = useState([]);

  useEffect(() => {
    getAllDialog();
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
    if (accordionCompletedDialog) {
      setAccordionCompletedDialog(!accordionCompletedDialog);
    }
    if (accordionSavedDialog) {
      setAccordionSavedDialog(!accordionSavedDialog);
    }
  };
  const completedAccordionDialog = () => {
    setAccordionCompletedDialog(!accordionCompletedDialog);
    if (accordionActiveDialog) {
      setAccordionActiveDialog(!accordionActiveDialog);
    }
    if (accordionSavedDialog) {
      setAccordionSavedDialog(!accordionSavedDialog);
    }
  };
  const savedAccordionDialog = () => {
    setAccordionSavedDialog(!accordionSavedDialog);
    if (accordionActiveDialog) {
      setAccordionActiveDialog(!accordionActiveDialog);
    }
    if (accordionCompletedDialog) {
      setAccordionCompletedDialog(!accordionCompletedDialog);
    }
  };

  // Btn Save Dialog
  const saveDialog = async (event) => {
    await update(ref(database, 'dialogs/' + event.dialogId), {
      status: 'saved'
    }).then(
      toast.success('🦄 Диалог сохранен!', {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
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
        </div>

        <div className={styles['user-list__wrapper']}>
          <ul className={styles['user-list']}>
            {Object.keys(dialog).map((uid) => {
              if (
                dialog[uid].status === 'active' &&
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
                        {moment(dialog[uid].lastActivity).calendar()}
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
        </div>
        <div className={styles['user-list__wrapper']}>
          <ul className={styles['user-list']}>
            {Object.keys(dialog).map((uid) => {
              if (
                dialog[uid].status === 'completed' &&
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
                        {moment(dialog[uid].lastActivity).calendar()}
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
        </div>
        <div className={styles['user-list__wrapper']}>
          <ul className={styles['user-list']}>
            {Object.keys(dialog).map((uid) => {
              if (
                dialog[uid].status === 'saved' &&
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
                        {moment(dialog[uid].lastActivity).calendar()}
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

SidebarDialogList.propTypes = {
  dialogId: PropTypes.string,
  selectDialog: PropTypes.func.isRequired
};

SidebarDialogList.defaultProps = {
  selectDialog() {}
};

export default SidebarDialogList;
