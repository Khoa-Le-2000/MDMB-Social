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
const ColBS = styled(Col)`
  padding-left: 0;
  padding-right: 0;
`;

function Chat() {
  return (
    <Wrapper fluid>
      <RowBS>
        <ColBS lg={4}>
          <SideBarRight />
        </ColBS>
        <Col lg={8}>
          <ChatContent />
        </Col>
      </RowBS>
    </Wrapper>
  );
}

export default Chat;
