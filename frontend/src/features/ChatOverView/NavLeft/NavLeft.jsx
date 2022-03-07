import React from 'react';
import styled from 'styled-components';
import LogoImg from 'assets/images/logos/logo.jpg';
import { ReactComponent as Message } from 'assets/images/icons/messageIcon3.svg';
import { ReactComponent as PhoneBook } from 'assets/images/icons/phone-book.svg';
import { ReactComponent as Setting } from 'assets/images/icons/setting.svg';

const Wrapper = styled.div`
    height:97% ;
    width:80%;
    background-color: #67125f ;
    margin:10% ;
    display: flex;                  
    flex-direction: column;
    flex-wrap: nowrap;              /*Thiết lập chế độ wrap, khi các phần tử vượt qua kích thước hướng chính*/
    justify-content: flex-start;      /*Căn chỉnh nội dung bên trong container có flexbox*/
    align-items: stretch;           /*Căn chỉnh phần tử con theo hướng vuông góc hướng chính*/
    align-content: stretch;
    border-radius: 30px;

  *{
    color :#ffffff;
    justify-content:center ;
    display:flex;
    vertical-align:middle ;
  } 
    
`

const Logo = styled.img`
  margin-top:20px;
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
  margin-top:30%;
  :hover {
    transform: scale(1.2 );
    cursor: pointer;
    *{
      background-color: #73266b;
    }

  }
  ${props => props.position==="bottom" ?
    "position:absolute; bottom:5%;"
    : ""
  }
  *{
    border-radius:20%;
    padding:7px;
  }
`

const MessageIcon = styled(Message)`
  width: 3rem;
  background-color:  ${props=>props.choosed?"#7b3e75":""};
`
const PhoneBookIcon = styled(PhoneBook)`
  width: 3rem;
  background-color:  ${props=>props.choosed?"#7b3e75":""};

`
const SettingIcon = styled(Setting)`
  height: 3.7rem;
  width: 3.7rem;
  margin-left:20px;
  background-color:  ${props=>props.choosed?"#7b3e75":""};
`
function LefBar() {
  return (
    <Wrapper >
      <Logo />
      <HoverWraper><MessageIcon choosed/></HoverWraper>
      <HoverWraper><PhoneBookIcon /></HoverWraper>
      <HoverWraper position="bottom"><SettingIcon /></HoverWraper>

    </Wrapper>
  );
}
export default LefBar;