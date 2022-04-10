import React from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { logOut } from '../../store/actions/actions';
import Sidebar from './Sidebar';
import ViewContact from './ViewContact';

const Chat = ({ user }) => {
  const { username, email, dateOfBirth } = user;
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(logOut());
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-1/2">
        <h1 className="text-xl font-bold">Chat</h1>
        <ul>
          <div>Profile</div>
          <li>={username}</li>
          <li>={email}</li>
          <li>={dateOfBirth}</li>
        </ul>
        <button
          className="mt-7 w-full bg-blue-600 h-10 text-white rounded-md hover:bg-blue-700 text-xl"
          type="submit"
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
  username: PropTypes.object
};

export default connect(({ auth }) => auth)(Chat);
