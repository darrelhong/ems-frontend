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


const getPartners = async (page = 0, sort, sortDir, searchTerm, category) => {
    console.log("category " + category);
    let url = `/api/partner/get-partners-cat?page=${page}`;
    if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;
    if (searchTerm) url += `&keyword=${searchTerm}`;
    if (category) url += `&businessCategory=${category}`;
    const { data } = await api.get(url);
   
    return data;
};



function PartnerViewUsers() {
    const [sortBy, setSortBy] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const queryClient = useQueryClient();


    const {
        status,
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ['partners', sortBy?.sort, sortBy?.sortDir, searchTerm, category],
        ({ pageParam = 0 }) =>
            getPartners(pageParam, sortBy?.sort, sortBy?.sortDir, searchTerm, category),
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

    const handleChangeCategory = (e) => {
        console.log(e.target.value);
        setCategory (e.target.value);
        console.log("cat" + category);

        if(e.target.value == ""){
            setCategory();
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
            'partners',
            sortBy?.sort,
            sortBy?.sortDir,
            searchTerm,
            category
        ]);


    return (
        <PartnerWrapper title="Business Partner">
            <BreadcrumbOne pageTitle="View All Business Partners">
                <ol className="breadcrumb justify-content-md-end">
                    <li className="breadcrumb-item">
                        <Link href="/partner/home">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">View All Business Partners</li>
                </ol>
            </BreadcrumbOne>

            <Container className="my-4" style={{ zIndex: -1,
    position:"relative" }}>

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
                                <select className="custom-select" onChange={handleChange}>
                                    <option value="">Sort by</option>
                                    <option value="name-asc">Name - A to Z</option>
                                    <option value="name-desc">Name - Z to A</option>
                                </select>
                            </Col>
                            <Col xs={4} sm={3}>
                                <select className="custom-select" onChange={handleChangeCategory}>
                                    <option value="">Filter by Category</option>
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
                                                query: { paraId: JSON.stringify(partner.id) },
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
