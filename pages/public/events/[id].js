import PropTypes from 'prop-types';
import Link from 'next/link';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';

import { useEvent } from 'lib/query/events';

import GuestWrapper from 'components/wrapper/GuestWrapper';
import { BreadcrumbOne } from 'components/Breadcrumb';
import EventImageGallery from 'components/events/partner/EventImageGallery';
import AddToCalendar from 'components/custom/AddToCalendar';
import ShareButton from 'components/custom/ShareButton';
import CenterSpinner from 'components/custom/CenterSpinner';
import { FaHeart } from 'react-icons/fa';
import { formatter } from 'lib/util/currency';

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

export default function PublicEventPage({ id }) {
  const { data, status } = useEvent(id, { isPublic: true });

  return (
    <GuestWrapper title={data?.name || 'Event page'}>
      {status === 'loading' ? (
        <CenterSpinner />
      ) : status === 'error' ? (
        <Alert variant="danger">An error has occured</Alert>
      ) : (
        <>
          <BreadcrumbOne pageTitle="Event">
            <ol className="breadcrumb justify-content-md-end">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <a>Events</a>
              </li>
              <li className="breadcrumb-item active">{data.name}</li>
            </ol>
          </BreadcrumbOne>

          <Container className="space-pt--r100 space-pb--r100">
            <Row>
              <Col lg={6}>
                <EventImageGallery images={data.images} />
              </Col>
              <Col lg={6}>
                <div className="pt-3">
                  <h3>{data.name}</h3>
                  <p>organised by: {data.eventOrganiser.name}</p>

                  <h5 className="text-dark">Location: {data.address}</h5>

                  <br></br>

                  <p className="text-dark font-weight-bold d-inline">
                    Starts:{' '}
                  </p>
                  <p className="text-default d-inline">
                    {format(
                      parseISO(data.eventStartDate),
                      'eee, dd MMM yy hh:mmbbb'
                    )}
                  </p>
                  <br></br>
                  <p className="text-dark font-weight-bold d-inline">Ends: </p>
                  <p className="text-default d-inline">
                    {format(
                      parseISO(data.eventEndDate),
                      'eee, dd MMM yy hh:mmbbb'
                    )}
                  </p>

                  <br></br>

                  <AddToCalendar event={data} />

                  <br></br>
                  <br></br>

                  <p className="text-dark d-inline">Sales period: </p>
                  <p className="text-default d-inline">
                    {`${format(
                      parseISO(data.saleStartDate),
                      'dd MMM yy hh:mmbbb'
                    )} to ${format(
                      parseISO(data.salesEndDate),
                      'dd MMM yy hh:mmbbb'
                    )}`}
                  </p>

                  <br></br>
                  <br></br>

                  {data.sellingTicket && (
                    <>
                      <p
                        className="text-body"
                        style={{ fontSize: 20, marginBottom: 8 }}
                      >
                        {formatter.format(data.ticketPrice)}
                      </p>
                      <button
                        onClick={() =>
                          alert(
                            'Please login or create and account buy tickets'
                          )
                        }
                        className="btn btn-success"
                        disabled={Date.parse(data.eventStartDate) < Date.now()}
                      >
                        Get tickets
                      </button>
                    </>
                  )}
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col className="col-auto">
                <ShareButton
                  title={data.name}
                  url={`${process.env.HOSTNAME}/public/events/${id}`}
                />
              </Col>
              <Col className="col-auto">
                <button
                  className="btn btn-sm btn-outline-pink"
                  onClick={() =>
                    alert('Please login or create and account to save events')
                  }
                >
                  Favourite <FaHeart color="#e83e8c" />
                </button>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <h5>About this event</h5>
                <p>{data.descriptions}</p>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </GuestWrapper>
  );
}

PublicEventPage.propTypes = {
  id: PropTypes.string,
};
