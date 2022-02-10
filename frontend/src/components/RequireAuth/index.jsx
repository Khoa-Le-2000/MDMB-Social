import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

function RequireAuth({ children }) {
  const location = useLocation();

  const auth = useSelector((state) => state.authReducer.login.token);

  return auth ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}
export default RequireAuth;
RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
