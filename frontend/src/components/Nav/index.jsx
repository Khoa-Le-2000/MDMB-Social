import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'redux/actions/authAction';
import './nav.scss';

function Nav() {
  const auth = useSelector((state) => state.authReducer.token);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
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
      {auth && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}
export default Nav;
