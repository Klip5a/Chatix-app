import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
// const useAuth = () => {
//   const user = { isLoggedIn: false };
//   return user && user.isLoggedIn;
// };

const ProtectedRoute = () => {
  const { user } = useSelector(({ auth }) => auth);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
