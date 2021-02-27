import Head from 'next/head';
import Link from 'next/link';
import { Card, Col, Container, Row } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';

import withProtectRoute from '../../components/ProtectRouteWrapper';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { FooterOne } from '../../components/Footer';
import AdminHeaderTop from '../../components/Header/AdminHeaderTop';

function AdminHome() {
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
            <Link href="/admin/home">
              <a>Admin Home</a>
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
        <Row>
          <Col sm={6} lg={4}>
            <Card>
              <Card.Header>Event organisers</Card.Header>
              <Card.Body>
                <Card.Text>View event organisers</Card.Text>
                <Link href="/admin/eventorg">
                  <button className="btn btn-fill-out btn-sm">View</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} lg={4}>
            <Card>
              <Card.Header>Business partners</Card.Header>
              <Card.Body>
                <Card.Text>View business partners</Card.Text>
                <Link href="/admin/bizpartners">
                  <button className="btn btn-fill-out btn-sm">View</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <FooterOne />
    </>
  );
}

export default withProtectRoute(AdminHome, { redirectTo: '/admin/login' });
