import Login from 'features/Login/Login';
import MainLayout from 'layouts/MainLayout';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAuth } from 'redux/selectors/authSelector';
import './home.scss';

function Home() {
  const auth = useSelector(getAuth);

  return (
    <Container fluid>
      <section className="home">
        <Login />
      </section>
      {auth?.accessToken && <MainLayout />}
    </Container>
  );
}
export default Home;
