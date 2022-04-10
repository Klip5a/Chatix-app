import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { user } = useSelector(({ auth }) => auth);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
