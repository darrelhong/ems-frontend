import { Container, Row, Spinner } from 'react-bootstrap';

export default function LoadingScreen() {
  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100">
        <Spinner animation="grow" />
      </Row>
    </Container>
  );
}
