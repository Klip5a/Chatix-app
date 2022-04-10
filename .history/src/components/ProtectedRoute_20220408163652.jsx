import React from 'react';
import { Navigate, Outlet } from 'react-router';


const useAuth = () => {
  const user = { isLoggedIn: true };
  return user && user.isLoggedIn;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
