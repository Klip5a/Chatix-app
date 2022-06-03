import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';

import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './page/SignIn/SignIn';
import SignUp from './page/SignUp/SignUp';
import Chat from './page/Chat/Chat';

const pubnub = new PubNub({
  publishKey: 'pub-c-6e16aa18-c827-4147-b2ae-9f9f49f3b73d',
  subscribeKey: 'sub-c-060a28c5-2805-46ba-9e50-cf3bef75740b'
});

const App = () => {
  return (
    <React.Fragment>
      <PubNubProvider client={pubnub}>
        <Routes>
          <Route path={'/'} element={<SignIn />} />
          <Route path={'/sign-in'} element={<SignIn />} />
          <Route path={'/sign-up'} element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path={'/chat'} element={<Chat />} />
          </Route>
        </Routes>
      </PubNubProvider>
    </React.Fragment>
  );
};

export default App;
