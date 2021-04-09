import Link from 'next/link';
import { Alert, Col, Container, Row, Tab, Nav } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';
import AttendeeWrapper from '../../components/wrapper/AttendeeWrapper';

import { BreadcrumbOne } from '../../components/Breadcrumb';
import { useEffect, useState } from 'react';
import { 
  getEventsByAtnFollowers, 
  getEventsByAtnCategoryPreferences, 
  getEventsThisWeekend, 
  getEventsNextWeek,
  getTopTenEvents
} from '../../lib/query/getEvents';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';
import HeroSliderPopularEvents from '../../components/HeroSlider/HeroSliderPopularEvents';
import HomeEventTab from '../../components/events/HomeEventTab';
import CenterSpinner from 'components/custom/CenterSpinner';

export default function AttendeeHome() {
  const { data: user, status } = useUser(localStorage.getItem('userId'));
  const [eventsFollowing, setEventsFollowing] = useState([]);
  const [eventsForYou, setEventsForYou] = useState([]);
  const [eventsThisWeekend, setEventsThisWeekend] = useState([]);
  const [eventsNextWeek, setEventsNextWeek] = useState([]);
  const [mostPopularEvents, setMostPopularEvents] = useState([]);

  const [nextPageFollowing, setNextPageFollowing] = useState(1);
  const [nextPageForYou, setNextPageForYou] = useState(1);
  const [nextPageThisWeekend, setNextPageThisWeekend] = useState(1);
  const [nextPageNextWeek, setNextPageNextWeek] = useState(1);
  
  useEffect(() => {
    if (user != null) {
      loadEventsMostPopular();
      loadEventsFollowing();
      loadEventsForYou();
      loadEventsThisWeekend();
      loadEventsNextWeek();
    }
  }, [user]);

  function loadEventsMostPopular() {
    const getEvent = async () => {
      const data = await getTopTenEvents(user?.id);
      setMostPopularEvents(data.slice(0, 5));
    };
    getEvent();
  }

  function fetchNextPage(tab) {
    if (tab == "following") {
      loadEventsFollowing(true);
    }
    else if (tab == "for-you") {
      loadEventsForYou(true);
    }
    else if (tab == "this-weekend") {
      loadEventsThisWeekend(true);
    }
    else if (tab == "next-week") {
      loadEventsNextWeek(true);
    }
  }

  function loadEventsFollowing(isFetchNextPage=false) {
    const getEvents = async () => {
      const data = await getEventsByAtnFollowers(user?.id, nextPageFollowing);
      if (data.length < 10) {
        var btnSeeMore = document.getElementById("btnSeeMoreFollowing");
        btnSeeMore.innerHTML = "No more events";
        btnSeeMore.disabled = true;
      }

      if (isFetchNextPage) {
        setEventsFollowing(eventsFollowing.concat(data));
      }
      else {
        setEventsFollowing(data);
      }
    };
    getEvents();
    setNextPageFollowing(nextPageFollowing + 1);
  }

  function loadEventsForYou(isFetchNextPage=false) {
    const getEvents = async () => {
      const data = await getEventsByAtnCategoryPreferences(user?.id, nextPageForYou);
      if (data.length < 10) {
        var btnSeeMore = document.getElementById("btnSeeMoreForYou");
        btnSeeMore.innerHTML = "No more events";
        btnSeeMore.disabled = true;
      }

      if (isFetchNextPage) {
        setEventsForYou(eventsForYou.concat(data));
      }
      else {
        setEventsForYou(data);
      }
    };
    getEvents();
    setNextPageForYou(nextPageForYou + 1);
  }

  function loadEventsThisWeekend(isFetchNextPage=false) {
    const getEvents = async () => {
      const data = await getEventsThisWeekend(nextPageThisWeekend);
      if (data.length < 10) {
        var btnSeeMore = document.getElementById("btnSeeMoreThisWeekend");
        btnSeeMore.innerHTML = "No more events";
        btnSeeMore.disabled = true;
      }

      if (isFetchNextPage) {
        setEventsThisWeekend(eventsThisWeekend.concat(data));
      }
      else {
        setEventsThisWeekend(data);
      }
    };
    getEvents();
    setNextPageThisWeekend(nextPageThisWeekend + 1);
  }

  function loadEventsNextWeek(isFetchNextPage=false) {
    const getEvents = async () => {
      const data = await getEventsNextWeek(nextPageNextWeek);
      if (data.length < 10) {
        var btnSeeMore = document.getElementById("btnSeeMoreNextWeek");
        btnSeeMore.innerHTML = "No more events";
        btnSeeMore.disabled = true;
      }

      if (isFetchNextPage) {
        setEventsNextWeek(eventsNextWeek.concat(data));
      }
      else {
        setEventsNextWeek(data);
      }
    };
    getEvents();
    setNextPageNextWeek(nextPageNextWeek + 1);
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
          <CenterSpinner />
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
                      <Nav.Item>
                        <Nav.Link eventKey="following">
                          Following
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="for-you">
                          For you
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="this-weekend">
                          This weekend
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="next-week">
                          Next week
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
                        <HomeEventTab events={eventsFollowing} tab={"following"} />
                        <Row>
                          <Col className="d-flex align-items-center">
                            <ButtonWithLoading
                              className="btn btn-fill-out btn-sm"
                              id="btnSeeMoreFollowing"
                              onClick={() => fetchNextPage("following")}
                            >
                              See More
                            </ButtonWithLoading>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="for-you">
                        <div className="mt-3">
                          <h3 className="mb-4">Recommended events</h3>
                        </div>
                        <HomeEventTab events={eventsForYou} tab={"for-you"} />
                        <Row>
                          <Col className="d-flex align-items-center">
                            <ButtonWithLoading
                              className="btn btn-fill-out btn-sm"
                              id="btnSeeMoreForYou"
                              onClick={() => fetchNextPage("for-you")}
                            >
                              See More
                            </ButtonWithLoading>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="this-weekend">
                        <div className="mt-3">
                          <h3 className="mb-4">Events this weekend</h3>
                        </div>
                        <HomeEventTab events={eventsThisWeekend} tab={"this-weekend"} />
                        <Row>
                          <Col className="d-flex align-items-center">
                            <ButtonWithLoading
                              className="btn btn-fill-out btn-sm"
                              id="btnSeeMoreThisWeekend"
                              onClick={() => fetchNextPage("this-weekend")}
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
                        <HomeEventTab events={eventsNextWeek} tab={"next-week"} />
                        <Row>
                          <Col className="d-flex align-items-center">
                            <ButtonWithLoading
                              className="btn btn-fill-out btn-sm"
                              id="btnSeeMoreNextWeek"
                              onClick={() => fetchNextPage("next-week")}
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
    </AttendeeWrapper>
    
  );
}
