import PropTypes from 'prop-types';
import Link from 'next/link';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import { FaHeart } from 'react-icons/fa';
import { useQueryClient } from 'react-query';

import { useEventDetails } from 'lib/query/events';
import { formatter } from 'lib/util/currency';
import useAttendeeFavouriteEvents from 'lib/query/useAttendeeFavouriteEvents';
import { isFavouriteEvent } from 'lib/functions/isFavouriteEvent';
import useFavouriteEventMutation from 'lib/query/useFavouriteEventMutation';

import { BreadcrumbOne } from 'components/Breadcrumb';
import EventImageGallery from 'components/events/partner/EventImageGallery';
import AddToCalendar from 'components/custom/AddToCalendar';
import AttendeeWrapper from 'components/wrapper/AttendeeWrapper';
import ShareButton from 'components/custom/ShareButton';
import CenterSpinner from 'components/custom/CenterSpinner';
import EventCategoryList from 'components/custom/events/EventCategoryList';
import Booths from 'components/custom/events/Booths';

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

export default function AttendeeEventPage({ id }) {
  const queryClient = useQueryClient();
  const { data, status } = useEventDetails(id);
  const { data: favouriteEvents } = useAttendeeFavouriteEvents();
  const { mutate } = useFavouriteEventMutation(queryClient);

  const onFavouriteClick = () => {
    mutate(id);
  };

  return (
    <AttendeeWrapper title={data?.name || 'Event page'}>
      {status === 'loading' ? (
        <CenterSpinner />
      ) : status === 'error' ? (
        <Alert variant="danger">An error has occured</Alert>
      ) : (
        <>
          <BreadcrumbOne pageTitle="Event Details">
            <ol className="breadcrumb justify-content-md-end">
              <li className="breadcrumb-item">
                <Link href="/attendee/home">
                  <a> Home</a>
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

          <Container className="space-pt--r100 space-pb--r100">
            <Row>
              <Col lg={6}>
                <EventImageGallery images={data.images} />
              </Col>
              <Col lg={6}>
                <div className="pt-3">
                  <h3>{data.name}</h3>
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
                    <p>{data.descriptions}</p></div>
                    <br></br>
                  <span className="text-dark font-weight-bold d-inline">Location: {" "}</span>
                  <span className="d-inline"> {data.address}</span>

                 
                <br></br>

                  <span className="text-dark font-weight-bold d-inline">
                    Starts:{' '}
                  </span>
                  <span className="d-inline">
                    {format(
                      parseISO(data.eventStartDate),
                      'eee, dd MMM yy hh:mmbbb'
                    )}
                  </span>
                  <br></br>
                  <span className="text-dark font-weight-bold d-inline">Ends: </span>
                  <span className="d-inline">
                    {format(
                      parseISO(data.eventEndDate),
                      'eee, dd MMM yy hh:mmbbb'
                    )}
                  </span>

                  <br></br>

                  <AddToCalendar event={data} />

                  <br></br>
                  <br></br>

                  {/* <p className="text-dark d-inline">Sales period: </p>
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
                  <br></br> */}

                  {data.sellingTicket && (
                    <>
                      {/* <p
                        className="text-body"
                        // style={{ fontSize: 20, marginBottom: 8 }}
                      >
                        {formatter.format(data.ticketPrice)}
                      </p> */}
                       <span className="text-dark font-weight-bold d-inline">Ticket Price: {" "}</span>
                  <span className="d-inline"> {formatter.format(data.ticketPrice)}</span>
                  <br></br>
                  <br></br>
                  <Link href={`${id}/ticketing`}>
                        <button
                          className="btn btn-fill-out btn-sm mr-2"
                          disabled={
                            Date.parse(data.eventStartDate) < Date.now()
                          }
                        >
                          Get tickets
                        </button>
                      </Link>
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
                {favouriteEvents &&
                isFavouriteEvent(favouriteEvents, data.eid) ? (
                  <button
                    className="btn btn-sm btn-pink"
                    onClick={onFavouriteClick}
                  >
                    Unfavourite <FaHeart />
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-pink"
                    onClick={onFavouriteClick}
                  >
                    Favourite <FaHeart color="#e83e8c" />
                  </button>
                )}
              </Col>
            </Row>

            {/* <Row className="mt-3" style={{ minHeight: 150 }}>
              <Col>
                <h5>About this event</h5>
                <p>{data.descriptions}</p>
              </Col>
            </Row> */}
            <br></br>

            <Booths sellerProfiles={data.sellerProfiles} ></Booths>

            <br></br>
            {/* <Row>
              <Col>
                <EventCategoryList categories={data.category} />
              </Col>
            </Row> */}
          </Container>
        </>
      )}
    </AttendeeWrapper>
  );
}

AttendeeEventPage.propTypes = {
  id: PropTypes.string,
};
