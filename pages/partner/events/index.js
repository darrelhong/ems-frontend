import Link from 'next/link';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useInfiniteQuery } from 'react-query';

import { BreadcrumbOne } from '../../../components/Breadcrumb';
import PartnerWrapper from '../../../components/wrapper/PartnerWrapper';
import api from '../../../lib/ApiClient';
import EventCard from '../../../components/events/partner/EventCard';
import ButtonWithLoading from '../../../components/custom/ButtonWithLoading';
import { Fragment } from 'react';

const getEvents = async (page = 0) => {
  const { data } = await api.get('/api/event/get-events?page=' + page);
  return data;
};

function PartnerHome() {
  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('events', ({ pageParam = 0 }) => getEvents(pageParam), {
    getNextPageParam: (lastPage) =>
      lastPage.last ? false : lastPage.number + 1,
  });

  return (
    <PartnerWrapper title="Events">
      <BreadcrumbOne pageTitle="View events">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/partner/home">
              <a>Partner Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a>Events</a>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        {status === 'loading' ? (
          <Spinner animation="grow" role="status" aria-hidden="true" />
        ) : status === 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <>
            <Row>
              {data.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.content.map((event) => (
                    <Col
                      key={event.eid}
                      sm={6}
                      lg={4}
                      className="mb-5 d-flex align-items-stretch3"
                      as="a"
                    >
                      <EventCard event={event} />
                    </Col>
                  ))}
                </Fragment>
              ))}
            </Row>

            <Row>
              <Col className="d-flex align-items-center">
                <ButtonWithLoading
                  className="btn btn-fill-out btn-sm"
                  disabled={!hasNextPage || isFetchingNextPage}
                  isLoading={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                >
                  {hasNextPage ? 'See more' : 'No more events'}
                </ButtonWithLoading>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </PartnerWrapper>
  );
}

export default PartnerHome;
