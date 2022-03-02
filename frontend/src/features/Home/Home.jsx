import Login from 'features/Login/Login';
import MainLayout from 'layouts/MainLayout';
import React from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, refreshToken } from 'app/actions/login';
import './home.scss';
import { getAuth } from 'app/selectors/loginSelector';
import io from 'socket.io-client';

function Home() {
  const auth = useSelector(getAuth);
  const [message, setMessage] = React.useState('');
  const [chat, setChat] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const socket = io.connect(process.env.REACT_APP_API_URL, {
    transports: ['websocket'],
    auth: { token: auth?.accessToken },
    query: { accountId: auth?.accountId },
  });

  React.useEffect(() => {
    socket.on('chat message', (data) => {
      setChat([...chat, data]);
    });
  });

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    console.log(
      '🚀 :: file: Home.jsx :: line 33 :: e.target.value',
      e.target.value
    );
    socket.emit('typing', 4);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat message', message, '4', (res) => {
      console.log('🚀 :: file: Home.jsx :: line 53 :: res', res);
    });
  };

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
          <Row>
            <Col lg={'6'}>
              <h2>Send to account id = 4 </h2>
              <h2>{socket.id} </h2>
              Form
              <Form onSubmit={handleSendMessage}>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    placeholder="Enter your message"
                    onChange={handleMessageChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col>
              {chat?.map((chat) => (
                <div key={chat.id}>
                  {chat.accountId}: {chat.message}
                </div>
              ))}
            </Col>
          </Row>
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
