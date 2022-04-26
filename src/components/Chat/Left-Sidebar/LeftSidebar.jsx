import React, { useState, useEffect } from 'react';
import styles from './LeftSidebar.module.scss';

const LeftSidebar = () => {
  const [show, setShow] = useState(true);
  const [active, setActive] = useState(false);
  const [textSearch, setTextSearch] = useState('');

  const searchDialog = (event) => {
    setTextSearch(event.target.value);

    const textSearchQuery = event.target.value;

    if (textSearchQuery.length > 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <div className={styles['left-sidebar__wrapper']}>
      <div className={styles['logo-wrapper']}>
        <span>ChaTix</span>
      </div>

      <div className={styles['search-dialog']}>
        <input
          type="text"
          name="search"
          placeholder="Поиск диалога"
          onChange={searchDialog}
        />
      </div>

      {show ? (
        <div className={styles['dialogs-wrapper']}>
          {/* Активные */}

          <div
            className={
              styles['dialog-item'] + ' ' + styles[active ? 'active' : '']
            }
          >
            <div
              className={
                styles['dialog-item__wrapper'] +
                ' ' +
                styles['dialog-item__wrapper-active']
              }
              onClick={() => setActive(!active)}
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
                <span>12</span>
              </div>
            </div>
            <div className={styles['user-list__wrapper']}>
              <ul className={styles['user-list']}>
                <li className={styles['user-item']}>
                  {/* <div className={styles['icon']}>
                  <i className="fa-regular fa-user"></i>
                </div> */}
                  <div className={styles['user-title']}>
                    <span className={styles['name']}>Andrey Golubev</span>
                    <span className={styles['theme']}>Тема: </span>
                  </div>
                  <div className={styles['dispatch-time']}>12:22</div>
                </li>
                <li className={styles['user-item']}>
                  {/* <div className={styles['icon']}>
                  <i className="fa-regular fa-user"></i>
                </div> */}
                  <div className={styles['user-title']}>
                    <span className={styles['name']}>Andrey Golubev</span>
                    <span className={styles['theme']}>Тема: </span>
                  </div>
                  <div className={styles['dispatch-time']}>12:22</div>
                </li>
                <li className={styles['user-item']}>
                  {/* <div className={styles['icon']}>
                  <i className="fa-regular fa-user"></i>
                </div> */}
                  <div className={styles['user-title']}>
                    <span className={styles['name']}>Andrey Golubev</span>
                    <span className={styles['theme']}>Тема: </span>
                  </div>
                  <div className={styles['dispatch-time']}>12:22</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Завершенные */}

          <div className={styles['dialog-item']}>
            <div
              className={
                styles['dialog-item__wrapper'] +
                ' ' +
                styles['dialog-item__wrapper-completed']
              }
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
                <span>12</span>
              </div>
            </div>
          </div>

          {/* // Сохраненные */}

          <div className={styles['dialog-item']}>
            <div
              className={
                styles['dialog-item__wrapper'] +
                ' ' +
                styles['dialog-item__wrapper-saved']
              }
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
                <span>12</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles['search-wrapper']}>
          <ul className={styles['search-list-dialog']}>
            <li className={styles['user-item']}>
              <div
                className={styles['icon'] + ' ' + styles['active-dialog_icon']}
              >
                <i className="fa-regular fa-comment"></i>
              </div>
              <div className={styles['user-title']}>
                <span className={styles['name']}>Andrey Golubev</span>
                <span className={styles['theme']}>Тема: </span>
              </div>
              <div className={styles['dispatch-time']}>12:22</div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
