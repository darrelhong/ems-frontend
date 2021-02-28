import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

import { AiOutlineUser, AiOutlineSetting, AiOutlineLogout, AiOutlineNotification } from 'react-icons/ai';

import useUser from '../../lib/query/useUser';

import { logout } from '../../lib/auth';


const OrganiserHeaderTop = () => {
  const { data: user } = useUser(localStorage.getItem('userId'));


  return (
    <div className="top-header d-lg-block">
      <Container>
        <Row>
          <Col>
            <div className="text-right">
              <ul className="header-list">
              <li>
                  <Link href={{
                    pathname:"/organiser/profile-public",
                    query: { paraId: JSON.stringify(user?.id)}}}>
                    <a>
                    <AiOutlineNotification />
                      <span>Notification</span>
                    </a>
                  </Link>
                </li>
                <li>
                <Link href={{
                    pathname:"/organiser/profile-public",
                    query: { paraId: JSON.stringify(user?.id)}}}>
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

export default OrganiserHeaderTop;
