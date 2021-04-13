import Link from 'next/link';
import { Alert, Col, Container, Row, Tab, Nav } from 'react-bootstrap';

import GuestWrapper from '../../components/wrapper/GuestWrapper';

import { BreadcrumbOne } from '../../components/Breadcrumb';
import { useEffect, useState } from 'react';
import {
  getEventsThisWeekend,
  getEventsNextWeek,
  getTopTenEvents,
} from '../../lib/query/getEvents';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';
import HeroSliderPopularEvents from '../../components/HeroSlider/HeroSliderPopularEvents';
import HomeEventTab from '../../components/events/HomeEventTab';
import CenterSpinner from 'components/custom/CenterSpinner';

export default function PublicHome() {
  const [eventsThisWeekend, setEventsThisWeekend] = useState([]);
  const [eventsNextWeek, setEventsNextWeek] = useState([]);
  const [mostPopularEvents, setMostPopularEvents] = useState([]);

  const [nextPageThisWeekend, setNextPageThisWeekend] = useState(1);
  const [nextPageNextWeek, setNextPageNextWeek] = useState(1);

  useEffect(() => {
    loadEventsMostPopular();
    loadEventsThisWeekend();
    loadEventsNextWeek();
  }, []);

  function loadEventsMostPopular() {
    const getEvent = async () => {
      const data = await getTopTenEvents(true);
      setMostPopularEvents(data.slice(0, 5));
    };
    getEvent();
  }

  function fetchNextPage(tab) {
    if (tab == 'this-weekend') {
      loadEventsThisWeekend(true);
    } else if (tab == 'next-week') {
      loadEventsNextWeek(true);
    }
  }

  function loadEventsThisWeekend(isFetchNextPage = false) {
    const getEvents = async () => {
      const data = await getEventsThisWeekend(nextPageThisWeekend, true);
      if (data.length < 10) {
        var btnSeeMore = document.getElementById('btnSeeMoreThisWeekend');
        btnSeeMore.innerHTML = 'No more events';
        btnSeeMore.disabled = true;
      }

      if (isFetchNextPage) {
        setEventsThisWeekend(eventsThisWeekend.concat(data));
      } else {
        setEventsThisWeekend(data);
      }
    };
    getEvents();
    setNextPageThisWeekend(nextPageThisWeekend + 1);
  }

  function loadEventsNextWeek(isFetchNextPage = false) {
    const getEvents = async () => {
      const data = await getEventsNextWeek(nextPageNextWeek, true);
      if (data.length < 10) {
        var btnSeeMore = document.getElementById('btnSeeMoreNextWeek');
        btnSeeMore.innerHTML = 'No more events';
        btnSeeMore.disabled = true;
      }

      if (isFetchNextPage) {
        setEventsNextWeek(eventsNextWeek.concat(data));
      } else {
        setEventsNextWeek(data);
      }
    };
    getEvents();
    setNextPageNextWeek(nextPageNextWeek + 1);
  }

  return (
    <GuestWrapper title="Home">
      <BreadcrumbOne pageTitle="Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/public/home">
              <a>Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        {status == 'loading' ? (
          <CenterSpinner />
        ) : status == 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <>
            <h1 className="font-weight-bold">Popular Events</h1>
            <HeroSliderPopularEvents heroSliderData={mostPopularEvents} />
            <Container>
              <Row>
                <h2 className="mt-5 mb-3 font-weight-bold">Browse Events</h2>
                <Tab.Container defaultActiveKey="this-weekend">
                  <div className="w-100">
                    <Nav variant="tabs" className="w-100">
                      <Nav.Item>
                        <Nav.Link eventKey="this-weekend">This weekend</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="next-week">Next week</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <Col xs={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="this-weekend">
                        <div className="mt-3">
                          <h3 className="mb-4">Events this weekend</h3>
                        </div>
                        <HomeEventTab
                          events={eventsThisWeekend}
                          tab="this-weekend"
                          isGuest={true}
                        />
                        <Row>
                          <Col className="d-flex align-items-center">
                            <ButtonWithLoading
                              className="btn btn-fill-out btn-sm"
                              id="btnSeeMoreThisWeekend"
                              onClick={() => fetchNextPage('this-weekend')}
                            >
                              See More
                            </ButtonWithLoading>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="next-week">
                        <div className="mt-3">
                          <h3 className="mb-4">Events next week</h3>
                        </div>
                        <HomeEventTab
                            events={eventsNextWeek}
                            tab="next-week"
                            isGuest={true}
                        />
                        <Row>
                          <Col className="d-flex align-items-center">
                            <ButtonWithLoading
                              className="btn btn-fill-out btn-sm"
                              id="btnSeeMoreNextWeek"
                              onClick={() => fetchNextPage('next-week')}
                            >
                              See More
                            </ButtonWithLoading>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Tab.Container>
              </Row>
            </Container>
          </>
        )}
      </Container>
    </GuestWrapper>
  );
}
