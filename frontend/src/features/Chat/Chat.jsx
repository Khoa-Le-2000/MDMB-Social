import ChatContent from 'features/Chat/ChatContent/ChatContent';
import SideBarLeft from 'features/Chat/SideBarLeft/SideBarLeft';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled(Container)`
  height: 100vh;
  overflow: hidden;
`;
const RowBS = styled(Row)`
  height: inherit;
`;
const ColBS = styled(Col)`
  padding-left: 0;
  padding-right: 0;
`;

function Chat() {
  return (
    <Wrapper fluid>
      <RowBS>
        <ColBS lg={3}>
          <SideBarLeft />
        </ColBS>
        <Col lg={9}>
          <ChatContent />
        </Col>
      </RowBS>
    </Wrapper>
  );
}

export default Chat;
