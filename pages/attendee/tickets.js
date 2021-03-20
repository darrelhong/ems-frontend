import Link from 'next/link';
import { useQuery } from 'react-query';
import { format, parseISO } from 'date-fns';

import api from 'lib/ApiClient';

import { BreadcrumbOne } from 'components/Breadcrumb';
import AttendeeWrapper from 'components/wrapper/AttendeeWrapper';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import CenterSpinner from 'components/custom/CenterSpinner';

const getTickets = async () => {
  const { data } = await api.get('/api/ticketing/attendee');
  return data;
};

export default function AttendeeTickets() {
  const { data, status } = useQuery('tickets', getTickets);

  return (
    <AttendeeWrapper title="View my tickets">
      <BreadcrumbOne pageTitle="Tickets">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/attendee/home">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Tickets</li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        {status == 'loading' ? (
          <CenterSpinner />
        ) : status == 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <>
            <Row className="mt-3">
              {data.map((ticket) => (
                <Col md={6} key={ticket.id} className="mb-4">
                  <Card bg="light" border="light">
                    <Card.Header>ID: {ticket.id}</Card.Header>
                    <Card.Body>
                      <Card.Title>{ticket.event.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-dark font-weight-normal">
                        Attendee: {ticket.attendee.name}
                      </Card.Subtitle>
                      <Card.Text className="mb-0">
                        Payment: {ticket.paymentStatus}
                      </Card.Text>
                      <Card.Text>
                        Purchase Date:{' '}
                        {format(
                          parseISO(ticket.dateTimeOrdered),
                          'dd MMM yyyy'
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </AttendeeWrapper>
  );
}
