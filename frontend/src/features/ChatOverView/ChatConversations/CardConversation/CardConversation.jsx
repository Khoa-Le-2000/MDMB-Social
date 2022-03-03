import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition-duration: 0.2s;
  overflow-y: hidden;
  overflow-x: hidden;
  padding: 10px;
  padding-left: 0;
  &:hover {
    background: linear-gradient(to right, #f5f5f5, #f5f5f5);
  }
  border-radius: 10px;
  /* background: ${(props) => (props.texting ? '#eae1eb' : 'none')};
  border-right: ${(props) => (props.texting ? '3px solid #82135f' : 'none')}; */
`;
const Card = styled.div`
  display: flex;
  max-height: 52px;
  width: 100%;
  cursor: pointer;
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Avatar = styled.div`
  padding-right: 10px;
  img {
    width: 52px;
    height: 52px;
    /* border: 1px solid rgba(255, 255, 255, 0.75); */
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
  display: inline-block;
  overflow: hidden;
`;
const Time = styled.div`
  font-size: 0.8rem;
  display: inline-block;
  min-width: 80px;
`;

function CardConvention({ onSelectRoom, id }) {
  const onRoomChange = (room) => {
    onSelectRoom(id);
  };

  return (
    <Wrapper>
      <Card onClick={onRoomChange}>
        <Avatar>
          <img
            src="https://images.unsplash.com/photo-1645947124804-4824d2621a17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </Avatar>
        <CardContent>
          <Name>Flo Stein</Name>
          <Message>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dolore
            consequuntur, placeat maiores impedit inventore totam rem
            repellendus praesentium voluptas enim eveniet dolor perspiciatis
            labore architecto voluptatem sit ratione fugiat, quod dolores
            laudantium vitae itaque nesciunt asperiores! Rem, veniam sapiente.
            Repellendus cumque reprehenderit eum excepturi aspernatur sapiente
            labore hic earum.
          </Message>
        </CardContent>
        <Time>2 hour ago</Time>
      </Card>
    </Wrapper>
  );
}

export default CardConvention;
