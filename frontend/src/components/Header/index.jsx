import React from 'react';
import styled from 'styled-components';
import { Bell } from '@styled-icons/heroicons-outline';
import { Link } from 'react-router-dom';
import Logo from 'assets/images/logos/logo.jpg';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1081;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: inherit;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
`;
const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 10rem;
`;

const HeaderLogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 100%;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeaderNotification = styled.div`
  padding: 0.5rem 1rem;
`;
const NotificationIcon = styled(Bell)`
  width: 1.5rem;
  height: 1.5rem;
`;

const HeaderProfile = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileAvatarLink = styled(Link)`
  padding: 0.5rem 1rem;
`;
const ProfileAvatar = styled.div`
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  position: relative;
  display: inline-block;
  overflow: hidden;
  color: #fff;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  background: #ccc;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  &:hover {
    transition: ease-out 0.2s;
    border: 4px solid rgba(0, 0, 0, 0.2);
    -webkit-transition: ease-out 0.2s;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileName = styled.div`
  padding: 0.5rem 1rem;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  border: 2px solid transparent;
  border-radius: 100px;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Container>
        <HeaderInner>
          <HeaderLogoLink to={'/'}>
            <img src={Logo} alt="MDMB Logo" />
          </HeaderLogoLink>
          <HeaderLeft>
            <HeaderNotification>
              <NotificationIcon />
            </HeaderNotification>
            <HeaderProfile>
              <ProfileAvatarLink to={'/'}>
                <ProfileAvatar>
                  <img
                    src="https://images.unsplash.com/photo-1645524569551-bb14589a4d56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </ProfileAvatar>
              </ProfileAvatarLink>
              <ProfileName>
                <ProfileLink to={'/'}>Sara</ProfileLink>
              </ProfileName>
            </HeaderProfile>
          </HeaderLeft>
        </HeaderInner>
      </Container>
    </HeaderWrapper>
  );
}

export default Header;
