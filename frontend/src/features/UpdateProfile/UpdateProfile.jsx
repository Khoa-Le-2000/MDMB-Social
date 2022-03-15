import { Pencil } from '@styled-icons/heroicons-outline';
import MainLayout from 'layouts/MainLayout';
import React, { useEffect } from 'react';
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
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfileSelector } from 'app/selectors/userProfile';
import { getUserProfile } from 'app/actions/userProfile';
import { getAuth } from 'app/selectors/login';

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
const NameInput = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

function UpdateProfile() {
  const dispatch = useDispatch();
  const accountId = useSelector(getAuth)?.accountId;

  useEffect(() => {
    dispatch(getUserProfile(accountId));
  }, []);
  const userInfor = useSelector(getUserProfileSelector);

  // console.log(userInfor);

  const fileImageRef = React.useRef(null);

  const [startDate, setStartDate] = React.useState(
    new Date(userInfor.Birthday)
  );
  const [gender, setGender] = React.useState(userInfor.Gender);
  const [image, setImage] = React.useState(userInfor.Avatar);
  const [name, setName] = React.useState(userInfor.Name);
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
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const checkRegex = (userUpdate) => {
    const regBirthday =
      /^(?:19|20)\d\d([\/.-])(?:0[1-9]|1[012])\1(?:0[1-9]|[12]\d|3[01])$/;
    const regGender = /^\d$/;
    const regName =
      /^((?![0-9\~\!\@\#\$\%\^\&\*\(\)\_\+\=\-\[\]\{\}\;\:\"\\\/\<\>\?]).){2,45}/;
      
    const regLink =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

      console.log(userUpdate.Name);
    if (!regName.test(userUpdate.Name))
      return { result: 'error', message: `Name invalid! ${(userUpdate.Name.length<2||userUpdate.Name.length>45)? "Length must be 2-45 char":"Name not contains special character"}` };
    if (!regGender.test(userUpdate.Gender))
      return { result: 'error', message: 'Gender invalid' };
    if (!regBirthday.test(userUpdate.Birthday))
      return { result: 'error', message: 'Birthday invalid' };
    if (userUpdate.Avatar ? !regLink.test(userUpdate.Avatar) : false)
      return { result: 'error', message: "Avatar Url invalid" };

    return { result: 'success' };
  };
  const onUpdateProfileHandler = async (e) => {
    e.preventDefault();
    let userUpdate = {};
    userUpdate.Email = userInfor.Email;
    userUpdate.Name = name;
    userUpdate.Birthday = startDate.toISOString().split('T')[0];
    userUpdate.Gender = gender;
    let formData = new FormData();
    let blob = await fetch(image).then((r) => r.blob());
    formData.append('file', blob);
    formData.append('upload_preset', 'exh5f6wa');
    formData.append('api_key', '827926361528927');
    if (image !== userInfor.Avatar)
      await axios
        .post('https://api.cloudinary.com/v1_1/dqkdfl2lp/upload', formData)
        .then((Response) => {
          let imageTemp = Response.data.secure_url;
          userUpdate.Avatar = imageTemp;
        });

    console.log(checkRegex(userUpdate));
  };
  // setUploading(false);

  const onUploadImage = (e) => {
    fileImageRef.current.click();
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <BootstrapContainer fluid>
      <MainLayout Name={userInfor.Name} Avatar={userInfor.Avatar}>
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
                          <BootstrapRow className="card-row">
                            <BootstrapCol lg={12}>
                              <Form.Group className="mb-">
                                <AvatarWrapper>
                                  <img src={image} alt="" />
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

                          <BootstrapRow className="card-row">
                            <BootstrapCol lg={12}>
                              <Form.Group className="mb-">
                                <NameInput
                                  value={name}
                                  onChange={onNameChange}
                                />
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
                                <Form.Label>Birthday </Form.Label>
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
                                    defaultChecked={
                                      userInfor.Gender === 0 ||
                                      userInfor.Gender === null
                                    }
                                    onChange={onGenderChange}
                                  />
                                  <input
                                    type="radio"
                                    name="select"
                                    id="option-2"
                                    value="1"
                                    defaultChecked={userInfor.Gender === 1}
                                    onChange={onGenderChange}
                                  />
                                  <input
                                    type="radio"
                                    name="select"
                                    value="2"
                                    id="option-3"
                                    defaultChecked={userInfor.Gender === 2}
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
                                    <span>Unset</span>
                                  </label>
                                </div>
                              </Form.Group>
                            </Col>
                          </BootstrapRow>

                          <BootstrapRow className="card-row">
                            <BootstrapCol lg={12}>
                              <Form.Group className="mb- email-phone">
                                <input placeholder={userInfor.Email} disabled />
                                <input placeholder={userInfor.Phone} disabled />
                              </Form.Group>
                            </BootstrapCol>
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
