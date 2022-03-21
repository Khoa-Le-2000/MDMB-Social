import styled from 'styled-components';
import { X } from '@styled-icons/heroicons-solid';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  padding: 10px 10px 10px 10px;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  border-bottom: solid 2px #efeff3;
  align-items: center;
`;
const Avatar = styled.div`
  width: 20%;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Name = styled.div`
  width: 70%;
`;
const CloseIcon = styled(X)`
  width: 2rem;
  justify-content: center;
  padding: 0.4rem;
`;
const UserNotFound = styled.div`
  height: 30px;
  margin: 10px 0 0 10px;
`;
function SearchChatConversation({ item , parentCallback, Icon}) {
  const navigate = useNavigate();

  const handleFriendCardClick = (AccountId) => {
    navigate(`/chat/${AccountId}`);
  };
  const sendData = () => {
    parentCallback(item.AccountId);
  }
  return (
    <Wrapper>
      <Avatar
        onClick={() => {
          handleFriendCardClick(item.AccountId);
        }}
      >
        <img src={item.Avatar} alt="" />
      </Avatar>
      <Name
        onClick={() => {
          handleFriendCardClick(item.AccountId);
        }}
      >
        {item.Name}
      </Name>
      {Icon&&<CloseIcon onClick={sendData} />}
    </Wrapper>
  );
}
export default SearchChatConversation;
