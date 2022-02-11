import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from 'redux/actions/authAction';

function Dashboard() {
  const auth = useSelector((state) => state.authReducer.login.token);

  const dispatch = useDispatch();

  const onHandleRefreshToken = () => {
    dispatch(refreshToken(auth.refreshToken));
  };
  return (
    <div>
      Dashboard (private)
      <h5>Access token: {auth?.accessToken}</h5>
      <h5>Refresh Token: {auth?.refreshToken}</h5>
      <Button onClick={onHandleRefreshToken} className="btn">
        Refresh Token
      </Button>
    </div>
  );
}

export default Dashboard;
