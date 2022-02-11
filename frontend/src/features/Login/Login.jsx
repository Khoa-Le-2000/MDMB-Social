/* eslint-disable no-control-regex */
import { yupResolver } from '@hookform/resolvers/yup';
import Hero1 from 'assets/images/heros/hero1.svg';
import Hero2 from 'assets/images/heros/hero2.svg';
import Hero3 from 'assets/images/heros/hero3.svg';
import FacebookIcon from 'assets/images/icons/facebook.svg';
import GoogleIcon from 'assets/images/icons/google.svg';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Button, Carousel, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginByGoogle, login } from 'redux/actions/authAction';
import * as yup from 'yup';
import './Login.scss';
import GoogleLogin from 'react-google-login';
// import ReCAPTCHA from 'react-google-recaptcha';

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

function Login({ auth }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refRecapCha = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onLoginHandler = async (data) => {
    // const recaptchaValue = refRecapCha.current.getValue();
    // console.log('recaptchaValue: ', recaptchaValue);

    dispatch(login(data));
    navigate('/dashboard');
  };

  const handleGoogleLoginFailure = (error) => {
    console.log('🚀 :: file: index.jsx :: line 18 :: error', error);
  };

  const handleGoogleLoginSuccess = async (googleData) => {
    dispatch(loginByGoogle(googleData.tokenId));
  };

  return auth ? (
    <Navigate to="/dashboard" replace={true} />
  ) : (
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
                {/* <ReCAPTCHA
                  ref={refRecapCha}
                  sitekey={process.env.REACT_APP_GOOGLE_SITE_KEY}
                /> */}
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
                      <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy="single_host_origin"
                        className="img__google-login"
                        icon={false}
                      >
                        <img
                          src={GoogleIcon}
                          alt="google"
                          className="img__img"
                        />
                      </GoogleLogin>
                    </div>
                    <div className="img__border">
                      <button className="img__facebook-login">
                        <img
                          src={FacebookIcon}
                          alt="facebook"
                          className="img__img"
                        />
                      </button>
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
    </Container>
  );
}

export default Login;
Login.propTypes = {
  auth: PropTypes.string,
};
