import React from 'react';
import { Navigate, Outlet } from 'react-router';

// const useAuth = () => {
//   const user = { isLoggedIn: false };
//   return user && user.isLoggedIn;
// };

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector(({ auth }) => auth);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
