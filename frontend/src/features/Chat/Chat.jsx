import ChatContent from 'features/Chat/ChatContent/ChatContent';
import SideBarRight from 'features/Chat/SideBarRight/SideBarRight';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled(Container)`
  height: 100vh;
`;
const RowBS = styled(Row)`
  height: inherit;
`;

function Chat() {
  return (
    <Wrapper fluid>
      <RowBS>
        <Col lg={4}>
          <SideBarRight />
        </Col>
        <Col lg={8}>
          <ChatContent />
        </Col>
      </RowBS>
    </Wrapper>
  );
}

export default Chat;
