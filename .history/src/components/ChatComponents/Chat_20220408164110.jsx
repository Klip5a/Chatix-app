import React from 'react';
// import { connect } from 'react-redux';
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
    <div>
      <Sidebar />
      <div>
        <h1>Chat</h1>
        <ul>
          <div>Profile</div>
          {/* <li>{name}</li>
          <li>{email}</li> */}
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

export default Chat();
// export default connect(({ auth }) => auth)(Chat);
