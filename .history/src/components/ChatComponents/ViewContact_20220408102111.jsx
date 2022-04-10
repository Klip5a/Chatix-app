import React from 'react';
import { useDispatch } from 'react-redux';

import { logOut } from '../../store/actions/actions';

const ViewContact = () => {
  const dispatch = useDispatch();

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
