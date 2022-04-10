import React from 'react';
import { useDispatch } from 'react-redux';

import { logOut } from '../../store/actions/actions';

const ViewContact = () => {
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(logOut());
  }

  return (
    <div>
      <h1>View Contact</h1>
    </div>
  );
};

export default ViewContact;
