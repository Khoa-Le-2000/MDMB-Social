
import styled from 'styled-components';
import { X } from '@styled-icons/heroicons-solid';

const Wrapper = styled.div`
    padding:10px 10px 10px 10px;
    width:100%;
    height:40px;
    display:flex;
    flex-direction: row;
    border-bottom: solid 2px #efeff3;
    align-items:center;
`
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
width:70%;
`
const CloseIcon = styled(X)`
width:10%;
justify-content: center;
padding:0.4rem;
`

function SearchChatConversation({item}){
    return (
        <Wrapper>
            <Avatar>
              <img src={item.Avatar} alt="" />
            </Avatar>
            <Name>{item.Name}</Name>
            <CloseIcon/>
        </Wrapper>
    )
}
export default SearchChatConversation;