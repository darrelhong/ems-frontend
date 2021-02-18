import { Link } from '@chakra-ui/react';
import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';
import {
  IoIosHeartEmpty
} from "react-icons/io";
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
                  <Link href="/other/wishlist">
                    <a>
                    <AiOutlineUser />
                      <span>Profile</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/organiser/profile-account">
                    <a>
                      <AiOutlineSetting />
                      <span>Settings</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a onClick={() => logout({ redirectTo: '/organiser/login' })}>
                    <AiOutlineLogout/>
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
