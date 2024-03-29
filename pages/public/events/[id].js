import PropTypes from 'prop-types';
import Link from 'next/link';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import { FaHeart } from 'react-icons/fa';

import { useEventDetails } from 'lib/query/events';
import { formatter } from 'lib/util/currency';

import GuestWrapper from 'components/wrapper/GuestWrapper';
import { BreadcrumbOne } from 'components/Breadcrumb';
import EventImageGallery from 'components/events/partner/EventImageGallery';
import AddToCalendar from 'components/custom/AddToCalendar';
import ShareButton from 'components/custom/ShareButton';
import CenterSpinner from 'components/custom/CenterSpinner';
import EventCategoryList from 'components/custom/events/EventCategoryList';
import { RiVipLine } from "react-icons/ri";

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

export default function PublicEventPage({ id }) {
  const { data, status } = useEventDetails(id, { isPublic: true });

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
                  <h3>{data.name} {data.isVip == true && (<RiVipLine color="#ff324d"/>)}</h3>
                  <span>
                    Organised By: {" "}
                    <Link
                      href={{
                        pathname: '/organiser/organiser-profile',
                        query: {
                          paraId: JSON.stringify(data?.eventOrganiser?.id),
                        },
                      }}
                    >
                      {data?.eventOrganiser?.name}
                    </Link>{' '} </span>
                    <div>
                    <EventCategoryList categories={data.category} />
                    <span>{data.descriptions}</span></div>
                    <br></br>
                  <span className="text-dark font-weight-bold d-inline">Location: {" "}</span>
                  <span className="text-default d-inline"> {data.address}</span>

                 
                <br></br>

                  <span className="text-dark font-weight-bold d-inline">
                    Starts:{' '}
                  </span>
                  <span className="text-default d-inline">
                    {format(
                      parseISO(data.eventStartDate),
                      'eee, dd MMM yy hh:mmbbb'
                    )}
                  </span>
                  <br></br>
                  <span className="text-dark font-weight-bold d-inline">Ends: </span>
                  <span className="text-default d-inline">
                    {format(
                      parseISO(data.eventEndDate),
                      'eee, dd MMM yy hh:mmbbb'
                    )}
                  </span>

                  <br></br>

                  <AddToCalendar event={data} />

                  <br></br>
                  <br></br>

                  <span className="text-dark font-weight-bold d-inline">Sales period: </span>
                  <span className="d-inline">
                    {`${format(
                      parseISO(data.saleStartDate),
                      'dd MMM yy hh:mmbbb'
                    )} to ${format(
                      parseISO(data.salesEndDate),
                      'dd MMM yy hh:mmbbb'
                    )}`}
                  </span>

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

            {/* <Row className="mt-3" style={{ minHeight: 150 }}>
              <Col>
                <h5>About this event</h5>
                <p>{data.descriptions}</p>
              </Col>
            </Row>

            <Row>
              <Col>
                <EventCategoryList categories={data.categories} />
              </Col>
            </Row> */}
          </Container>
        </>
      )}
    </GuestWrapper>
  );
}

PublicEventPage.propTypes = {
  id: PropTypes.string,
};
