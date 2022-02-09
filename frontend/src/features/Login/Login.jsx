/* eslint-disable no-control-regex */
import React from 'react';
import './Login.scss';
import Hero1 from 'assets/images/heros/hero1.svg';
import Hero2 from 'assets/images/heros/hero2.svg';
import Hero3 from 'assets/images/heros/hero3.svg';

import GoogleIcon from 'assets/images/icons/google.svg';
import FacebookIcon from 'assets/images/icons/facebook.svg';
import GithubIcon from 'assets/images/icons/github.svg';

import { Link, useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Row, Container, Col, Form, Button, Carousel } from 'react-bootstrap';
import axios from 'axios';

const schema = yup.object().shape({
  emailorphone: yup
    .string('Email or phone number must be a string')
    .required("Email or phone number can't be empty")
    .test(
      'emailorphone',
      'Email or phone number is not valid',
      function (value) {
        const emailRegex =
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})/;
        const isValidEmail = emailRegex.test(value);
        const isValidPhone = phoneRegex.test(value);

        if (!isValidEmail && !isValidPhone) {
          return false;
        }
        return true;
      }
    ),
  password: yup.string('').min(6).max(32).required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onLoginHandler = async (data) => {
    console.log(data);

    const response = await axios.post(
    // 'http://localhost:8080/account/login',
    'http://13.250.46.59:8080/account/login',
      {
        Username: data.emailorphone,
        Password: data.password,
      }
    );

    console.log(response);

    // login().then(() => {
    //   navigate('/dashboard');
    // });
  };

  return (
    <Container>
      <div className="login__inner">
        <Row>
          <Col lg={6} md={6} sm={6} className="login__column">
            <div className="login__wrap">
              <h2>Login</h2>
              <h5 className="title">
                Welcome to MDMB Social, please put your credentials below to
                start using the app.
              </h5>

              <Form className="form" onSubmit={handleSubmit(onLoginHandler)}>
                <Form.Group className="mb-3" controlId="formPlaintextEmail">
                  <Col sm="12" className="form__input">
                    <Form.Control
                      placeholder="Email or phone number"
                      {...register('emailorphone')}
                    />
                    {errors.emailorphone && (
                      <Form.Text className="text-danger">
                        {errors.emailorphone?.message}
                      </Form.Text>
                    )}
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Col sm="12" className="form__input">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      {...register('password')}
                    />
                    {errors.password && (
                      <Form.Text className="text-danger">
                        {errors.password?.message}
                      </Form.Text>
                    )}
                  </Col>
                </Form.Group>

                <div className="form__forgot">
                  <small className="forgot__title">
                    <Link to="/forgot">Forgot password?</Link>
                  </small>
                </div>
                <hr />

                <div className="form__btn">
                  <Form.Group className="form__group-checkbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                  <Button type="submit" className="btn-login">
                    Login
                  </Button>
                </div>
                <div className="sign__other">
                  <p className="sign__other--text">Or continue with</p>
                  <div className="sign__other--icon">
                    <div className="img__border">
                      <a href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=717762328687-iludtf96g1hinl76e4lc1b9a82g457nn.apps.googleusercontent.com&scope=profile%20email&redirect_uri=https%3A%2F%2Fstackauth.com%2Fauth%2Foauth2%2Fgoogle&state=%7B%22sid%22%3A1%2C%22st%22%3A%2259%3A3%3Abbc%2C16%3Aa049838fec06b231%2C10%3A1644235567%2C16%3A1143c846ce2139c8%2C74cf371fa1ad9bae6105a04bba70c5378451e0af0be8518078ae4ff00220ed19%22%2C%22cid%22%3A%22717762328687-iludtf96g1hinl76e4lc1b9a82g457nn.apps.googleusercontent.com%22%2C%22k%22%3A%22Google%22%2C%22ses%22%3A%22a18098a0d6d440e18341d025e4451334%22%7D&response_type=code&flowName=GeneralOAuthFlow">
                        <img
                          src={GoogleIcon}
                          alt="google"
                          className="img__img"
                        />
                      </a>
                    </div>
                    <div className="img__border">
                      <img
                        src={FacebookIcon}
                        alt="facebook"
                        className="img__img"
                      />
                    </div>
                    <div className="img__border">
                      <img src={GithubIcon} alt="github" className="img__img" />
                    </div>
                  </div>
                </div>

                <div className="form__register_detail">
                  <p>Don't have an account?</p>
                  <p className="register__wrap">
                    <Link to="/register">Register now</Link>
                  </p>
                </div>
              </Form>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Carousel fade variant="dark" className="slider">
              <Carousel.Item>
                <div className="hero">
                  <img className="w-100" src={Hero1} alt="icon" />
                </div>
                <Carousel.Caption>
                  <h3 className="slider__heading">First slide label</h3>
                  <p className="slider__desc">
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="hero">
                  <img className="w-100" src={Hero2} alt="icon" />
                </div>
                <Carousel.Caption>
                  <h3 className="slider__heading">Second slide label</h3>
                  <p className="slider__desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="hero">
                  <img className="w-100" src={Hero3} alt="icon" />
                </div>

                <Carousel.Caption>
                  <h3 className="slider__heading">Third slide label</h3>
                  <p className="slider__desc">
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </div>
      ;
    </Container>
  );
}

export default Login;
