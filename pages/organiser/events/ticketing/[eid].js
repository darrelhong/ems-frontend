import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useInfiniteQuery } from 'react-query';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';

import api from 'lib/ApiClient';

import { BreadcrumbOne } from 'components/Breadcrumb';
import OrganiserWrapper from 'components/wrapper/OrganiserWrapper';
import CenterSpinner from 'components/custom/CenterSpinner';
import ButtonWithLoading from 'components/custom/ButtonWithLoading';

const getTicketsByEvent = async (eventId, page, sort, sortDir) => {
  let url = `/api/ticketing/event/${eventId}?page=${page}`;
  if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;

  const { data } = await api.get(url);
  return data;
};

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

export default function OrganiserEventTicketTransactions({ eid }) {
  const [sortBy, setSortBy] = useState();
  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['organiserTickets', eid, sortBy?.sort, sortBy?.sortDir],
    ({ pageParam = 0 }) =>
      getTicketsByEvent(eid, pageParam, sortBy?.sort, sortBy?.sortDir),
    {
      getNextPageParam: (lastPage) =>
        lastPage.last ? false : lastPage.number + 1,
    }
  );

  const handleChange = (e) => {
    switch (e.target.value) {
      case 'date-asc':
        setSortBy({ sort: 'dateTimeOrdered', sortDir: 'asc' });
        break;
      case 'date-desc':
        setSortBy({ sort: 'dateTimeOrdered', sortDir: 'desc' });
        break;
      default:
        setSortBy();
    }
  };

  return (
    <OrganiserWrapper>
      <BreadcrumbOne pageTitle="Event ticket transactions">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/home">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/organiser/events">
              <a>Events</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Ticketing</li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        <Row className="mb-4">
          <Col lg={6}>
            <select className="custom-select" onChange={handleChange}>
              <option value="">Sort by</option>
              <option value="date-asc">Latest first</option>
              <option value="date-desc">Oldest first</option>
            </select>
          </Col>
        </Row>

        {status === 'loading' ? (
          <CenterSpinner />
        ) : status === 'error' ? (
          <Alert variant="danger">An error has occurred</Alert>
        ) : (
          <>
            <Row>
              {data.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.content.map((tt) => (
                    <Col lg={6} key={tt.id} className="mb-3">
                      <Card key={tt.id}>
                        <Card.Body>
                          <h5 className="card-title">{tt.eventName}</h5>
                          <p className="mb-0">ID: {tt.id}</p>
                          <p className="mb-0">
                            Payment status: {tt.paymentStatus}
                          </p>
                          <p className="mb-0">
                            Ordered:{' '}
                            {format(
                              parseISO(tt.dateTimeOrdered),
                              'dd MMM yyyy HH:mm:ss'
                            )}
                          </p>
                          <p className="mb-0">
                            Attendee name: {tt.attendeeName}
                          </p>
                        </Card.Body>
                      </Card>
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
                  {hasNextPage ? 'See more' : 'No more transactions'}
                </ButtonWithLoading>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </OrganiserWrapper>
  );
}

OrganiserEventTicketTransactions.propTypes = {
  eid: PropTypes.string,
};
