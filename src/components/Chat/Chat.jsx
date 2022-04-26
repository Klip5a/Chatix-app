import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/actions/actions';
import styles from './Chat.module.scss';
import LeftSidebar from './Left-Sidebar/LeftSidebar';
import profileImg from '../../assets/7819_Coll_Pepega.png';

const Chat = () => {
  const { user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  async function handleLogout() {
    await dispatch(logOut());
  }

  return (
    <div className={styles['container']}>
      <LeftSidebar />
      <div className={styles['chat-wrapper']}>
        <div className={styles['chat-header']}>
          <button
            className="bg-blue-600 h-10 text-white rounded-md text-xl"
            type="submit"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <div className={styles['profile']}>
            <span className={styles['profile-email']}>{user.email}</span>
            <img src={profileImg} alt="Pepega.png" />
          </div>
        </div>
        <div className={styles['counter-search__wrapper']}>
          <div className={styles['client-queue']}>
            Клиентов в очереди: <span>10</span>
          </div>
        </div>
        <div className={styles['chat-message']}>
          <div className={styles['messages-wrapper']}>
            <div className={styles['message'] + ' ' + styles['message-client']}>
              <div className={styles['username']}>Андрей</div>
              <p className={styles['text']}>Lorem ipsum</p>
              <div className={styles['time-message']}>12:22</div>
            </div>
            <div className={styles['message'] + ' ' + styles['message-client']}>
              <div className={styles['username']}>Андрей</div>
              <p className={styles['text']}>Lorem ipsum</p>
              <div className={styles['time-message']}>12:22</div>
            </div>
            <div
              className={styles['message'] + ' ' + styles['message-operator']}
            >
              <span className={styles['username']}>Оператор Антон</span>
              <p className={styles['text']}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat dicta, aspernatur, repudiandae explicabo, nobis
                consequatur nihil optio velit voluptate facere perferendis vero
                quibusdam laboriosam totam amet saepe veritatis expedita est.
              </p>
              <div className={styles['time-message']}>12:26</div>
            </div>
            <div
              className={styles['message'] + ' ' + styles['message-operator']}
            >
              <span className={styles['username']}>Оператор Антон</span>
              <p className={styles['text']}>Lorem</p>
              <div className={styles['time-message']}>12:26</div>
            </div>
          </div>
          <div className={styles['send-message']}>
            <input type="text" placeholder="Сообщение" />
            <button>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat.propTypes = {
//   user: PropTypes.object
// };

export default Chat;
