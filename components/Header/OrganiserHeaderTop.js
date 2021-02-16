import { Link } from '@chakra-ui/react';
import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';

import { logout } from '../../lib/auth';

const OrganiserHeaderTop = () => {
  return (
    <div className="top-header d-lg-block">
      <Container>
        <Row>
          <Col>
            <div className="text-right">
              <ul className="header-list">
                <li>
                  <Link href="/organiser/settings">
                    <a>
                      <AiOutlineSetting />
                      <span>Settings</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a onClick={() => logout({ redirectTo: '/organiser/login' })}>
                    <AiOutlineUser />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrganiserHeaderTop;
