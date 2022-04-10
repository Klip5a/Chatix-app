import React from 'react';
import { Outlet } from 'react-router';
import SignIn from './SignIn/SignIn';

const useAuth = () => {
  const user = { isLoggedIn: false };
  return user && user.isLoggedIn;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <SignIn />;
};

export default ProtectedRoute;
