/* eslint-disable no-control-regex */
import { yupResolver } from '@hookform/resolvers/yup';
import Hero1 from 'assets/images/heros/hero1.svg';
import Hero2 from 'assets/images/heros/hero2.svg';
import Hero3 from 'assets/images/heros/hero3.svg';
import FacebookIcon from 'assets/images/icons/facebook.svg';
import GoogleIcon from 'assets/images/icons/google.svg';
import React, { useRef, useState } from 'react';
import { Button, Carousel, Col, Container, Form, Row } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  login,
  loginByGoogle,
  loginFailure,
  verifyCaptcha,
} from 'redux/actions/authAction';
import {
  getAuth,
  getCaptcha,
  getErrorCount,
  getErrorLogin,
  getErrorMessageLogin,
  getRedirect,
} from 'redux/selectors/authSelector';
import * as yup from 'yup';
import './Login.scss';
import authApi from 'apis/authApi';
import { useViewport } from 'hooks';

const schema = yup.object().shape({
  emailorphone: yup
    .string('Email or số điện thoại không hợp lệ')
    .required('Email không được để trống')
    .test(
      'emailorphone',
      'Email hoặc số điện thoại không đúng định dạng',
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
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(32, 'Mật khẩu không được quá 32 ký tự')
    .required('Mật khẩu không được để trống'),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refRecapCha = useRef();

  const isHuman = useSelector(getCaptcha)?.success;
  const countError = useSelector(getErrorCount);
  const messageErrorLogin = useSelector(getErrorMessageLogin);
  const hasError = useSelector(getErrorLogin);
  const isAuthenticated = useSelector(getAuth)?.accessToken;
  const isRedirectRegister = useSelector(getRedirect)?.register;

  const [message, setMessage] = useState('');

  const { width } = useViewport();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onLoginHandler = (data, e) => {
    e.preventDefault();
    if (countError >= 3) {
      const response = refRecapCha.current.getValue();
      if (response) {
        dispatch(verifyCaptcha(response));
        setMessage('');
      } else {
        setMessage('Vui lòng xác nhận bằng captcha');
        return;
      }
      if (isHuman) {
        dispatch(login(data));
        navigate('/dashboard');
      }
    }
    dispatch(login(data));
    if (!hasError) {
      navigate('/dashboard');
    }
  };

  const handleGoogleLoginFailure = (error) => {
    dispatch(loginFailure(error.message));
  };

  const handleGoogleLoginSuccess = (googleData) => {
    dispatch(loginByGoogle(googleData.tokenId));
    if (isRedirectRegister) {
    }
  };

  const responseFacebook = async (response) => {
    console.log(response);
    const { accessToken } = response;
    const data = await authApi.loginWithFacebook(accessToken);
    console.log('🚀 :: responseFacebook :: data', data);
  };

  const handleFacebookLoginFailure = (error) => {
    console.log(error);
  };

  const componentClicked = (data) => {
    console.log(data);
  };

  let errorMessage;
  if (message !== '') {
    errorMessage = <Form.Text className="text-danger">{message}</Form.Text>;
  } else if (hasError) {
    errorMessage = (
      <Form.Text className="text-danger">{messageErrorLogin}</Form.Text>
    );
  } else {
    errorMessage = null;
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace={true} />
  ) : (
    <Container>
      <div className="login__inner">
        <Row>
          <Col
            lg={width >= 768 ? 6 : 12}
            md={width >= 768 ? 6 : 12}
            sm={width >= 768 ? 6 : 12}
            className="login__column"
          >
            <div className="login__wrap">
              <h2>Log in</h2>
              <h5 className="title">
                Welcome to MDMB Social, please put your credentials below to
                start using the app.
              </h5>

              <Form className="form" onSubmit={handleSubmit(onLoginHandler)}>
                <Form.Group
                  className="form-group__input"
                  controlId="formPlaintextEmail"
                >
                  <Col sm="12" className="form__input">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      placeholder="Email or phone number"
                      {...register('emailorphone')}
                    />
                    {errors.emailorphone ? (
                      <Form.Text className="text-danger">
                        {errors.emailorphone?.message}
                      </Form.Text>
                    ) : (
                      errorMessage
                    )}
                  </Col>
                </Form.Group>

                <Form.Group className="form-group__input">
                  <Col sm="12" className="form__input">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      {...register('password')}
                    />
                    {errors.password ? (
                      <Form.Text className="text-danger">
                        {errors.password?.message}
                      </Form.Text>
                    ) : (
                      errorMessage
                    )}
                  </Col>
                </Form.Group>

                <div className="form__forgot">
                  <small className="forgot__title">
                    <Link to="/forgot">Forgot password?</Link>
                  </small>
                </div>

                {countError >= 3 && (
                  <ReCAPTCHA
                    ref={refRecapCha}
                    sitekey={process.env.REACT_APP_GOOGLE_SITE_KEY}
                  />
                )}
                <hr />

                <div className="form__btn">
                  {width >= 372 && (
                    <Form.Group className="form__group-checkbox">
                      <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                  )}
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

                    <div
                      className="img__border"
                      style={{
                        position: 'relative',
                      }}
                    >
                      <img
                        src={FacebookIcon}
                        alt="facebook"
                        className="img__img"
                      />
                      <FacebookLogin
                        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                        textButton=""
                        icon={false}
                        onFailure={handleFacebookLoginFailure}
                        buttonStyle={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          display: 'block',
                          position: 'absolute',
                          top: '0',
                          left: '0',
                          width: '100%',
                          height: '100%',
                        }}
                        onClick={componentClicked}
                        callback={responseFacebook}
                      />
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
          {width >= 768 && (
            <Col lg={6} md={6} sm={12}>
              <Carousel
                fade
                variant="dark"
                className="slider"
                touch={false}
                nextIcon=""
                prevIcon=""
              >
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
          )}
        </Row>
      </div>
    </Container>
  );
}

export default Login;
// Login.propTypes = {};
