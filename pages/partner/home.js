import Link from 'next/link';
import { Col, Container, Row, Tab, Nav } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { 
  getAllEventsByBpFollowers,
  getAllEventsByBpBusinessCategory,
  getAllEventsInNext30Days,
  getMostPopularEvents,
  getTopTenEvents
} from '../../lib/query/getEvents';

import PartnerWrapper from '../../components/wrapper/PartnerWrapper';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import HomeEventCard from '../../components/events/HomeEventCard';

function PartnerHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  const [events, setEvents] = useState([]);
  const [mostPopularEvents, setMostPopularEvents] = useState();
  
  useEffect(() => {
    if (user != null) {
      loadEventMostPopular();
      loadEventsFollowing();
    }
  }, [user]);

  function loadEventMostPopular() {
    const getEvent = async () => {
      const data = await getMostPopularEvents(user?.id);
      setMostPopularEvents(data);
    };
    getEvent();
  }

  function loadEventsFollowing() {
    const getEvents = async () => {
      const data = await getAllEventsByBpFollowers(user?.id);
      setEvents(data);
    };
    getEvents();
  }

  function loadEventsForYou() {
    const getEvents = async () => {
      const data = await getAllEventsByBpBusinessCategory(user?.id);
      setEvents(data);
    };
    getEvents();
  }

  function loadEventsInNext30Days() {
    const getEvents = async () => {
      const data = await getAllEventsInNext30Days(user?.id);
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
    <>
 
    <PartnerWrapper title="Home">
      <BreadcrumbOne pageTitle="Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/partner/home">
              <a>Partner Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>
    
      <Container className="my-4">
        {isLoading && <div className="spinner-grow" role="status" />}
        {isSuccess && (
          <>
            <Container>
              <Row style={{marginBottom: "20px", backgroundColor: "#fff5f5", borderRadius: "12px", boxShadow: "5px 4px 8px rgba(0,0,0,0.3)"}}>
                <Col className="d-flex align-items-center" style={{padding: "30px 50px"}} lg={6} xs={12}>
                  <div className="d-flex flex-column justify-content-between" style={{minHeight: "180px"}}>
                    <h3>Come join us at our most popular event!</h3>
                    <h2><strong>{mostPopularEvents?.name}</strong></h2>
                    <a href={`/partner/events/${mostPopularEvents?.eid}`}>
                      <button className="btn btn-fill-out w-100">
                        View Event Details
                      </button>
                    </a>
                  </div>
                </Col>
                <Col style={{padding: "0", borderRadius: "inherit"}} xs={12} lg={6}>
                  <img style={{borderRadius: "inherit"}} src={mostPopularEvents?.images?.[0] || '/assets/images/img-placeholder.jpg'} />
                </Col>
              </Row>
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
                      <Nav.Item onClick={() => loadEventsInNext30Days()}>
                        <Nav.Link eventKey="next-month">
                          Upcoming events
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
                          <h3 className="mb-4">Events by event organisers you're following</h3>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="for-you">
                        <div className="mt-3">
                          <h3 className="mb-4">Recommended events</h3>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="next-month">
                        <div className="mt-3">
                          <h3 className="mb-4"> Events in the upcoming month</h3>
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
            </Container>
          </>
        )}

        <Link href="/partner/events">
          <button className="btn btn-fill-out btn-sm">View events</button>
        </Link>
        &nbsp;
        <Link href="/partner/view/partners">
          <button className="btn btn-fill-out btn-sm">View Partners</button>
        </Link>
        &nbsp;
        <Link href="/partner/view/organisers">
          <button className="btn btn-fill-out btn-sm">View Organisers</button>
        </Link>
      </Container>
    </PartnerWrapper>
    </>
  );
}

export default PartnerHome;
