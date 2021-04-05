import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import debounce from 'lodash/debounce';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import OrganiserWrapper from '../../../components/wrapper/OrganiserWrapper';
import api from '../../../lib/ApiClient';
import UserCard from '../../../components/UserCard';
import OrganiserCard from '../../../components/OrganiserCard';
import ButtonWithLoading from '../../../components/custom/ButtonWithLoading';

const getOrganisers = async (page = 0, sort, sortDir, searchTerm) => {
  let url = `/api/organiser/get-organisers?page=${page}`;
  if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;
  if (searchTerm) url += `&keyword=${searchTerm}`;
  const { data } = await api.get(url);

  return data;
};

function OrganiserViewUsers() {
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
    ['organisers', sortBy?.sort, sortBy?.sortDir, searchTerm],
    ({ pageParam = 0 }) =>
      getOrganisers(pageParam, sortBy?.sort, sortBy?.sortDir, searchTerm),
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
      'organisers',
      sortBy?.sort,
      sortBy?.sortDir,
      searchTerm,
    ]);

  return (
    <OrganiserWrapper title="Event Organisers">
      <BreadcrumbOne pageTitle="View All Event Organisers">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/home">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">View All Event Organisers</li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        {status === 'loading' ? (
          <Spinner animation="grow" role="status" aria-hidden="true" />
        ) : status === 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <>
            <br></br>
            <Row>
              <Col md={8} lg={6}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Search User"
                    onChange={handleOnSearchInput}
                    defaultValue={searchTerm}
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
            <Row>
              {data.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.content.map((organiser) => (
                    <Col
                      key={organiser.id}
                      sm={6}
                      lg={4}
                      className="mb-5 d-flex align-items-stretch"
                    >
                      <Link
                        href={{
                          pathname: '/organiser/organiser-profile',
                          query: { paraId: JSON.stringify(organiser.id) },
                        }}
                      >
                        <a style={{ color: '#292b2c' }} className="w-100">
                          <OrganiserCard organiser={organiser} />
                        </a>
                      </Link>
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
                  {hasNextPage ? 'See more' : 'No more users'}
                </ButtonWithLoading>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </OrganiserWrapper>
  );
}

export default OrganiserViewUsers;
