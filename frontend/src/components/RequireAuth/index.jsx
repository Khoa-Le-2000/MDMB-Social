import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

function RequireAuth({ children }) {
  const location = useLocation();

  const auth = useSelector((state) => state.authReducer.token);

  return auth ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}
export default RequireAuth;
