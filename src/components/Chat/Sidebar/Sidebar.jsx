import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Sidebar.module.scss';
import DialogList from './DialogList/DialogList';

const Sidebar = (props) => {
  const [show, setShow] = useState(true);
  const [textSearch, setTextSearch] = useState('');

  const { dialogData } = props;

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
        <DialogList selectDialog={dialogData} />
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

Sidebar.propTypes = {
  dialogData: PropTypes.func
};

export default Sidebar;
