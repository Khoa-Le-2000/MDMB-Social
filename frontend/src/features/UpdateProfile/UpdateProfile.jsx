import { Pencil } from '@styled-icons/heroicons-outline';
import MainLayout from 'layouts/MainLayout';
import React from 'react';
import {
  Button,
  Card,
  Col as BootstrapCol,
  Container as BootstrapContainer,
  Form,
  Row as BootstrapRow,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import _ from 'lodash';
import './updateProfile.scss';

const Col = styled.div`
  display: inline-flex;
  width: 100%;
  .react-datepicker__header {
    button {
      width: 25px;
      font-size: 1.2rem;
      border: 1px solid #e6e6e6;
      :hover {
        background-color: #cbeaff;
      }
    }
    select {
      border: 1px solid #e6e6e6;
    }
  }
  .react-datepicker-wrapper {
    input {
      border: 1px solid lightgrey;
      height: 40px;
      display: block;
      font-size: 1.2rem;
      width: 100%;
      :focus {
        border: 1px solid #e6e6e6;
      }
    }
  }
`;

const AvatarWrapper = styled.div`
  margin: 0 auto;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ff6738;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 0;
  bottom: 20px;
`;

const UploadIcon = styled(Pencil)`
  width: 1.1rem;
  height: 1.1rem;
  cursor: pointer;
  color: #ffffff;
`;

const UploadImageWrapper = styled.div`
  display: none;
  position: absolute;
`;

const UploadImageInput = styled.input.attrs({
  type: 'file',
})`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

function UpdateProfile() {
  const fileImageRef = React.useRef(null);

  const [startDate, setStartDate] = React.useState(new Date());
  const [gender, setGender] = React.useState(0);
  const [image, setImage] = React.useState({});
  const [uploading, setUploading] = React.useState(false);

  const max = new Date().getUTCFullYear();
  const min = max - 40;
  const years = _.range(min, max + 1);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const onGenderChange = (e) => {
    setGender(e.target.value);
  };

  const onUpdateProfileHandler = (e) => {
    e.preventDefault();
    console.log(gender);
  };
  const onUploadImage = (e) => {
    fileImageRef.current.click();
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    console.log('🚀 :: onImageChange :: file', file);
    let formData = new FormData();
    formData.append('image', file);
    console.log('🚀 :: onImageChange :: formData', formData.get('image'));
    try {
      // setImage({
      //   url: data.url,
      //   public_id: data.public_id,
      // });
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  return (
    <BootstrapContainer fluid>
      <MainLayout>
        <BootstrapContainer>
          <BootstrapRow>
            <Col
              style={{
                justifyContent: 'center',
              }}
            >
              <BootstrapCol lg={5}>
                <div>
                  <Card>
                    <div>
                      <Card.Body>
                        <div className="card__header">
                          <Card.Title className="text-center">
                            Profile
                          </Card.Title>
                          <Card.Subtitle className="my-4 text-muted title text-center">
                            Updates profile to let people know about you.
                          </Card.Subtitle>
                        </div>
                        <Form onSubmit={onUpdateProfileHandler}>
                          <BootstrapRow>
                            <BootstrapCol lg={12}>
                              <Form.Group className="mb-">
                                <AvatarWrapper>
                                  <img
                                    src="https://images.unsplash.com/photo-1645504812848-29c2ebd5cd54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                                    alt=""
                                  />
                                  <IconWrapper onClick={onUploadImage}>
                                    <UploadIcon />
                                    <UploadImageWrapper>
                                      <UploadImageInput
                                        ref={fileImageRef}
                                        onChange={onImageChange}
                                      />
                                    </UploadImageWrapper>
                                  </IconWrapper>
                                </AvatarWrapper>
                              </Form.Group>
                            </BootstrapCol>
                          </BootstrapRow>

                          <BootstrapRow>
                            <Col
                              lg={12}
                              style={{
                                justifyContent: 'flex-start',
                              }}
                            >
                              <Form.Group className="mb-3 3 w-100">
                                <Form.Label>Birth day </Form.Label>
                                <DatePicker
                                  renderCustomHeader={({
                                    date,
                                    changeYear,
                                    changeMonth,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                  }) => (
                                    <div
                                      style={{
                                        margin: 10,
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <button
                                        onClick={decreaseMonth}
                                        disabled={prevMonthButtonDisabled}
                                      >
                                        {'<'}
                                      </button>
                                      <select
                                        value={new Date(date).getFullYear()}
                                        onChange={({ target: { value } }) =>
                                          changeYear(value)
                                        }
                                      >
                                        {years.map((option) => (
                                          <option key={option} value={option}>
                                            {option}
                                          </option>
                                        ))}
                                      </select>

                                      <select
                                        value={
                                          months[new Date(date).getMonth()]
                                        }
                                        onChange={({ target: { value } }) =>
                                          changeMonth(months.indexOf(value))
                                        }
                                      >
                                        {months.map((option) => (
                                          <option key={option} value={option}>
                                            {option}
                                          </option>
                                        ))}
                                      </select>

                                      <button
                                        onClick={increaseMonth}
                                        disabled={nextMonthButtonDisabled}
                                      >
                                        {'>'}
                                      </button>
                                    </div>
                                  )}
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                />
                              </Form.Group>
                            </Col>
                          </BootstrapRow>

                          <BootstrapRow>
                            <Col lg={12}>
                              <Form.Group className="mb-3 w-100">
                                <Form.Label>Gender</Form.Label>
                                <div className="wrapper">
                                  <input
                                    type="radio"
                                    name="select"
                                    value="0"
                                    id="option-1"
                                    defaultChecked
                                    onChange={onGenderChange}
                                  />
                                  <input
                                    type="radio"
                                    name="select"
                                    id="option-2"
                                    value="1"
                                    onChange={onGenderChange}
                                  />
                                  <input
                                    type="radio"
                                    name="select"
                                    value="2"
                                    id="option-3"
                                    onChange={onGenderChange}
                                  />
                                  <label
                                    htmlFor="option-1"
                                    className="option option-1"
                                  >
                                    <div className="dot" />
                                    <span>Male</span>
                                  </label>
                                  <label
                                    htmlFor="option-2"
                                    className="option option-2"
                                  >
                                    <div className="dot" />
                                    <span>Female</span>
                                  </label>
                                  <label
                                    htmlFor="option-3"
                                    className="option option-3"
                                  >
                                    <div className="dot" />
                                    <span>Custom</span>
                                  </label>
                                </div>
                              </Form.Group>
                            </Col>
                          </BootstrapRow>

                          <BootstrapRow className="mt-5">
                            <Col>
                              <ButtonWrapper>
                                <Button
                                  type="submit"
                                  variant="default"
                                  size="sm"
                                >
                                  Skip
                                </Button>
                                <Button
                                  type="submit"
                                  variant="primary"
                                  size="sm"
                                >
                                  Update
                                </Button>
                              </ButtonWrapper>
                            </Col>
                          </BootstrapRow>
                        </Form>
                      </Card.Body>
                    </div>
                  </Card>
                </div>
              </BootstrapCol>
            </Col>
          </BootstrapRow>
        </BootstrapContainer>
      </MainLayout>
    </BootstrapContainer>
  );
}
export default UpdateProfile;
