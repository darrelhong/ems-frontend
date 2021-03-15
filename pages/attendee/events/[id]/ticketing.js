import PropTypes from 'prop-types';
import { useState } from 'react';

import { useEvent } from 'lib/query/events';
import { formatter } from 'lib/util/currency';

import AttendeeWrapper from 'components/wrapper/AttendeeWrapper';
import CenterSpinner from 'components/custom/CenterSpinner';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { BreadcrumbOne } from 'components/Breadcrumb';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

export default function AttendeeEventTicketing({ id }) {
  const { data, status } = useEvent(id);
  const [numTickets, setNumTickets] = useState(1);

  return (
    <AttendeeWrapper title="Get tickets">
      {status === 'loading' ? (
        <CenterSpinner />
      ) : status === 'error' ? (
        <Alert variant="danger">An error has occured</Alert>
      ) : (
        <>
          <BreadcrumbOne pageTitle="Ticketing">
            <ol className="breadcrumb justify-content-md-end">
              <li className="breadcrumb-item">
                <Link href="/attendee/home">
                  <a>Attendee Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/attendee/events">
                  <a>Events</a>
                </Link>
              </li>
              <li className="breadcrumb-item active">{data.name}</li>
            </ol>
          </BreadcrumbOne>

          <Container className="my-4">
            <Row className="justify-content-center">
              <Col lg={7}>
                <Row>
                  <Col>
                    <h3>{data.name}</h3>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col>
                    <p>
                      Starts on:{' '}
                      {format(
                        parseISO(data.eventStartDate),
                        'eee, dd MMM yy hh:mmbbb'
                      )}
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col xs={6} sm={8}>
                    <p className="text-dark">
                      <strong>Ticket Price: </strong>
                      {formatter.format(data.ticketPrice)}
                    </p>
                  </Col>
                  <Col>
                    <div className="input-group input-group-sm">
                      <select
                        className="custom-select"
                        id="quantity"
                        value={numTickets}
                        onChange={(e) => {
                          setNumTickets(e.target.value);
                        }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                      <div className="input-group-append">
                        <label
                          className="input-group-text"
                          htmlFor="inputGroupSelect02"
                        >
                          Qty
                        </label>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className="mb-5">
                  <Col>
                    <p>
                      Sales end on{' '}
                      {format(
                        parseISO(data.saleStartDate),
                        'eee, dd MMM yy hh:mmbbb'
                      )}
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h4>Order summary:</h4>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <p className="text-dark">{numTickets} x Standard ticket</p>
                  </Col>
                  <Col className="col-auto">
                    <p className="text-dark">
                      {formatter.format(data.ticketPrice * numTickets)}
                    </p>
                  </Col>
                </Row>
                <hr></hr>
                <Row className="mb-4">
                  <Col>
                    <p className="h4 text-body">Total</p>
                  </Col>
                  <Col className="col-auto">
                    <p className="h5 text-body">
                      {formatter.format(data.ticketPrice * numTickets)}
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <button className="btn btn-fill-out btn-sm">
                      Checkout
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </AttendeeWrapper>
  );
}

AttendeeEventTicketing.propTypes = {
  id: PropTypes.string,
};
