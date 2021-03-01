import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import OrganiserWrapper from '../../../components/wrapper/OrganiserWrapper';
import { getAllEventsByOrganiser, getAllEventsTest } from '../../../lib/query/eventApi';
import { Sidebar, ShopHeader, ShopProducts } from '../../../components/Shop';
import useUser from '../../../lib/query/useUser';
import EventView from "../../../components/Event/EventView";
import Paginator from 'react-hooks-paginator';

function myEvents() {
  const [events, setEvents] = useState([]);
  //test
  const { data: user } = useUser(localStorage.getItem('userId'));
  // console.log('user', user);
  const [sortType, setSortType] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [filterSortType, setFilterSortType] = useState('');
  const [filterSortValue, setFilterSortValue] = useState('');
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  const [layout, setLayout] = useState('list');
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  const pageLimit = 12;

  useEffect(() => {
    if (user != null) {
      const getEvents = async () => {
        const data = await getAllEventsByOrganiser(user.id);
        setEvents(data);
        // console.log(data);
      };
      getEvents();
    }
  }, [user]
  );

  useEffect(() => {
    if (events != null) {
      setCurrentData(events.slice(offset, offset + pageLimit));
    }
  }, [offset, events]);

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  return (
    <div>
      <OrganiserWrapper title="Events">
        <BreadcrumbOne pageTitle="My Events">
          <ol className="breadcrumb justify-content-md-end">
            <li className="breadcrumb-item">
              <Link href="/organiser/events">
                <a>Events</a>
              </Link>
            </li>
          </ol>
        </BreadcrumbOne>

        <div className="shop-content space-pt--r100 space-pb--r100">
          <Container>
            <Row>
              <Col lg={9}>
                <ShopHeader
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  shopTopFilterStatus={shopTopFilterStatus}
                  setShopTopFilterStatus={setShopTopFilterStatus}
                  layout={layout}
                />

                <EventView events={currentData} layout={layout} />
                <div className="pagination pagination-style pagination-style--two justify -content-center">
                  <Paginator
                    totalRecords={events.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»" />
                </div>

              </Col>
            </Row>
          </Container>
        </div>
      </OrganiserWrapper>
    </div>


  );
}

export default myEvents;
