import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { BreadcrumbOne } from 'components/Breadcrumb';
import { Alert, Col, Container, Row } from 'react-bootstrap';

import useEventCategories from 'lib/query/useEventCategories';
import { getEventsWithKeywordandSort } from 'lib/query/events';

import EventCard from 'components/events/attendee/EventCard';
import ButtonWithLoading from 'components/custom/ButtonWithLoading';
import CenterSpinner from 'components/custom/CenterSpinner';
import GuestWrapper from 'components/wrapper/GuestWrapper';

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

export default function PublicEvents({ category }) {
  const [sortBy, setSortBy] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category);
  const queryClient = useQueryClient();
  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [
      'eventsPublic',
      sortBy?.sort,
      sortBy?.sortDir,
      searchTerm,
      selectedCategory,
    ],
    ({ pageParam = 0 }) =>
      getEventsWithKeywordandSort(
        pageParam,
        sortBy?.sort,
        sortBy?.sortDir,
        searchTerm,
        true,
        selectedCategory
      ),
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
      case 'date-asc':
        setSortBy({ sort: 'eventStartDate', sortDir: 'asc' });
        break;
      default:
        setSortBy();
    }
  };

  const {
    data: eventCategories,
    isSuccess: eventCategoriesSuccess,
  } = useEventCategories();

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // search results automatically update, with debounced input
  const debouncedSearch = debounce((value) => setSearchTerm(value), 800);
  const handleOnSearchInput = (e) => {
    debouncedSearch(e.target.value);
  };
  // invalidate queries to refetch data
  const handleSearchButtonClicked = () =>
    queryClient.invalidateQueries([
      'eventsPublic',
      sortBy?.sort,
      sortBy?.sortDir,
      searchTerm,
    ]);

  return (
    <GuestWrapper title="Events">
      <BreadcrumbOne pageTitle="View events">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Events</li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
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

        <Row className="mb-4">
          <Col xs={6} sm={5} md={3}>
            <select className="custom-select" onChange={handleChange}>
              <option value="">Sort by</option>
              <option value="name-asc">Name - A to Z</option>
              <option value="name-desc">Name - Z to A</option>
              <option value="date-asc">Most recent</option>
            </select>
          </Col>
          {eventCategoriesSuccess && (
            <Col xs={6} sm={5} md={3}>
              <select className="custom-select" onChange={handleCategoryChange}>
                <option value="">Categories</option>
                {eventCategories.map((category, i) => (
                  <option
                    key={i}
                    value={category}
                    selected={category == selectedCategory}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </Col>
          )}
        </Row>
        {status === 'loading' ? (
          <CenterSpinner />
        ) : status === 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <>
            <Row>
              {data.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.content.map((event) => {
                    // check if event is part of favourites list
                    event = {
                      ...event,
                    };
                    return (
                      <Col
                        key={event.eid}
                        sm={6}
                        lg={4}
                        className="mb-5 d-flex align-items-stretch"
                      >
                        <Link href={`/public/events/${event.eid}`}>
                          <a className="w-100">
                            <EventCard event={event} isPublic />
                          </a>
                        </Link>
                      </Col>
                    );
                  })}
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
    </GuestWrapper>
  );
}

PublicEvents.propTypes = {
  category: PropTypes.string,
};
