import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import OrganiserWrapper from '../../../components/wrapper/OrganiserWrapper';
import {
  getAllEventsByOrganiser,
  getAllEventsTest,
} from '../../../lib/query/eventApi';
import { Sidebar, ShopHeader, ShopProducts } from '../../../components/Shop';
import useUser from '../../../lib/query/useUser';
import EventView from '../../../components/Event/EventView';
import Paginator from 'react-hooks-paginator';
import EventSideBar from '../../../components/Event/EventSideBar';
import { parseISO } from 'date-fns';

function myEvents() {
  const [events, setEvents] = useState([]);
  //test
  const { data: user } = useUser(localStorage.getItem('userId'));
  // console.log('user', user);
  const [sortType, setSortType] = useState('');
  const [sortValue, setSortValue] = useState('CREATED');
  const [filterSortType, setFilterSortType] = useState('');
  const [filterSortValue, setFilterSortValue] = useState('');
  const [sortedEvents, setSortedEvents] = useState('');
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  const [layout, setLayout] = useState('list');
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const pageLimit = 12;
  // console.log("Sort value index:", sortValue);
  // console.log("DAta: ", events);
  // console.log("sortedEvents: ", sortedEvents);
  // console.log("current Data: ", currentData);

  useEffect(() => {
    if (user != null) {
      const getEvents = async () => {
        const data = await getAllEventsByOrganiser(user.id);
        setEvents(data);
      };
      getEvents();
    }
  }, [user]);

  // console.log(user)

  useEffect(() => {
    if (events != null) {
      let tempSortedEvents = filterEvents(events, sortValue);
      if (searchTerm.length >= 3) {
        tempSortedEvents = applySearch(tempSortedEvents, searchTerm);
        // console.log("events: ", tempSortedEvents);
      }
      const tempCurrentData = tempSortedEvents.slice(
        offset,
        offset + pageLimit
      );
      setSortedEvents(tempSortedEvents);
      setCurrentData(tempCurrentData);
    }
  }, [offset, events, sortValue, searchTerm]);

  const applySearch = (listEvents, searchTerm) => {
    return listEvents.filter(
      (e) =>
        e.name.toLowerCase().includes(searchTerm) ||
        e.descriptions.toLowerCase().includes(searchTerm)
    );
  };

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

  const filterEvents = (listEvents, sortValue) => {
    if (['DRAFT', 'CREATED', 'CANCELLED'].includes(sortValue)) {
      return listEvents.filter((e) => e.eventStatus == sortValue);
    } else {
      if (sortValue == 'past') {
        return listEvents.filter((e) => parseISO(e.eventEndDate) < new Date());
      } else {
        return listEvents.filter((e) => parseISO(e.eventEndDate) > new Date());
      }
    }
  };

  return (
    <div>
      <OrganiserWrapper title="Events">
        <BreadcrumbOne pageTitle="My Events">
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
          </ol>
        </BreadcrumbOne>

        <div className="shop-content space-pt--r100 space-pb--r100">
          <Container>
            <Row>
              <Col lg={10}>
                <ShopHeader
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  shopTopFilterStatus={shopTopFilterStatus}
                  setShopTopFilterStatus={setShopTopFilterStatus}
                  layout={layout}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />

                <EventView events={currentData} layout={layout} />
                <div className="pagination pagination-style pagination-style--two justify -content-center">
                  <Paginator
                    totalRecords={sortedEvents.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </Col>

              <Col lg={2} className="order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
                <EventSideBar
                  getSortParams={getSortParams}
                  sortValue={sortValue}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </OrganiserWrapper>
    </div>
  );
}

export default myEvents;
