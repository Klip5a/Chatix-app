import React from 'react';

import { connect, useDispatch } from 'react-redux';
import { logOut } from '../../store/actions/actions';
import Sidebar from './Sidebar';
import ViewContact from './ViewContact';

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
        <button className="btn" variant="link" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <ViewContact />
    </div>
  );
};

export default connect(({ auth }) => auth)(Chat);
