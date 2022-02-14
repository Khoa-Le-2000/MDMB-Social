import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from 'redux/actions/authAction';
import { getAuth } from 'redux/selectors/authSelector';

function Dashboard() {
  const auth = useSelector(getAuth);

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
