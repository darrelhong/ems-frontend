import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Alert,
  Col,
  Container,
  Row,
  Spinner,
  Modal,
  Button,
} from 'react-bootstrap';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import debounce from 'lodash/debounce';
import { getEventsWithKeywordandSortFilter } from 'lib/query/events';
import { BreadcrumbOne } from 'components/Breadcrumb';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import EventCard from 'components/events/partner/EventCard';
import ButtonWithLoading from 'components/custom/ButtonWithLoading';
import useUser from '../../../lib/query/useUser';

import CenterSpinner from 'components/custom/CenterSpinner';
import EventSideBar from '../../../components/Event/partner/EventSideBar';
import api from '../../../lib/ApiClient';
import Nav from 'react-bootstrap/Nav';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const getEvents = async (page = 0, sort, sortDir, searchTerm) => {
  let url = `/api/event/get-events?page=${page}`;
  if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;
  if (searchTerm) url += `&keyword=${searchTerm}`;
  const { data } = await api.get(url);
  return data;
};

export default function PartnerEvents() {
  const [sortType, setSortType] = useState('');
  const [filterValue, setFilterValue] = useState('all');

  const [sortBy, setSortBy] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: user } = useUser(localStorage.getItem('userId'));
  const queryClient = useQueryClient();
  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [
      'events',
      sortBy?.sort,
      sortBy?.sortDir,
      searchTerm,
      filterValue,
      user?.id,
    ],
    ({ pageParam = 0 }) =>
      getEventsWithKeywordandSortFilter(
        pageParam,
        filterValue,
        sortBy?.sort,
        sortBy?.sortDir,
        searchTerm,
        user.id
      ),
    {
      getNextPageParam: (lastPage) =>
        lastPage.last ? false : lastPage.number + 1,
    }
  );
  // if (!user) {
  //   queryClient.invalidateQueries("events");
  // }

  // console.log("data: ", data)
  // console.log("user: ", user)
  // console.log(filterValue)
  // console.log("test", queryClient.getQueryData('events'))

  // front end filtering of event
  const getSortParams = (sortType, filterValue) => {
    setSortType(sortType);
    setFilterValue(filterValue);
  };

  const handleChange = (e) => {
    switch (e.target.value) {
      case 'name-asc':
        setSortBy({ sort: 'name', sortDir: 'asc' });
        break;
      case 'name-desc':
        setSortBy({ sort: 'name', sortDir: 'desc' });
        break;
      case 'date-asc':
        setSortBy({ sort: 'eventStartDate', sortDir: 'asc' });
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
  const handleSearchButtonClicked = () => {
    queryClient.invalidateQueries([
      'events',
      sortBy?.sort,
      sortBy?.sortDir,
      searchTerm,
    ]);
  };

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

        <div className="shop-content space-pt--r100 space-pb--r100">
          <Container className="my-4">
            <Row className="mb-4">
              <Col xs={4} sm={3}>
                <select className="custom-select" onChange={handleChange}>
                  <option value="">Sort by</option>
                  <option value="name-asc">Name - A to Z</option>
                  <option value="name-desc">Name - Z to A</option>
                </select>
              </Col>

              <Col md={6} lg={9}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Search events"
                    onChange={handleOnSearchInput}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-primary btn-sm"
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
            <Row>
              <Col lg={2} className="order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
                <EventSideBar
                  getSortParams={getSortParams}
                  filterValue={filterValue}
                />
              </Col>
              <Col>
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
                                <EventCard event={event} user={user} />
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
              </Col>
            </Row>
          </Container>
        </div>
      </PartnerWrapper>
    </>
  );
}
