import Link from 'next/link';
import { Col, Container, Row, Tab, Nav } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { 
  getEventsByBpFollowers,
  getEventsByBpBusinessCategory,
  getEventsInNext30Days,
  getTopTenEvents,
  getVipEvents
} from '../../lib/query/getEvents';
import { getRsvpEvents } from 'lib/query/eventApi';

import PartnerWrapper from '../../components/wrapper/PartnerWrapper';
import Head from 'next/head';

import { useEffect, useState } from 'react';
import HeroSliderPopularEvents from '../../components/HeroSlider/HeroSliderPopularEvents';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';
import HomeEventTab from '../../components/events/HomeEventTab';

function PartnerHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  const [eventsFollowing, setEventsFollowing] = useState([]);
  const [eventsForYou, setEventsForYou] = useState([]);
  const [eventsInNext30Days, setEventsInNext30Days] = useState([]);
  const [eventsVip, setEventsVip] = useState([]);
  const [eventsRsvp, setEventsRsvp] = useState([]);
  const [mostPopularEvents, setMostPopularEvents] = useState([]);

  const [nextPageFollowing, setNextPageFollowing] = useState(1);
  const [nextPageForYou, setNextPageForYou] = useState(1);
  const [nextPageInNext30Days, setNextPageInNext30Days] = useState(1);
  const [nextPageVip, setNextPageVip] = useState(1);
  
  useEffect(() => {
    if (user != null) {
      loadEventsMostPopular();
      loadEventsFollowing();
      loadEventsForYou();
      loadEventsInNext30Days();
      loadEventsVip();
      loadEventsRsvp();
    }
  }, [user]);

  const loadEventsRsvp = async () => {
    const data = await getRsvpEvents(user?.id);
    setEventsRsvp(data);
  }

  function loadEventsMostPopular() {
    const getEvent = async () => {
      const data = await getTopTenEvents(user?.id);
      setMostPopularEvents(data.slice(0, 5));
      console.log(data);
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
    else if (tab == "next-month") {
      loadEventsInNext30Days(true);
    }
    else if (tab == "vip") {
      loadEventsVip(true);
    }
  }

  function loadEventsFollowing(isFetchNextPage=false) {
    const getEvents = async () => {
      const data = await getEventsByBpFollowers(user?.id, nextPageFollowing);
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
      const data = await getEventsByBpBusinessCategory(user?.id, nextPageForYou);
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

  function loadEventsInNext30Days(isFetchNextPage=false) {
    const getEvents = async () => {
      const data = await getEventsInNext30Days(nextPageInNext30Days);
      if (data.length < 10) {
        var btnSeeMore = document.getElementById("btnSeeMoreNextMonth");
        btnSeeMore.innerHTML = "No more events";
        btnSeeMore.disabled = true;
      }

      if (isFetchNextPage) {
        setEventsInNext30Days(eventsInNext30Days.concat(data));
      }
      else {
        setEventsInNext30Days(data);
      }
    };
    getEvents();
    setNextPageInNext30Days(nextPageInNext30Days + 1);
  }

  function loadEventsVip(isFetchNextPage=false) {
    const getEvents = async () => {
      const data = await getVipEvents(nextPageVip);
      if (data.length < 10) {
        var btnSeeMore = document.getElementById("btnSeeMoreVip");
        btnSeeMore.innerHTML = "No more events";
        btnSeeMore.disabled = true;
      }

      if (isFetchNextPage) {
        setEventsVip(eventsVip.concat(data));
      }
      else {
        setEventsVip(data);
      }
    };
    getEvents();
    setNextPageVip(nextPageVip + 1);
  }

  return (
    <>
 
    <PartnerWrapper title="Home">
      <BreadcrumbOne pageTitle="Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/partner/home">
              <a>Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>
    
      <Container className="my-4">
        {isLoading && <div className="spinner-grow" role="status" />}
        {isSuccess && (
          <>
            <HeroSliderPopularEvents
              heroSliderData={mostPopularEvents}
              userPath="partner"
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
                        <Nav.Link eventKey="next-month">
                          Upcoming events
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="vip">
                          VIP
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="rsvp">
                          RSVP
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <Col xs={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="following">
                        <div className="mt-3">
                          <h3 className="mb-4">Events by event organisers you're following</h3>
                        </div>
                        <HomeEventTab 
                          events={eventsFollowing}
                          tab="following"
                          userPath="partner"
                        />
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
                        <HomeEventTab 
                          events={eventsForYou}
                          tab="for-you"
                          userPath="partner"
                        />
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
                      <Tab.Pane eventKey="next-month">
                        <div className="mt-3">
                          <h3 className="mb-4"> Events in the upcoming month</h3>
                        </div>
                        <HomeEventTab 
                          events={eventsInNext30Days}
                          tab="next-month"
                          userPath="partner"
                        />
                        <Row>
                          <Col className="d-flex align-items-center">
                            <ButtonWithLoading
                              className="btn btn-fill-out btn-sm"
                              id="btnSeeMoreNextMonth"
                              onClick={() => fetchNextPage("next-month")}
                            >
                              See More
                            </ButtonWithLoading>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="vip">
                        <div className="mt-3">
                          <h3 className="mb-4">VIP Events</h3>
                        </div>
                        <HomeEventTab 
                          events={eventsVip}
                          tab="vip"
                          userPath="partner"
                        />
                        <Row>
                          <Col className="d-flex align-items-center">
                            <ButtonWithLoading
                              className="btn btn-fill-out btn-sm"
                              id="btnSeeMoreVip"
                              onClick={() => fetchNextPage("vip")}
                            >
                              See More
                            </ButtonWithLoading>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="rsvp">
                        <div className="mt-3">
                          <h3 className="mb-4">RSVP Events</h3>
                        </div>
                        <HomeEventTab 
                          events={eventsRsvp}
                          tab="rsvp"
                          userPath="partner"
                        />
                        <Row>
                          <Col className="d-flex align-items-center">
                            <ButtonWithLoading
                              className="btn btn-fill-out btn-sm"
                              id="btnSeeMoreVip"
                              onClick={() => fetchNextPage("rsvp")}
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
    </PartnerWrapper>
    </>
  );
}

export default PartnerHome;
