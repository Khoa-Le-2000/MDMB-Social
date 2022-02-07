import React from 'react';
import './Login.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import loginIcon from '../../images/user.png';
import uiImg from '../../images/background.png';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login().then(() => {
      navigate('/dashboard');
    });
  };

  return (
    <div>
      <Container className="mt-12">
        <Row>
          <Col lg={4} md={6} sm={12} className="text-center p-3">
            <h5>
              Welcome to MDMB Social, please put your credentials below to start
              using the app!
            </h5>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email or phone number"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <div className="decor">
                <small className="reset">
                  <Link to="/forgot">Forgot Password?</Link>
                </small>
              </div>
              <hr />
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  variant="primary btn-primary"
                  size="lg"
                  type="submit"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
              <br />

              <div className="decor">
                <p>Don't have an account?</p>
                <small className="reset">
                  <Link to="/register">Register now</Link>
                </small>
              </div>
            </Form>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <img className="w-100" src={uiImg} alt="icon" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
