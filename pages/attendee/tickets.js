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
  const [eventFilter, setEventFilter] = useState();
  const { data, status, isSuccess } = useQuery(['tickets', period], () =>
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
        <Row className="mb-3">
          <Col sm={4}>
            <select
              className="custom-select"
              onChange={(e) => {
                setEventFilter();
                setPeriod(e.target.value);
              }}
            >
              <option value="upcoming">Upcoming</option>
              <option value="previous">Previous</option>
            </select>
          </Col>
          {isSuccess && (
            <Col sm={8}>
              <select
                className="custom-select"
                onChange={(e) => setEventFilter(e.target.value)}
              >
                <option value="">Filter by event</option>
                {data.events.map((event) => (
                  <option key={event.eid} value={event.eid}>
                    {event.name}
                  </option>
                ))}
              </select>
            </Col>
          )}
        </Row>

        {status == 'loading' ? (
          <CenterSpinner />
        ) : status == 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <>
            <Row>
              {data.tickets.length > 0 ? (
                data.tickets
                  .filter((ticket) =>
                    eventFilter ? ticket.event.eid == eventFilter : true
                  )
                  .map((ticket) => (
                    <Col md={6} key={ticket.id} className="mb-4">
                      <TicketCard ticket={ticket} />
                    </Col>
                  ))
              ) : (
                <Col>
                  <Alert variant="warning">No events found</Alert>
                </Col>
              )}
            </Row>
          </>
        )}
      </Container>
    </AttendeeWrapper>
  );
}
