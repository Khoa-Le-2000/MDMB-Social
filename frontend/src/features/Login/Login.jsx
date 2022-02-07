import React from 'react';
import './Login.css';
import Alert from 'react-bootstrap/Alert';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import loginIcon from '../../images/user.png';
import uiImg from '../../images/background.png';
function Login() {
  return (
    <div>
      <Container className='mt-5'>
        <Row>
          <Col lg={4} md={6} sm={12} className = "text-center p-3">
            <img className="icon-img" src={loginIcon} alt="icon"/>
            
            <p>
              Welcome to MDMB Social, please put your credentials below to start using the app!
            </p>
            <br />

            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email or phone number" />
            
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <div className="decor">
              <a href="#"><small className="reset">Forgot Password?</small></a>
            </div>
            <hr />
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary btn-primary" size="lg" type="submit">Login</Button>
            </div>
            <br/>
             
            <div className="decor">
              <p>Don't have an account?</p>
              <a href="#"><small className="reset">Register now</small></a>
            </div>
            
            
          </Form>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <img className="w-100" src={uiImg} alt="icon"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Login;
