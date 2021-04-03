import Link from 'next/link';
import { Card, Col, Container, Row } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';

import { BreadcrumbOne } from '../../components/Breadcrumb';
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';

export default function OrganiserHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <OrganiserWrapper title="Home">
      <BreadcrumbOne pageTitle="Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/home">
              <a>Home</a>
            </Link>
          </li>
        </ol>

        {/* <ol>
          <li>
            <Link href="/organiser/events">
              <a>View Events</a>
            </Link>
          </li>

          <li>
            <Link href="/organiser/events/create">
              <a>Create Event</a>
            </Link>
          </li>
        </ol> */}
      </BreadcrumbOne>

      <Container className="my-4">
        {isLoading && <div className="spinner-grow" role="status" />}
        {isSuccess && (
          <>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
          </>
        )}
        <Row>
          <Col md={4} className="mb-3">
            <Link href="events">
              <a className="w-100 h-100">
                <Card
                  className="h-100"
                  bg="border-white"
                  text="white"
                  style={{ background: '#ff3e00', border: 'none' }}
                >
                  <Card.Body>
                    <Card.Title>View events</Card.Title>
                    <Card.Text>Discover new and exciting events ➜</Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Link>
          </Col>

          <Col md={4} className="mb-3">
            <Link href="view/partners">
              <a className="w-100 h-100">
                <Card
                  className="h-100"
                  bg="border-white"
                  text="white"
                  style={{ background: '#40b3ff', border: 'none' }}
                >
                  <Card.Body>
                    <Card.Title>View partners</Card.Title>
                    <Card.Text>Manage business partners ➜</Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Link>
          </Col>

          <Col md={4} className="mb-3">
            <Link href="view/organisers">
              <a className="w-100 h-100">
                <Card
                  className="h-100"
                  bg="border-white"
                  text="white"
                  style={{ background: '#676778', border: 'none' }}
                >
                  <Card.Body>
                    <Card.Title>View organisers</Card.Title>
                    <Card.Text>Manage event organisers ➜</Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Link>
          </Col>
        </Row>
      </Container>
    </OrganiserWrapper>
  );
}
