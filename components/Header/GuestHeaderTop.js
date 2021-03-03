import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { IoIosHeartEmpty } from 'react-icons/io';
import useUser from '../../lib/query/useUser';
import { login } from '../../lib/auth';

const GuestHeaderTop = () => {
  return (
    <div className="top-header d-lg-block">
      <Container>
        <Row>
          <Col>
            <div className="text-right">
              <ul className="header-list">
                <li>
                  <Link href="/">
                    <a>
                      <AiOutlineUser />
                      <span>Login/Sign Up</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GuestHeaderTop;
