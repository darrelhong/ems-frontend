import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from 'react-query';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';

import { useEventDetails } from 'lib/query/events';
import { formatter } from 'lib/util/currency';
import api from 'lib/ApiClient';
import useUser from 'lib/query/useUser';

import AttendeeWrapper from 'components/wrapper/AttendeeWrapper';
import CenterSpinner from 'components/custom/CenterSpinner';
import { BreadcrumbOne } from 'components/Breadcrumb';
import ButtonWithLoading from 'components/custom/ButtonWithLoading';
import PaymentView from 'components/custom/ticketing/PaymentView';

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}
const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
export default function AttendeeEventTicketing({ id }) {
  const { data, status } = useEventDetails(id);
  const { data: attendee } = useUser();

  const [ticketQty, setTicketQty] = useState(1);
  const [view, setView] = useState('summary');

  const [clientSecret, setClientSecret] = useState('');
  const [checkoutResponse, setCheckoutResponse] = useState();
  const [paymentCompleteResp, setPaymentCompleteResp] = useState();

  const { mutate: checkout, isError, isLoading } = useMutation(
    (data) => api.post('/api/ticketing/checkout', data),
    {
      onSuccess: (resp) => {
        setCheckoutResponse(resp.data);
        setClientSecret(resp.data.clientSecret);
        setView('payment');
      },
    }
  );

  const onPaymentCompleteResp = (resp) => {
    setPaymentCompleteResp(resp.data);
    setView('success');
  };

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
              <li className="breadcrumb-item">
                <Link href={`/attendee/events/${id}`}>
                  <a>{data.name}</a>
                </Link>
              </li>
              <li className="breadcrumb-item active">Checkout</li>
            </ol>
          </BreadcrumbOne>

          <Container className="my-4">
            <Row className="justify-content-center">
              <Col lg={7}>
                {view == 'summary' ? (
                  <>
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
                            value={ticketQty}
                            onChange={(e) => {
                              setTicketQty(e.target.value);
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
                        <p className="text-dark">
                          {ticketQty} x Standard ticket
                        </p>
                      </Col>
                      <Col className="col-auto">
                        <p className="text-dark">
                          {formatter.format(data.ticketPrice * ticketQty)}
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
                          {formatter.format(data.ticketPrice * ticketQty)}
                        </p>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        {isError && (
                          <Alert variant="danger" role="alert">
                            An error has occured. Please refresh and try again.
                          </Alert>
                        )}
                        <ButtonWithLoading
                          className="btn btn-fill-out btn-sm"
                          onClick={() => checkout({ eventId: id, ticketQty })}
                          isLoading={isLoading}
                        >
                          Checkout
                        </ButtonWithLoading>
                      </Col>
                    </Row>
                  </>
                ) : view == 'payment' ? (
                  <Elements stripe={promise}>
                    <PaymentView
                      clientSecret={clientSecret}
                      attendee={attendee}
                      checkoutResponse={checkoutResponse}
                      onPaymentCompleteResp={onPaymentCompleteResp}
                      event={data}
                    />
                  </Elements>
                ) : view == 'success' ? (
                  <>
                    <Row>
                      <Col>
                        <h3>Order Confirmed</h3>
                        <p>Payment success! Your order has been completed.</p>

                        <h4>Details</h4>
                        <h5>
                          {ticketQty} ticket{ticketQty > 1 ? 's' : null} to{' '}
                          {data.name}
                        </h5>

                        <Row className="mt-3">
                          {paymentCompleteResp.map((ticket) => (
                            <Col md={6} key={ticket.id} className="mb-4">
                              <Card bg="light" border="light">
                                <Card.Header>ID: {ticket.id}</Card.Header>
                                <Card.Body>
                                  <Card.Title>{ticket.event.name}</Card.Title>
                                  <Card.Subtitle className="mb-2 text-dark font-weight-normal">
                                    Attendee: {ticket.attendee.name}
                                  </Card.Subtitle>
                                  <Card.Text>
                                    Payment: {ticket.paymentStatus}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>

                        <br></br>
                        <Link href="/attendee/tickets">
                          <button className="btn btn-fill-out btn-sm">
                            View my tickets
                          </button>
                        </Link>
                      </Col>
                    </Row>
                  </>
                ) : null}
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
