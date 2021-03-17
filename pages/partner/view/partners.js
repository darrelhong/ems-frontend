import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import debounce from 'lodash/debounce';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import PartnerWrapper from '../../../components/wrapper/PartnerWrapper';
import api from '../../../lib/ApiClient';
import UserCard from '../../../components/UserCard';
import OrganiserCard from '../../../components/OrganiserCard';
import ButtonWithLoading from '../../../components/custom/ButtonWithLoading';


const getPartners = async (page = 0, sort, sortDir, searchTerm, category, clear) => {
    console.log("category " + category);
    console.log("sort " + sortDir);
    console.log("searchTerm " + searchTerm);
    console.log("clear " + clear);


    let url = `/api/partner/get-partners-cat?page=${page}`;
    if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;
    if (searchTerm) url += `&keyword=${searchTerm}`;
    if (category) url += `&businessCategory=${category}`;
    if (clear) url += `&clear=${clear}`;

    const { data } = await api.get(url);

    return data;
};



function PartnerViewUsers() {
    const [sortBy, setSortBy] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [clear, setClear] = useState('');
    const [sortByName, setSortByName] = useState('Sort by');
    const queryClient = useQueryClient();


    const {
        status,
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ['partners', sortBy?.sort, sortBy?.sortDir, searchTerm, category, clear],
        ({ pageParam = 0 }) =>
            getPartners(pageParam, sortBy?.sort, sortBy?.sortDir, searchTerm, category, clear),
        {
            getNextPageParam: (lastPage) =>
                lastPage.last ? false : lastPage.number + 1,
        }
    );





    const handleChange = (e) => {
        switch (e.target.value) {
            case 'name-asc':
                setSortBy({ sort: 'name', sortDir: 'asc' });
                setClear("false");
                setSortByName("Name - A to Z");
                break;
            case 'name-desc':
                setSortBy({ sort: 'name', sortDir: 'desc' });
                setClear("false");
                setSortByName("Name - Z to A");
                break;
            case 'all':
                setSortBy({ sort: 'name', sortDir: 'all' });
                setSortByName("Sort by");
                setClear("true");
                break;
           
        }
    };

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
        setClear("false");
        if (e.target.value == "all") {
            setCategory();
            setClear("true");
            console.log("passed" + clear);
        }

    };



    // search results automatically update, with debounced input
    const debouncedSearch = debounce((value) => setSearchTerm(value), 1600);

    const handleOnSearchInput = (e) => {
        debouncedSearch(e.target.value);
        setClear("false");
    };

    // invalidate queries to refetch data
    const handleSearchButtonClicked = () =>
        queryClient.invalidateQueries([
            'partners',
            sortBy?.sort,
            sortBy?.sortDir,
            searchTerm,
            category,
            clear
        ]);


    return (
        <PartnerWrapper title="Business Partner">
            <BreadcrumbOne pageTitle="View All Business Partners">
                <ol className="breadcrumb justify-content-md-end">
                    <li className="breadcrumb-item">
                        <Link href="/attendee/home">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">View All Business Partners</li>
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
                                        defaultValue = {searchTerm}
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
                            <Col xs={4} sm={3}>
                                <select className="custom-select" value={sortByName} onChange={handleChange}>
                                    <option value="all">Sort by</option>
                                    <option value="name-asc">Name - A to Z</option>
                                    <option value="name-desc">Name - Z to A</option>
                                </select>
                            </Col>
                            <Col xs={4} sm={3}>
                                <select className="custom-select" defaultValue={category} onChange={handleChangeCategory}>
                                    <option value="all">Filter by Category</option>
                                    <option value="Automotive">
                                        Automotive
                                    </option>
                                    <option value="Business Support & Supplies">
                                        Business Support & Supplies
                                    </option>
                                    <option value="Computers & Electronics">
                                        Computers & Electronics
                                    </option>
                                    <option value="Construction & Contractor">
                                        Construction & Contractor
                                    </option>
                                    <option value="Education">Education</option>
                                    <option value="Entertainment">
                                        Entertainment
                                    </option>
                                    <option value="Food & Dining">
                                        Food & Dining
                                    </option>
                                    <option value="Health & Medicine">
                                        Health & Medicine
                                    </option>
                                    <option value="Home & Garden">
                                        Home & Garden
                                    </option>
                                    <option value="Legal & Financial">
                                        Legal & Financial{' '}
                                    </option>
                                    <option value="Manufacturing, Wholesale, Distribution">
                                        Manufacturing, Wholesale, Distribution
                                    </option>
                                    <option value="Merchants (Retail)">
                                        Merchants (Retail)
                                    </option>
                                    <option value="Personal Care & Services">
                                        Personal Care & Services
                                    </option>
                                    <option value="Real Estate">
                                        Real Estate
                                    </option>
                                    <option value="Travel & Transportation">
                                        Travel & Transportation
                                    </option>
                                </select>
                            </Col>
                            <Col xs={4} sm={3}>

                            </Col>
                        </Row>
                        <Row>
                            {data.pages.map((page, i) => (
                                <Fragment key={i}>
                                    {page.content.map((partner) => (
                                        <Col
                                            key={partner.id}
                                            sm={6}
                                            lg={4}
                                            className="mb-5 d-flex align-items-stretch"
                                        >
                                            <Link href={{
                                                pathname: '/partner/partner-profile',
                                                query: { localuser: JSON.stringify(partner.id) },
                                            }}>
                                                <a className="w-100">
                                                    <UserCard partner={partner} />
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
        </PartnerWrapper>
    );
}

export default PartnerViewUsers;
