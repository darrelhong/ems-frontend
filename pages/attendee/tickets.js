import Link from 'next/link';
import { useQuery } from 'react-query';

import api from 'lib/ApiClient';

import { BreadcrumbOne } from 'components/Breadcrumb';
import AttendeeWrapper from 'components/wrapper/AttendeeWrapper';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import CenterSpinner from 'components/custom/CenterSpinner';
import TicketCard from 'components/custom/ticketing/TicketCard';
import { useState } from 'react';

const getTickets = async (period) => {
  const { data } = await api.get(`/api/ticketing/attendee?period=${period}`);
  return data;
};

export default function AttendeeTickets() {
  const [period, setPeriod] = useState('upcoming');
  const { data, status } = useQuery(['tickets', period], () =>
    getTickets(period)
  );

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
        <Row className="mb-3" onChange={(e) => setPeriod(e.target.value)}>
          <Col sm={4}>
            <select className="custom-select">
              <option value="upcoming">Upcoming</option>
              <option value="previous">Previous</option>
            </select>
          </Col>
        </Row>

        {status == 'loading' ? (
          <CenterSpinner />
        ) : status == 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <>
            <Row>
              {data.map((ticket) => (
                <Col md={6} key={ticket.id} className="mb-4">
                  <TicketCard ticket={ticket} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </AttendeeWrapper>
  );
}
