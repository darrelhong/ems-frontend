import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useInfiniteQuery } from 'react-query';

import { BreadcrumbOne } from '../../../components/Breadcrumb';
import PartnerWrapper from '../../../components/wrapper/PartnerWrapper';
import api from '../../../lib/ApiClient';
import EventCard from '../../../components/events/partner/EventCard';
import ButtonWithLoading from '../../../components/custom/ButtonWithLoading';

const getEvents = async (page = 0, sort, sortDir) => {
  let url = `/api/event/get-events?page=${page}`;
  if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;
  const { data } = await api.get(url);
  return data;
};

function PartnerHome() {
  const [sortBy, setSortBy] = useState();
  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['events', sortBy?.sort, sortBy?.sortDir],
    ({ pageParam = 0 }) => getEvents(pageParam, sortBy?.sort, sortBy?.sortDir),
    {
      getNextPageParam: (lastPage) =>
        lastPage.last ? false : lastPage.number + 1,
    }
  );

  const handleChange = (e) => {
    switch (e.target.value) {
      case 'name-asc':
        setSortBy({ sort: 'name', sortDir: 'asc' });
        break;
      case 'name-desc':
        setSortBy({ sort: 'name', sortDir: 'desc' });
        break;
      default:
        setSortBy();
    }
  };

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
            <Row className="mb-4">
              <Col xs={4} sm={3}>
                <select className="custom-select" onChange={handleChange}>
                  <option value="">Sort by</option>
                  <option value="name-asc">Name - A to Z</option>
                  <option value="name-desc">Name - Z to A</option>
                </select>
              </Col>
            </Row>
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
