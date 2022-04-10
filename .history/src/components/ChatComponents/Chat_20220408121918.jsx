import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { logOut } from '../../store/actions/actions';
import Sidebar from './Sidebar';
import ViewContact from './ViewContact';

const Chat = ({ dispatch, user }) => {
  const { name, email, phone } = user;

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
          <li>{name}</li>
          <li>{email}</li>
          <li>{phone}</li>
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
