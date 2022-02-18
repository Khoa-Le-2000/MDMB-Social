import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { getAuth } from 'redux/selectors/authSelector';

function RequireAuth({ children }) {
  const location = useLocation();

  const isAuthenticated = useSelector(getAuth)?.accessToken;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth;
RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
