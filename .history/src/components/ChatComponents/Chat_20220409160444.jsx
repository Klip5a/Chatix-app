import React from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { logOut } from '../../store/actions/actions';
import Sidebar from './Sidebar';
import ViewContact from './ViewContact';
import Loading from '../loading/loading';

const Chat = () => {
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(logOut());
  }
  return (
    <div>
      <Sidebar />
      <div>
        <h1>Chat</h1>
        <ul>
          <div>Profile</div>
          <li>={username}</li>
          <li>={email}</li>
          <li>={dateOfBirth}</li>
        </ul>
        <button
          className="btn btn-primary"
          variant="link"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      <ViewContact />
    </div>
  );
};

Chat.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  dateOfBirth: PropTypes.string,
};

export default connect(({ auth }) => auth)(Chat);
