import Hero from 'assets/images/register/hero.svg';
import React from 'react';
import { Button, Card, Carousel, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { loginByGoogle, loginFailure } from 'redux/actions/authAction';
import { getRedirect } from 'redux/selectors/authSelector';
import './register.scss';

import GoogleIcon from 'assets/images/icons/google.svg';
import GoogleLogin from 'react-google-login';

function Register() {
  const isRedirectRegister = useSelector(getRedirect)?.register;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLoginFailure = (error) => {
    dispatch(loginFailure(error.message));
  };

  const handleGoogleLoginSuccess = (googleData) => {
    dispatch(loginByGoogle(googleData.tokenId, navigate));
  };

  return (
    <div className="register">
      {isRedirectRegister && (
        <Row className="flex justify-content-center">
          <Col className="col">
            <Routes>
              <Route
                path="/google"
                element={
                  <div className="card__wrap-new">
                    <div className="card__body">
                      <div className="card__info">
                        <h3>Google</h3>
                        <h4>Do you want to create a MDMB Social account for</h4>
                      </div>
                      <Form className="card__form-group">
                        <div>
                          <Link to={'/'}>
                            <Button variant="secondary">Cancel</Button>
                          </Link>
                          <Button>Create Account</Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                }
              />
            </Routes>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={7} className="register__col">
          <div className="register__hero"></div>
        </Col>

        <Col lg={5} className="register__col">
          <div className="form__inner">
            <Card>
              <div className="card__body">
                <Card.Body>
                  <div className="card__header">
                    <Card.Title>Register</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted title">
                      Let's create your account!
                    </Card.Subtitle>
                  </div>
                  <Form>
                    <Row>
                      <Col lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter first name"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter last name"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control type="password" placeholder="Confirm" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={7}>
                        <Button
                          type="submit"
                          variant="primary"
                          size="sm"
                          className="w-100"
                        >
                          Create Account
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="text-login">
                          Already have an account? <Link to="/">Login</Link>
                        </p>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
