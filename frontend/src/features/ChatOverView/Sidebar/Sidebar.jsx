import React from 'react';
import styled from 'styled-components';
import LogoImg from 'assets/images/logos/logo.jpg';
import { ReactComponent as Message } from 'assets/images/icons/chat-fill.svg';
import { Contact as PhoneBook } from '@styled-icons/boxicons-solid';
import { Cog as Setting } from '@styled-icons/boxicons-solid';
import { useState } from 'react';

const Wrapper = styled.div`
  height: 97%;
  width: 90%;
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
  color: #ffffff;
  justify-content: center;
  display: flex;
  vertical-align: middle;
  margin-top: 20px;
  content: url(${LogoImg});
  width: 4rem;
  justify-content: center;
  align-self: center;
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;
const HoverWraper = styled.div`
  color: #ffffff;
  justify-content: center;
  display: flex;
  vertical-align: middle;
  margin-top: 30%;
  &:hover svg {
    transform: scale(1.2);
    cursor: pointer;
    background-color: #6364af;
  }
  ${(props) =>
    props.position === 'bottom' ? 'position:absolute; bottom:5%;' : ''}
  svg {
    border-radius: 20%;
    padding: 7px;
  }
`;

const MessageIcon = styled(Message)`
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => (props.choosed ? '#6364af' : '')};
`;
const PhoneBookIcon = styled(PhoneBook)`
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => (props.choosed ? '#6364af' : '')};
`;
const SettingIcon = styled(Setting)`
  height: 3rem;
  width: 3rem;
  margin-left: 15px;
  background-color: ${(props) => (props.choosed ? '#6364af' : '')};
`;
const List = styled.ul`
  position:absolute;
  display:flex;
  flex-direction: column;
  bottom:30px;
  left:68px;
  list-style-type: none;
  background-color:#939393;
  padding:10px;
  border-radius:10px 10px 10px 0px;
  width:150px ;
  `;
const ListMember = styled.li`
`;
function LefBar() {
  const [ShowList, setShowList] = useState(false);

  const handleSettingclick = ()=>{
    setShowList(prev=>!prev)
  }
  return (
    <Wrapper>
      <Logo />
      <HoverWraper>
        <MessageIcon choosed />
      </HoverWraper>
      <HoverWraper>
        <PhoneBookIcon />
      </HoverWraper>
      <HoverWraper position="bottom">
        <SettingIcon onClick={handleSettingclick}/>
       {ShowList&& <List >
          <ListMember >Edit Profile</ListMember>
          <ListMember>Edit Profile</ListMember>
          <ListMember>Edit Profile</ListMember>
        </List>
        }
      </HoverWraper>
    </Wrapper>
  );
}
export default LefBar;
