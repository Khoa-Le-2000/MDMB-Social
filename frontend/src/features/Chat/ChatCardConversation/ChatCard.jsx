import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition-duration: 0.2s;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  padding-left: 0;
  &:hover {
    background: linear-gradient(to right, #f5f5f5, #f5f5f5);
  }
`;
const Card = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.div`
  padding-right: 10px;
  img {
    width: 52px;
    height: 52px;
    border: 1px solid rgba(255, 255, 255, 0.75);
    padding: 4px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Name = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const Message = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
`;
const Time = styled.p`
  font-size: 0.8rem;
`;

function ChatCard() {
  return (
    <Wrapper>
      <Card>
        <Avatar>
          <img
            src="https://images.unsplash.com/photo-1645947124804-4824d2621a17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </Avatar>
        <CardContent>
          <Name>Flo Stein</Name>
          <Message>Good morning, how are you?</Message>
        </CardContent>
        <Time>2 hour ago</Time>
      </Card>
    </Wrapper>
  );
}

export default ChatCard;
