import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import LogoImg from 'assets/images/logos/logo.jpg';
import { ReactComponent as Message } from 'assets/images/icons/chat-fill.svg';
import { Contact as PhoneBook } from '@styled-icons/boxicons-solid';
import {
  Cog as Setting,
  LogOut,
  UserCircle,
} from '@styled-icons/boxicons-solid';
import { useState } from 'react';
import { ListGroup, Overlay, Popover } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'app/actions/login';
import { getAuth } from 'app/selectors/login';
import { useNavigate, Link } from 'react-router-dom';
import { getSocket } from 'app/selectors/socket';
import { getUserProfile } from 'app/actions/userProfile';

const HoverEffect = css`
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #6364af;
    color: #ffffff;
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  background: red;
  height: 97%;
  width: 90%;
  min-width: 90%;
  background-color: #4849a1;
  margin: 10%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap; /*Thiết lập chế độ wrap, khi các phần tử vượt qua kích thước hướng chính*/
  justify-content: flex-start; /*Căn chỉnh nội dung bên trong container có flexbox*/
  align-items: stretch; /*Căn chỉnh phần tử con theo hướng vuông góc hướng chính*/
  align-content: stretch;
  border-radius: 20px;
`;

const Logo = styled.img`
  cursor: pointer;
  color: #ffffff;
  justify-content: center;
  display: flex;
  vertical-align: middle;
  margin-top: 20px;
  content: url(${LogoImg});
  width: 3.5rem;
  height: 3.5rem;
  justify-content: center;
  align-self: center;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
  ${({ ContactActive }) =>
    ContactActive
      ? `@media(max-width:800px){
    position: fixed;
    display: block;
    left: 10px;
    top:-13px;
    width: 2.5rem;
    height: 2.5rem;
    border: 2px solid #1a79ff;
  }`
      : ''}
`;
const HoverWrapper = styled.div`
  color: #ffffff;
  justify-content: center;
  display: flex;
  vertical-align: middle;
  margin-top: 30%;
  ${(props) =>
    props.position === 'bottom' ? 'position:absolute; bottom:5%;' : ''}
  svg {
    border-radius: 20%;
    padding: 7px;
  }
  
`;

const MessageIcon = styled(Message)`
  ${HoverEffect}
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => (props.active ? '#6364af' : '')};
`;
const PhoneBookIcon = styled(PhoneBook)`
  ${HoverEffect}
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => (props.active ? '#6364af' : '')};
`;
const SettingIcon = styled(Setting)`
  ${HoverEffect}
  height: 3rem;
  width: 3rem;
  margin-left: 12px;
  background-color: ${(props) => (props.active ? '#6364af' : '')};
  ${({ ContactActive }) =>
    ContactActive
      ? `@media(max-width:800px){
    display: none
      }`
      : ''}
`;

const ListGroupBS = styled(ListGroup)`
  width: 150px;
`;
const ListItemBS = styled(ListGroup.Item)`
  border: none;
  &:first-child {
    border-bottom: 1px solid #e6e6e6;
  }
`;
const LogoutIcon = styled(LogOut)`
  height: 2.5rem;
  width: 2.5rem;
`;
const ProfileIcon = styled(UserCircle)`
  height: 2.5rem;
  width: 2.5rem;
`;
const PopoverBS = styled(Popover)`
  border-radius: 10px;
`;

function LefBar({ MessageActive, ContactActive }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const auth = useSelector(getAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSelector(getSocket);
  const [settingActive, setSettingActive] = useState(false);

  const handleSettingClick = (event) => {
    setShow(!show);
    setTarget(event.target);
    setSettingActive(!settingActive);
  };

  const handleLogoutClick = () => {
    socket.disconnect();
    dispatch(logout(auth?.accessToken));
    navigate('/login');
  };
  const handleUserProfileClick = () => {
    dispatch(getUserProfile(auth.accountId));

    navigate('/update-profile');
  };
  const handleLogoClick = () => {
    navigate('/');
  };
  const handleContactClick = () => {
    navigate('/contact');
  };
  const handleChatClick = () => {
    navigate('/');
  };
  React.useEffect(() => {
    const disaprearSetting = setTimeout(() => {
      setShow(false);
      setSettingActive(false);
    }, 8000);
    return () => {
      clearTimeout(disaprearSetting);
    };
  });
  return (
    <Wrapper className="LeftBar">
      <Logo onClick={handleLogoClick} ContactActive={ContactActive} />
      <HoverWrapper>
        <MessageIcon active={MessageActive ? 1 : 0} onClick={handleChatClick} />
      </HoverWrapper>
      <HoverWrapper>
        <PhoneBookIcon
          active={ContactActive ? 1 : 0}
          onClick={handleContactClick}
        />
      </HoverWrapper>
      <HoverWrapper position="bottom">
        <div ref={ref}>
          <SettingIcon
            onClick={handleSettingClick}
            active={settingActive ? 1 : 0}
            ContactActive={ContactActive}
          />
          <Overlay show={show} target={target} placement="top" container={ref}>
            <PopoverBS>
              <Popover.Body>
                <ListGroupBS>
                  <div onClick={handleUserProfileClick}>
                    <ListItemBS action>
                      <ProfileIcon />
                      Profile
                    </ListItemBS>
                  </div>
                  <ListItemBS action onClick={handleLogoutClick}>
                    <LogoutIcon />
                    Logout
                  </ListItemBS>
                </ListGroupBS>
              </Popover.Body>
            </PopoverBS>
          </Overlay>
        </div>
      </HoverWrapper>
    </Wrapper>
  );
}
export default LefBar;
