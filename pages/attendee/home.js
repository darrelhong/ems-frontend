import Head from 'next/head';
import Link from 'next/link';
import { Card, Col, Container, Row } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';

import withProtectRoute from '../../components/ProtectRouteWrapper';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { FooterOne } from '../../components/Footer';
import AdminHeaderTop from '../../components/Header/AdminHeaderTop';

function AttendeeHome() {
  const { data: user, isSuccess, isLoading } = useUser(
    localStorage.getItem('userId')
  );

  return (
    <>
      <Head>
        <title>Admin Dasboard</title>
      </Head>

      <AdminHeaderTop />

      <BreadcrumbOne pageTitle="Admin Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/attendee/home">
              <a>Participant Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container className="space-pt--30 space-pb--30">
        {isLoading && <div className="spinner-grow" role="status" />}
        {isSuccess && (
          <p>
            Your are logged in as {user?.name}. ID: {user?.id}
          </p>
        )}
      </Container>

      <FooterOne />
    </>
  );
}

export default withProtectRoute(AttendeeHome, {
  redirectTo: '/attendee/login',
});
