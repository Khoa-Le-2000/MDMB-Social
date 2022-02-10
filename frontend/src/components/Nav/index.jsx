import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'redux/actions/authAction';
import './nav.scss';

function Nav() {
  const auth = useSelector((state) => state.authReducer.login.token);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(auth?.accessToken));
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
      {auth && <Button onClick={handleLogout}>Logout</Button>}
    </nav>
  );
}
export default Nav;
