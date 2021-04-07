import Link from 'next/link';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';


import useUser from '../../lib/query/useUser';
import AttendeeWrapper from '../../components/wrapper/AttendeeWrapper';

import { BreadcrumbOne } from '../../components/Breadcrumb';

import useUser from 'lib/query/useUser';

import CenterSpinner from 'components/custom/CenterSpinner';


export default function AttendeeHome() {
  const { data: user, status } = useUser(localStorage.getItem('userId'));
  return (
    

    <AttendeeWrapper title="Home">
      
      <BreadcrumbOne pageTitle='Home'>
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/attendee/home">
              <a>Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        {status == 'loading' ? (
          <CenterSpinner />
        ) : status == 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <>
            <p>Name: {user.name}</p>
            <p>User ID: {user.id}</p>
          </>
        )}

        <Row>
          <Col md={4} className="mb-3">
            <Link href="events">
              <a>
                <Card
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
            <Link href="tickets">
              <a>
                <Card
                  bg="border-white"
                  text="white"
                  style={{ background: '#40b3ff', border: 'none' }}
                >
                  <Card.Body>
                    <Card.Title>View tickets</Card.Title>
                    <Card.Text>See tickets and upcoming events ➜</Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Link>
          </Col>
        </Row>

        {/* <Row>
          <Col>
            <Link href="events">
              <button className="btn btn-fill-out">View events</button>
            </Link>
          </Col>
          <Col>
            <Link href="tickets">
              <button className="btn btn-fill-out">View tickets</button>
            </Link>
          </Col>
        </Row> */}
      </Container>
    </AttendeeWrapper>
    
  );
}
