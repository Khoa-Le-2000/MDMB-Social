import Login from 'features/Login/Login';
import MainLayout from 'layouts/MainLayout';
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, refreshToken } from 'app/actions/login';
import './home.scss';
import { getAuth } from 'app/selectors/loginSelector';

function Home() {
  const auth = useSelector(getAuth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onHandleRefreshToken = () => {
    dispatch(refreshToken(auth.refreshToken));
  };
  const handleLogout = () => {
    dispatch(logout(auth?.accessToken));
    navigate('/');
  };
  return (
    <Container fluid>
      {auth?.accessToken ? (
        <MainLayout>
          <h5>Access token: {auth?.accessToken}</h5>
          <h5>Refresh Token: {auth?.refreshToken}</h5>
          <Button onClick={onHandleRefreshToken} className="btn">
            Refresh Token
          </Button>
          {auth?.accessToken && <Button onClick={handleLogout}>Logout</Button>}
        </MainLayout>
      ) : (
        <section className="home">
          <Login />
        </section>
      )}
    </Container>
  );
}
export default Home;
