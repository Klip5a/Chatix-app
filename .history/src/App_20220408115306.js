import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Chat from './components/ChatComponents/Chat';

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <ProtectedRoute exact path="/" component={Chat} />
        <Route path={'/'} element={<SignIn />} />
        <Route path={'/chat/sign-in'} element={<SignIn />} />
        <Route path={'/chat/sign-up'} element={<SignUp />} />
        <Route path={'/chat'} element={<Chat />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
