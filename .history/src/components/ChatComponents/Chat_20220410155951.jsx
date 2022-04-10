import React from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

import { logOut } from '../../store/actions/actions';
import Sidebar from './Sidebar';
import ViewContact from './ViewContact';

const Chat = () => {
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(logOut());
  }
  return (
    <div className="w-1/2">
      <Sidebar />
      <div>
        <h1>Chat</h1>
        <ul className="green">
          <div>Profile</div>
          {/* <li>={username}</li>
          <li>={email}</li>
          <li>={dateOfBirth}</li> */}
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

export default connect(({ auth }) => auth)(Chat);