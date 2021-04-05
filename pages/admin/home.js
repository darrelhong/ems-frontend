import Link from 'next/link';
import { Card, Col, Container, Row } from 'react-bootstrap';

import useUser from 'lib/query/useUser';

import { BreadcrumbOne } from 'components/Breadcrumb';
import CenterSpinner from 'components/custom/CenterSpinner';
import AdminWrapper from 'components/wrapper/AdminWrapper';

export default function AdminHome() {
  const { data: user, isSuccess, isLoading } = useUser(
    localStorage.getItem('userId')
  );

  return (
    <AdminWrapper title="Admin Dasboard">
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
        {isLoading && <CenterSpinner />}
        {isSuccess && (
          <p>
            Your are logged in as {user?.name}. ID: {user?.id}
          </p>
        )}
        <Row>
          <Col sm={6} lg={4} className="mb-4">
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
          <Col sm={6} lg={4} className="mb-4">
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
          <Col sm={6} lg={4} className="mb-4">
            <Card>
              <Card.Header>Attendee</Card.Header>
              <Card.Body>
                <Card.Text>View attendees</Card.Text>
                <Link href="/admin/attendee">
                  <button className="btn btn-fill-out btn-sm">View</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWrapper>
  );
}
