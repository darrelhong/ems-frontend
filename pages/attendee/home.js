import Link from 'next/link';
import { Alert, Col, Container, Row, Tab, Nav } from 'react-bootstrap';
import { useInfiniteQuery, useQueryClient } from 'react-query';

import useUser from '../../lib/query/useUser';
import AttendeeWrapper from '../../components/wrapper/AttendeeWrapper';

import { BreadcrumbOne } from '../../components/Breadcrumb';
import { getAllEvents } from '../../lib/query/eventApi';
import HomeEventCard from '../../components/events/HomeEventCard';
import { useEffect, useState } from 'react';
import { 
  getEventsByAtnFollowers, 
  getAllEventsByAtnCategoryPreferences, 
  getAllEventsThisWeekend, 
  getAllEventsNextWeek,
  getTopTenEvents
} from '../../lib/query/getEvents';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';
import HeroSliderPopularEvents from '../../components/HeroSlider/HeroSliderPopularEvents';

export default function AttendeeHome() {
  const { data: user, status } = useUser(localStorage.getItem('userId'));
  const [events, setEvents] = useState([]);
  const [mostPopularEvents, setMostPopularEvents] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [currentTab, setCurrentTab] = useState("following");
  
  useEffect(() => {
    if (user != null) {
      loadEventsMostPopular();
      loadEventsFollowing();
    }
  }, [user]);

  function loadEventsMostPopular() {
    const getEvent = async () => {
      const data = await getTopTenEvents(user?.id);
      setMostPopularEvents(data.slice(0, 5));
    };
    getEvent();
  }

  function fetchNextPage() {
    if (currentTab == "following") {
      fetchNextPageFollowing();
    }
  }

  function loadEventsFollowing() {
    const getEvents = async () => {
      const data = await getEventsByAtnFollowers(user?.id, nextPage);
      setEvents(data);
    };
    getEvents();
    setNextPage(nextPage + 1);
  }

  function fetchNextPageFollowing() {
    const getEvents = async () => {
      const data = await getEventsByAtnFollowers(user?.id, nextPage);
      if (data.length < 10) {
        var btnSeeMore = document.getElementById("btnSeeMore");
        btnSeeMore.innerHTML = "No more events";
        btnSeeMore.disabled = true;
      }
      setEvents(events.concat(data));
    };
    getEvents();
    setNextPage(nextPage + 1);
  }

  function loadEventsForYou() {
    const getEvents = async () => {
      const data = await getAllEventsByAtnCategoryPreferences(user?.id);
      setEvents(data);
    };
    getEvents();
  }

  function loadEventsThisWeekend() {
    const getEvents = async () => {
      const data = await getAllEventsThisWeekend(user?.id);
      setEvents(data);
    };
    getEvents();
  }

  function loadEventsNextWeek() {
    const getEvents = async () => {
      const data = await getAllEventsNextWeek(user?.id);
      setEvents(data);
    };
    getEvents();
  }

  function loadEventsTopTen() {
    const getEvents = async () => {
      const data = await getTopTenEvents(user?.id);
      setEvents(data);
    };
    getEvents();
  }
  
  return (
    

    <AttendeeWrapper title="Home">
      
      <BreadcrumbOne pageTitle='Home'>
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/attendee/home">
              <a>Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        {status == 'loading' ? (
          <div className="spinner-grow" role="status" />
        ) : status == 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <>
            <h1 className="font-weight-bold">Popular Events</h1>
            <HeroSliderPopularEvents
              heroSliderData={mostPopularEvents}
            />
            <Container>
              <Row>
                <h2 className="mt-5 mb-3 font-weight-bold">Browse Events</h2>
                <Tab.Container defaultActiveKey="following">
                  <div className="w-100">
                    <Nav
                      variant="tabs"
                      className="w-100"
                    >
                      <Nav.Item onClick={() => loadEventsFollowing()}>
                        <Nav.Link eventKey="following">
                          Following
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item onClick={() => loadEventsForYou()}>
                        <Nav.Link eventKey="for-you">
                          For you
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item onClick={() => loadEventsThisWeekend()}>
                        <Nav.Link eventKey="this-weekend">
                          This weekend
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item onClick={() => loadEventsNextWeek()}>
                        <Nav.Link eventKey="next-week">
                          Next week
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item onClick={() => loadEventsTopTen()}>
                        <Nav.Link eventKey="top-ten">
                          Popular Events
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <Col xs={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="following">
                        <div className="mt-3">
                          <h3 className="mb-4">Events by event organisers and business partners you're following</h3>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="for-you">
                        <div className="mt-3">
                          <h3 className="mb-4">Recommended events</h3>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="this-weekend">
                        <div className="mt-3">
                          <h3 className="mb-4">Events this weekend</h3>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="next-week">
                        <div className="mt-3">
                          <h3 className="mb-4">Events next week</h3>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="top-ten">
                        <div className="mt-3">
                          <h3 className="mb-4">Top 10 events by ticket sales</h3>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Tab.Container>
              </Row>
              <Row>
                {events.map((event) => (
                  <Col
                    key={event.eid}
                    sm={6}
                    lg={4}
                    className="mb-5 d-flex align-items-stretch"
                  >
                    {/* <Link href={`/partner/events/${event.eid}`}> */}
                    <a className="w-100">
                      <HomeEventCard event={event} />
                    </a>
                    {/* </Link> */}
                  </Col>
                ))}
              </Row>
              <Row>
                <Col className="d-flex align-items-center">
                  <ButtonWithLoading
                    className="btn btn-fill-out btn-sm"
                    id="btnSeeMore"
                    onClick={() => fetchNextPage()}
                  >
                    See More
                  </ButtonWithLoading>
                </Col>
              </Row>
            </Container>
          </>
        )}

      </Container>
    </AttendeeWrapper>
    
  );
}
