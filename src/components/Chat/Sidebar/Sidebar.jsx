import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Sidebar.module.scss';
import DialogList from './DialogList/DialogList';
import SearchInput from './SearchInput/SearchInpit';
// import SearchList from './SearchList/SearchList';

const Sidebar = (props) => {
  const [show, setShow] = useState(true);
  const [foundMessage, setFoundMessage] = useState({});
  const { dialogData, operatorId } = props;
  return (
    <div className={styles['left-sidebar__wrapper']}>
      <div className={styles['logo-wrapper']}>
        <span>ChaTix</span>
      </div>

      <SearchInput setShow={setShow} setQuery={setFoundMessage} />

      {show ? (
        <DialogList selectDialog={dialogData} operatorId={operatorId} />
      ) : (
        <div className={styles['search-wrapper']}>
          <ul className={styles['search-list-dialog']}>
            {foundMessage.length > 0
              ? foundMessage.map((item) => {
                  return (
                    <li className={styles['user-item']} key={item.id}>
                      <div className={styles['user-title']}>
                        <span className={styles['name']}>{item.writtenBy}</span>
                        <span className={styles['theme']}>{item.content}</span>
                      </div>
                      <div className={styles['dispatch-time']}>
                        {item.timestamp}
                      </div>
                    </li>
                  );
                })
              : 'no message available'}
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
