import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff, ArrowNarrowRight } from '@styled-icons/heroicons-solid';
import React from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { registerUser } from 'redux/actions/authAction';
import { getRedirect } from 'redux/selectors/authSelector';
import styled from 'styled-components';
import * as yup from 'yup';
import {
  getErrorRegister,
  getErrorMessageRegister,
} from 'redux/selectors/authSelector';
import './register.scss';

const IconEye = styled(Eye)`
  width: 1.2rem;
`;

const IconEyeOff = styled(EyeOff)`
  width: 1.2rem;
`;

const IconArrowNarrowRight = styled(ArrowNarrowRight)`
  width: 1.2rem;
  height: 100%;
`;

const ButtonCreateAccount = styled(Button)`
  position: relative;
  overflow: hidden;
  padding-right: 0;
  vertical-align: middle;
  z-index: 1;
  cursor: pointer;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,
    box-shadow 0.1s ease, background 0.1s ease, -webkit-box-shadow 0.1s ease;
`;

const ButtonContent = styled.div`
  left: auto;
  right: 0;
  position: relative;
  margin-right: 1.5em;
  transition: right 0.3s ease 0s;
  will-change: transform, opacity;

  ${ButtonCreateAccount}:hover & {
    left: auto;
    right: 200%;
  }
`;

const IconInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 25%;
  left: auto;
  right: -70%;
  margin-top: -0.5em;
  transition: right 0.3s ease 0s;
  ${ButtonCreateAccount}:hover & {
    left: auto;
    right: 0;
  }
`;

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Username must be at least 2 characters')
    .required('Username  is required')
    .matches(
      /^((?![0-9\\~\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\_\\+\\=\\-\\[\]\\{\\}\\;\\:\\"\\\\/\\<\\>\\?]).){2,45}/,
      'Username is not contain special characters'
    ),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phone: yup
    .string()
    .required('Phone is required')
    .min(10, 'Phone is invalid')
    .max(10, 'Phone is invalid')
    .matches(
      /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
      'Phone is invalid'
    ),
  password: yup
    .string()
    .min(
      6,
      'Passwords must contain 6 characters, one uppercase, one lowercase and one number'
    )
    .max(32, 'Passwords must be less than 32 characters in length')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,32})/,
      'Passwords must contain 6 characters, one uppercase, one lowercase and one number'
    ),
  confirmPassword: yup
    .string()
    .min(6, 'Passwords must be at least 6 characters in length')
    .max(32, 'Passwords must be less than 32 characters in length')
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);

  const [showError, setShowError] = React.useState(true);

  const messageErrorRegister = useSelector(getErrorMessageRegister);
  const hasError = useSelector(getErrorRegister);

  console.log('🚀 :: Register :: showError', showError);
  console.log('🚀 :: Register :: hasError', hasError);

  React.useEffect(() => {
    const timerShowError = setTimeout(() => {
      setShowError(false);
    }, 3000);
    return () => clearTimeout(timerShowError);
  }, [hasError]);

  const isRedirectRegister = useSelector(getRedirect)?.register;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onRegisterHandler = (data, e) => {
    e.preventDefault();
    dispatch(registerUser(data));
    // navigate('/');
  };

  let priorityError = 0;
  if (errors.username?.message) {
    priorityError = 1;
  } else if (errors.email?.message) {
    priorityError = 2;
  } else if (errors.phone?.message) {
    priorityError = 3;
  } else if (errors.password?.message) {
    priorityError = 4;
  } else if (errors.confirmPassword?.message) {
    priorityError = 5;
  } else if (hasError && showError) {
    priorityError = 6;
  } else priorityError = 0;

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

      <Row className="h-100">
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
                  <Form onSubmit={handleSubmit(onRegisterHandler)}>
                    <Row>
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type="text"
                            {...register('username')}
                            placeholder="Enter your username"
                          />
                          <Form.Text className="text-danger">
                            {priorityError === 1 && errors.username?.message
                              ? errors.username?.message
                              : ''}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            {...register('email')}
                            placeholder="Enter your email"
                          />
                          <Form.Text className="text-danger">
                            {priorityError === 2 && errors.email?.message
                              ? errors.email?.message
                              : null}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="string"
                            {...register('phone')}
                            placeholder="Enter your phone"
                          />
                          {priorityError === 3 && errors.phone?.message ? (
                            <Form.Text className="text-danger">
                              {errors.phone?.message}
                            </Form.Text>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6}>
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                          <FormControl
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            placeholder="Enter your password"
                          />
                          <InputGroup.Text
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <IconEye /> : <IconEyeOff />}
                          </InputGroup.Text>
                        </InputGroup>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Confirm Password</Form.Label>
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
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginBottom: '15px',
                      }}
                    >
                      <Col lg={12}>
                        {priorityError === 4 && errors.password?.message ? (
                          <Form.Text className="text-danger">
                            {errors.password?.message}
                          </Form.Text>
                        ) : priorityError === 5 &&
                          errors.confirmPassword?.message ? (
                          <Form.Text className="text-danger">
                            {errors.confirmPassword?.message}
                          </Form.Text>
                        ) : priorityError === 6 && hasError ? (
                          <Form.Text className="text-danger">
                            {messageErrorRegister}
                          </Form.Text>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={7}>
                        <ButtonCreateAccount
                          type="submit"
                          variant="primary"
                          size="sm"
                          className="w-100"
                        >
                          <ButtonContent>Create Account</ButtonContent>
                          <IconInner>
                            <IconArrowNarrowRight />
                          </IconInner>
                        </ButtonCreateAccount>
                      </Col>
                    </Row>
                    <Row className="pt-3">
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
