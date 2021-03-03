import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
} from 'react-icons/ai';

import { logout } from '../../lib/auth';

const PartnerHeaderTop = () => {
  return (
    <div className="top-header">
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
                  <Link href="/partner/profile-account">
                    <a>
                      <AiOutlineSetting />
                      <span>Settings</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a onClick={() => logout({ redirectTo: '/partner/login' })}>
                    <AiOutlineLogout />
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

export default PartnerHeaderTop;
