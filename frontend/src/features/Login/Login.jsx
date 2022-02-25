import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from '@styled-icons/heroicons-solid';
import Hero1 from 'assets/images/heros/hero1.svg';
import Hero2 from 'assets/images/heros/hero2.svg';
import Hero3 from 'assets/images/heros/hero3.svg';
import FacebookIcon from 'assets/images/icons/facebook.svg';
import GoogleIcon from 'assets/images/icons/google.svg';
import { useViewport } from 'hooks';
import React from 'react';
import { Button, Carousel, Col, Form, InputGroup, Row } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  login,
  loginByGoogle,
  loginFailure,
  verifyCaptcha,
} from 'redux/actions/authAction';
import {
  getCaptcha,
  getErrorCount,
  getErrorLogin,
  getErrorMessageLogin,
} from 'redux/selectors/authSelector';
import styled from 'styled-components';
import * as yup from 'yup';
import './login.scss';

const IconEye = styled(Eye)`
  width: 1.2rem;
`;

const IconEyeOff = styled(EyeOff)`
  width: 1.2rem;
`;

const schema = yup.object().shape({
  emailorphone: yup
    .string()
    .required('Email or phone is required')
    .test('emailorphone', 'Email or phone number is invalid', function (value) {
      const emailRegex =
        /^([a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/;

      const phoneRegex = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

      const isValidEmail = emailRegex.test(value);
      const isValidPhone = phoneRegex.test(value);

      if (!isValidEmail && !isValidPhone) {
        return false;
      }
      return true;
    }),
  password: yup
    .string()
    .min(6, 'Passwords must be at least 6 characters in length')
    .max(60, 'Passwords must be less than 60 characters in length')
    .required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refRecapCha = React.useRef();

  const isHuman = useSelector(getCaptcha)?.success;
  const countError = useSelector(getErrorCount);
  const messageErrorLogin = useSelector(getErrorMessageLogin);
  const hasError = useSelector(getErrorLogin);
  const { width } = useViewport();

  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onLoginHandler = (data, e) => {
    e.preventDefault();
    if (countError >= 3) {
      const response = refRecapCha.current.getValue();
      if (response) {
        dispatch(verifyCaptcha(response));
        refRecapCha.current?.reset();
        setMessage('');
      } else {
        setMessage('Please check the captcha');
        return;
      }
      if (isHuman) {
        dispatch(login(data));
        refRecapCha.current?.reset();
        navigate('/');
      }
    }
    dispatch(login(data));
    if (!hasError) {
      navigate('/');
    }
    reset();
  };

  const handleGoogleLoginFailure = (error) => {
    dispatch(loginFailure(error.message));
  };

  const handleGoogleLoginSuccess = (googleData) => {
    dispatch(loginByGoogle(googleData.tokenId, navigate));
  };

  const responseFacebook = async (response) => {};

  const handleFacebookLoginFailure = (error) => {};

  const componentClicked = (data) => {};

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

  return (
    <div className="login__inner">
      <Row
        style={{
          flexDirection: 'row-reverse',
        }}
      >
        <Col
          lg={width >= 1024 ? 5 : width >= 768 ? 6 : 12}
          md={width >= 1024 ? 5 : width >= 768 ? 6 : 12}
          sm={width >= 1024 ? 5 : width >= 768 ? 6 : 12}
          className="login__column"
        >
          <div className="login__wrap">
            <h2>Log In</h2>
            <h5 className="title">
              Welcome to MDMB Social, please put your credentials below to start
              using the app.
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
                </Col>
              </Form.Group>

              <Form.Group className="form-group__input">
                <Col sm="12" className="form__input">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      {...register('confirmPassword')}
                      placeholder="Confirm Password"
                    />
                    <InputGroup.Text
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      {showPassword ? <IconEye /> : <IconEyeOff />}
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Form.Group>
              <Row>
                <Col lg={12}>
                  {errors.emailorphone?.message ? (
                    <Form.Text className="text-danger">
                      {errors.emailorphone?.message}
                    </Form.Text>
                  ) : errors.password?.message ? (
                    <Form.Text className="text-danger">
                      {errors.password?.message}
                    </Form.Text>
                  ) : (
                    errorMessage
                  )}
                </Col>
              </Row>

              <div className="form__forgot">
                <small className="forgot__title">
                  <Link to="/forgot">Forgot password?</Link>
                </small>
              </div>

              {countError >= 3 && (
                <ReCAPTCHA
                  ref={refRecapCha}
                  sitekey={process.env.REACT_APP_GOOGLE_SITE_KEY}
                  onExpired={() => {
                    refRecapCha.current?.reset();
                  }}
                />
              )}
              <hr />

              <div className="form__btn">
                {width >= 372 && (
                  <Form.Group className="form__group-checkbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                )}
                <Button
                  type="submit"
                  className="btn-login"
                  onKeyDown={(event) =>
                    event.key === 'Enter' && onLoginHandler()
                  }
                >
                  Log In
                </Button>
              </div>
              <div className="sign__other">
                <p className="sign__other--text">OR</p>
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
                      <img src={GoogleIcon} alt="google" className="img__img" />
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
          <Col
            lg={width >= 1024 ? 7 : width >= 768 ? 6 : 12}
            md={width >= 1024 ? 7 : width >= 768 ? 6 : 12}
            sm={12}
          >
            <Carousel
              fade={false}
              className="slider"
              touch={false}
              slide={true}
              nextIcon=""
              prevIcon=""
            >
              <Carousel.Item interval={1000}>
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
  );
}

export default Login;
// Login.propTypes = {};
