import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import './register.scss';

function Register({ isRedirectRegister }) {
  return (
    <div className="register">
      <Container>
        <Row className="flex justify-content-center">
          <Col className="col">
            {isRedirectRegister && (
              <Routes>
                <Route
                  path="/google"
                  element={
                    <div className="card__wrap-new">
                      <div className="card__body">
                        <div className="card__info">
                          <h3>Google</h3>
                          <h4>
                            Do you want to create a MDMB Social account for
                          </h4>
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
            )}
            <h3>Register page</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
