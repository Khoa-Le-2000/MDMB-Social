import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import './Register.scss';
function Register({ isRedirectRegister }) {
  return (
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
                          Bạn có muốn tạo tài khoản ngrok cho
                          hungsmeb@gmail.com?
                        </h4>
                      </div>
                      <Form className="card__form-group">
                        <div>
                          <Button variant="secondary">Quay Lại</Button>
                          <Button>Tạo mới tài khoản</Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                }
              />
            </Routes>
          )}
          Register page
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
