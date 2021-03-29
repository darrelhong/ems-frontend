import PropTypes from 'prop-types';
import Link from 'next/link';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';

import { useEventDetails } from 'lib/query/events';

import { BreadcrumbOne } from 'components/Breadcrumb';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import EventImageGallery from 'components/events/partner/EventImageGallery';
import AddToCalendar from 'components/custom/AddToCalendar';
import ShareButton from 'components/custom/ShareButton';
import CenterSpinner from 'components/custom/CenterSpinner';

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

export default function PartnerEventPage({ id }) {
  const { data, status } = useEventDetails(id);

  return (
    <PartnerWrapper title={data?.name || 'Event page'}>
      {status === 'loading' ? (
        <CenterSpinner />
      ) : status === 'error' ? (
        <Alert variant="danger">An error has occured</Alert>
      ) : (
        <>
          <BreadcrumbOne pageTitle="Event">
            <ol className="breadcrumb justify-content-md-end">
              <li className="breadcrumb-item">
                <Link href="/partner/home">
                  <a>Partner Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/partner/events">
                  <a>Events</a>
                </Link>
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
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-fill-out mr-2"
                      disabled={!data.availableForSale}
                    >
                      Register Now
                    </button>
                    {!data.availableForSale && (
                      <p className="text-dark">Sale period has not started</p>
                    )}
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="col-auto mt-3">
                <ShareButton
                  title={data.name}
                  url={`${process.env.HOSTNAME}/public/events/${id}`}
                />
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
    </PartnerWrapper>
  );
}

PartnerEventPage.propTypes = {
  id: PropTypes.string,
};
