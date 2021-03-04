import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineNotification,
} from 'react-icons/ai';
import { IoIosHeartEmpty } from 'react-icons/io';
import useUser from '../../lib/query/useUser';
import { logout } from '../../lib/auth';

const AttendeeHeaderTop = () => {
  const { data: localuser } = useUser(localStorage.getItem('userId'));
  console.log(JSON.stringify(localuser));
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
                      <AiOutlineNotification />
                      <span>Notification</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/other/wishlist">
                    <a>
                      <IoIosHeartEmpty />
                      <span>Wishlist</span>
                    </a>
                  </Link>
                </li>
                {/* <Link href={`/partner/profile-public?id=${JSON.stringify(localuser?.id)}`}> */}

                <li>
                  <Link href="/attendee/profile-account/">
                    <a>
                      <AiOutlineSetting />
                      <span>Settings</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a onClick={() => logout({ redirectTo: '/attendee/login' })}>
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

export default AttendeeHeaderTop;