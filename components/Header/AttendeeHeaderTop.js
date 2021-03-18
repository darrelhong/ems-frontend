import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head';

import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineNotification,
} from 'react-icons/ai';
import { IoIosHeartEmpty } from 'react-icons/io';
import { logout } from '../../lib/auth';
import useUser from '../../lib/query/useUser';
import { getUser } from '../../lib/query/getUser';
import { useState, useEffect } from 'react';

const AttendeeHeaderTop = () => {
  // const { data: user } = useUser(localStorage.getItem('userId'));
  // console.log(user?.id);
  const [user, setUser] = useState();
  useEffect(() => {
    const getUserData = async () => {
      await getUser(localStorage.getItem('userId')).then((data) => {

        console.log(data);

        setUser(data);
      });
    };
    getUserData();
  }, []);
  return (
    <div className="top-header d-lg-block">
        <Head>
    <script src="https://embed.ravenhub.io/js/app.js"></script>
    </Head>
      <Container>
        <Row>
          <Col>
            <div className="text-right">
              <ul className="header-list" >
              <li>
                
                <a>
                <notification-center  appId="WLU2yLZw9d" subscriberId= {"attendee" + user?.id} />
                </a>
            </li>
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
