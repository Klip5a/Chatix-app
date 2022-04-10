import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Chat from './components/ChatComponents/Chat';

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path={'/'} element={<SignIn />} />
        <Route path={'/sign-in'} element={<SignIn />} />
        <Route path={'/sign-up'} element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path={'/chat'} element={<Chat />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;