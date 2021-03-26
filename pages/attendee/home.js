import Link from 'next/link';
import { Alert, Col, Container, Row } from 'react-bootstrap';

import useUser from 'lib/query/useUser';

import { BreadcrumbOne } from 'components/Breadcrumb';
import AttendeeWrapper from 'components/wrapper/AttendeeWrapper';
import CenterSpinner from 'components/custom/CenterSpinner';

export default function AttendeeHome() {
  const { data: user, status } = useUser(localStorage.getItem('userId'));
  return (
    <AttendeeWrapper title="Attendee Home">
      <BreadcrumbOne pageTitle={'Welcome ' + user?.name}>
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
        </Row>
      </Container>
    </AttendeeWrapper>
  );
}
