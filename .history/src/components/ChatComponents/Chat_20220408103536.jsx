import React from 'react';
import Sidebar from './Sidebar';
import ViewContact from './ViewContact';

const Chat = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <h1>Chat</h1>
      </div>
      <ViewContact />
    </div>
  );
};

export default Chat;
