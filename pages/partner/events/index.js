import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Alert, Col, Container, Row, Spinner, Modal, Button } from 'react-bootstrap';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import debounce from 'lodash/debounce';

import { BreadcrumbOne } from '../../../components/Breadcrumb';
import PartnerWrapper from '../../../components/wrapper/PartnerWrapper';
import api from '../../../lib/ApiClient';
import EventCard from '../../../components/events/partner/EventCard';
import ButtonWithLoading from '../../../components/custom/ButtonWithLoading';
import Nav from 'react-bootstrap/Nav';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const getEvents = async (page = 0, sort, sortDir, searchTerm) => {
  let url = `/api/event/get-events?page=${page}`;
  if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;
  if (searchTerm) url += `&keyword=${searchTerm}`;
  const { data } = await api.get(url);
  return data;
};

function PartnerHome() {

  const [sortBy, setSortBy] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();
  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['events', sortBy?.sort, sortBy?.sortDir, searchTerm],
    ({ pageParam = 0 }) =>
      getEvents(pageParam, sortBy?.sort, sortBy?.sortDir, searchTerm),
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

  // search results automatically update, with debounced input
  const debouncedSearch = debounce((value) => setSearchTerm(value), 800);
  const handleOnSearchInput = (e) => {
    debouncedSearch(e.target.value);
  };
  // invalidate queries to refetch data
  const handleSearchButtonClicked = () =>
    queryClient.invalidateQueries([
      'events',
      sortBy?.sort,
      sortBy?.sortDir,
      searchTerm,
    ]);




  return (
    <>
    
      <PartnerWrapper title="Events">
        <BreadcrumbOne pageTitle="View All Events">
          <ol className="breadcrumb justify-content-md-end">
            <li className="breadcrumb-item">
              <Link href="/partner/home">
                <a>Home</a>
              </Link>
            </li>
            <li className="breadcrumb-item active">View All Events</li>
          </ol>
        </BreadcrumbOne>
        <ReactNotification />
        <Container className="my-4">

          <br></br>
          <Row>
            <Col md={8} lg={6}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Search events"
                  onChange={handleOnSearchInput}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-border-fill btn-sm"
                    type="button"
                    style={{ height: 38 }}
                    onClick={handleSearchButtonClicked}
                  >
                    Search
                </button>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={4} sm={3}>
              <select className="custom-select" onChange={handleChange}>
                <option value="">Sort by</option>
                <option value="name-asc">Name - A to Z</option>
                <option value="name-desc">Name - Z to A</option>
              </select>
            </Col>
          </Row>
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
                        className="mb-5 d-flex align-items-stretch"
                      >
                        {/* <Link href={`/partner/events/${event.eid}`}> */}
                        <a className="w-100">
                          <EventCard event={event} />
                        </a>
                        {/* </Link> */}
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
    </>
  );
}

export default PartnerHome;
