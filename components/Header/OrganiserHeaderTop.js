import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head';

import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineNotification,
} from 'react-icons/ai';

import useUser from '../../lib/query/useUser';
import { getUser } from '../../lib/query/getUser';
import { useState, useEffect } from 'react';
import { logout } from '../../lib/auth';

const OrganiserHeaderTop = () => {
  const { data: user } = useUser(localStorage.getItem('userId'));
  // console.log("user?.id" + user?.id);
  return (
    <div className="top-header d-lg-block">
      <Head>
        <script src="https://embed.ravenhub.io/js/app.js"></script>
      </Head>
      <Container>
        <Row>
          <Col>
            <div className="text-right">
              <ul className="header-list">
                <li>
                  <a>
                    <notification-center
                      appId="WLU2yLZw9d"
                      subscriberId={'organiser' + user?.id}
                    />
                  </a>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/organiser/organiser-profile',
                      query: { paraId: JSON.stringify(user?.id) },
                    }}
                  >
                    <a style={{ color: '#292b2c' }}>
                      <AiOutlineUser />
                      <span>Profile</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/organiser/profile-account">
                    <a style={{ color: '#292b2c' }}>
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
