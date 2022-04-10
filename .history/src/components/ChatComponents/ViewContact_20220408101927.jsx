import React from 'react';
import { logOut } from '../../store/actions/actions';
const ViewContact = () => {
  async function handleLogout() {
    dispatch(logOut());
  }
  return (
    <button className="btn" variant="link" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default ViewContact;
