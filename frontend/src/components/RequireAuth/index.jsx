import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { getAuth } from 'app/selectors/login';

function RequireAuth({ children }) {
  const location = useLocation();

  const isAuthenticated = useSelector(getAuth)?.accessToken;

  return isAuthenticated ? (
    children
  ) : (
    children
  );
}

export default RequireAuth;
RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
