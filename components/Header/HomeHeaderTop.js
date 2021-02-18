import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineHome } from 'react-icons/ai';

const HomeHeaderTop = () => {
  return (
    <div className="top-header d-lg-block">
      <Container>
        <Row className="align-items-start">
          <Col>
            <div className="text-left">
              <ul className="header-list">
                <li>
                  <Row>
                    <AiOutlineHome />
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </Row>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeHeaderTop;
