import React from 'react';
import { Navigate, Outlet } from 'react-router';

import SignIn from './SignIn/SignIn';

const useAuth = () => {
  const user = { isLoggedIn: false };
  return user && user.isLoggedIn;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
