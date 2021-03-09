import Link from 'next/link';
import OrganiserWrapper from '../components/wrapper/OrganiserWrapper';
import EventTabOne from '../components/EventTabEoProfile';
import FollowersTabEoProfile from '../components/FollowersTabEoProfile';
import { BreadcrumbOne } from '../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductRating } from '../components/Product';
import { getUser } from '../lib/query/getUser';
import {
  getEventByOrganiserId,
  getPastEventsByOrganiserId,
  getAttendeeCurrentEventsByOrganiserId,
  getPartnerCurrentEventsByOrganiserId,
  getPartnerUpcomingEventsByOrganiserId,
  getAttendeeUpcomingEventsByOrganiserId,
  getRating,
} from '../lib/query/useEvent';
import { getOrgAttendeeFollowers } from '../lib/query/getOrgAttendeeFollowers';
import { getOrgPartnerFollowers } from '../lib/query/getOrgPartnerFollowers';

import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { BsPencilSquare } from 'react-icons/bs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { withRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { convertCompilerOptionsFromJson } from 'typescript';

const EventOrgProfile = ({ paraId_ }) => {
  const [showEoView, setShowEoView] = useState(false);
  const [showPublicView, setShowPublicView] = useState(false);
  const [userRole, setUserRole] = useState('');
  //const [eventlist, setEventlist] = useState([]);
  const [currenteventlist, setCurrenteventlist] = useState([]);
  const [upcomingeventlist, setUpcomingeventlist] = useState([]);
  const [pasteventlist, setPastEventlist] = useState([]);
  const [eventorganiser, setEventOrganiser] = useState();

  const [attendeeFollowers, setAttendeeFollowers] = useState([]);
  const [partnerFollowers, setPartnerFollowers] = useState([]);
  const [rating, setRating] = useState();

  // if there is user login credential
  //const paraId_ = JSON.parse(query.paraId);

  // ADMIN: 'admin',
  // EVNTORG: 'organiser',
  // BIZPTNR: 'partner',
  // ATND: 'attendee',

  useEffect(async () => {
    await getUser(paraId_).then((eventOrg) => {
      console.log('eo data');
      console.log(eventOrg);

      setEventOrganiser(eventOrg);
    });

    await getOrgAttendeeFollowers(paraId_).then((followers) => {
      setAttendeeFollowers(followers);
    });

    await getOrgPartnerFollowers(paraId_).then((followers) => {
      setPartnerFollowers(followers);
    });

    await getRating(paraId_).then((rate) => {
      setRating(rate);
    });
    //const { data: user } = useUser(localStorage.getItem('userId'));

    if (localStorage.getItem('userId') != null) {
      await getUser(localStorage.getItem('userId')).then(async (data) => {
        console.log(data);
        if (data.id != null) {
          if (data.roles[0].roleEnum === 'BIZPTNR') {
            setUserRole('BIZPTNR');
            await getPartnerCurrentEventsByOrganiserId(paraId_).then(
              (events) => {
                setCurrenteventlist(events);
              }
            );
            setShowPublicView(true);
            setShowEoView(false);
            //partner has no upcoming events
          } else if (
            data.roles[0].roleEnum === 'ATND' ||
            (data.roles[0].roleEnum === 'EVNTORG' && data.id != paraId_)
          ) {
            await getAttendeeCurrentEventsByOrganiserId(paraId_).then(
              (events) => {
                setCurrenteventlist(events);
              }
            );

            await getAttendeeUpcomingEventsByOrganiserId(paraId_).then(
              (events) => {
                setUpcomingeventlist(events);
              }
            );

            setShowPublicView(true);
            setShowEoView(false);
            // } else if (
            //   data.roles[0].roleEnum === 'EVNTORG' &&
            //   data.id != paraId_
            // ) {
            //   await getAttendeeCurrentEventsByOrganiserId(paraId_).then(
            //     (events) => {
            //       setCurrenteventlist(events);
            //     }
            //   );

            //   await getAttendeeUpcomingEventsByOrganiserId(paraId_).then(
            //     (events) => {
            //       setUpcomingeventlist(events);
            //     }
            //   );
            //   setShowPublicView(true);
            //   setShowEoView(false);
            // }
          } else if (
            data.roles[0].roleEnum === 'EVNTORG' &&
            data.id == paraId_
          ) {
            await getAttendeeCurrentEventsByOrganiserId(paraId_).then(
              (events) => {
                setCurrenteventlist(events);
              }
            );

            await getAttendeeUpcomingEventsByOrganiserId(paraId_).then(
              (events) => {
                setUpcomingeventlist(events);
              }
            );

            setShowPublicView(false);
            setShowEoView(true);
          }
          // past events all the same for all users.
          await getPastEventsByOrganiserId(paraId_).then((events) => {
            setPastEventlist(events);
          });
        }
      });
    } else if (localStorage.getItem('userId') == null) {
      await getAttendeeCurrentEventsByOrganiserId(paraId_).then((events) => {
        setCurrenteventlist(events);
      });

      await getAttendeeUpcomingEventsByOrganiserId(paraId_).then((events) => {
        //setUpcomingeventlist(events);
      });

      await newgetAttendeeUpcomingEventsByOrganiserId(
        roles[0].roleEnum,
        paraId_,
        'upcoming'
      ).then((events) => {
        console.log('events');
        console.log(events);
        setUpcomingeventlist(events);
      });

      await getPastEventsByOrganiserId(paraId_).then((events) => {
        setPastEventlist(events);
      });
      setShowPublicView(true);
      setShowEoView(false);
    }
  }, []);

  return (
    <div>
      <BreadcrumbOne pageTitle="Organiser Profile Details">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Profile Details</li>
        </ol>
      </BreadcrumbOne>
      <div className="my-account-content space-pt--r100 space-pb--r100">
        <Container>
          <Row md={{ span: 8 }} className="justify-content-md-center row">
            <Col xs={4} md={4}>
              <div className="profile-imgdiv">
                {eventorganiser?.profilePic == null && (
                  <Image
                    src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                    className="profile-image"
                    thumbnail
                  />
                )}
                {eventorganiser?.profilePic != null && (
                  <Image
                    className="profile-image"
                    src={eventorganiser?.profilePic}
                    thumbnail
                  />
                )}
              </div>
            </Col>

            <Col xs={4} md={4}>
              <Row>
                <h2>{eventorganiser?.name}</h2>
              </Row>
              <Row>
                <div className="product-content__rating-wrap">
                  <div className="product-content__rating">
                    {/* {rating != null && rating != undefined && ( */}
                    <ProductRating ratingValue={5} />
                    {/* )} */}
                    {/* {(rating == undefined || rating == null) && (
                      <span> (0) </span>
                    )}
                    {rating >= 0 && <span>({rating})</span>} */}
                    <span>({5})</span>
                  </div>
                </div>
              </Row>
              &nbsp;
              <div>
                <Row>
                  <Col>
                    <Row>
                      <Col md={2} className="follow-number">
                        {((attendeeFollowers == undefined ||
                          partnerFollowers == undefined) && (
                          <h4 style={{ color: '#ff324d' }}> 0 </h4>
                        )) ||
                          (attendeeFollowers.length + partnerFollowers.length >
                            0 && (
                            <h4 style={{ color: '#ff324d' }}>
                              {' '}
                              {attendeeFollowers.length +
                                partnerFollowers.length}{' '}
                            </h4>
                          ))}
                        {/* </h4> */}
                      </Col>
                    </Row>
                    <Row>
                      <h5>Followers</h5>
                    </Row>
                  </Col>
                </Row>
              </div>
              <br></br>
              <Row>
                <div style={{ display: showPublicView ? 'block' : 'none' }}>
                  {
                    <button
                      className="btn btn-fill-out btn-sm"
                      name="follow"
                      value="follow"
                    >
                      Follow
                    </button>
                  }
                </div>
              </Row>
              <Row>
                <div style={{ display: showEoView ? 'block' : 'none' }}>
                  <Link href="/organiser/profile-account">
                    <button
                      className="btn btn-fill-out btn-sm"
                      name="edit"
                      value="edit"
                    >
                      <BsPencilSquare />
                    </button>
                  </Link>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
        <br />
        <Row className="justify-content-md-center">
          <Col xs={6} md={6}>
            <Tab.Container defaultActiveKey="Events">
              <Nav
                variant="pills"
                className="product-description-tab__navigation"
              >
                <Nav.Item>
                  <Nav.Link eventKey="Events">EVENTS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Description">DESCRIPTION</Nav.Link>
                </Nav.Item>
                {/* first system release not need review */}
                {/* <Nav.Item>
                  <Nav.Link eventKey="reviews">
                    REVIEWS{' '}
                    {/*product.ratingCount ? `(${product.ratingCount})` : ""
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  {/* {/show only if the role is organiser/} */}
                  <Nav.Link
                    eventKey="followers"
                    // style={{ display: showEoView ? 'block' : 'none' }}
                  >
                    FOLLOWERS{' '}
                    {/* {/product.ratingCount ? `(${product.ratingCount})` : ""/} */}
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="Events">
                  <br></br>
                  <div className="product-description-tab__details">
                    {userRole === 'BIZPTNR' && (
                      <EventTabOne
                        current={currenteventlist}
                        past={pasteventlist}
                      />
                    )}
                    {userRole !== 'BIZPTNR' && (
                      <div className="product-description-tab__additional-info">
                        <EventTabOne
                          current={currenteventlist}
                          upcoming={upcomingeventlist}
                          past={pasteventlist}
                        />
                      </div>
                    )}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="Description">
                  {/* {eventlist.map((event) => (
                    <div key={event.eid}>{event.eid}</div>
                  ))} */}
                  <br></br>
                  <div className="product-description-tab__additional-info">
                    {((eventorganiser?.description === null ||
                      eventorganiser?.description === '') &&
                      'There is no description.') ||
                      eventorganiser?.description}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="reviews">
                  <div className="product-description-tab__review">
                    <div className="comments">
                      <br></br>
                      <h5 className="product-tab-title">
                        {/* {/the product name is the event name/} */}
                        {5} Review For <span>{'productname'}</span>
                      </h5>
                      <ul className="list-none comment-list mt-4">
                        <li>
                          <div className="comment-img">
                            <img
                              src="/assets/images/users/user1.jpg"
                              alt="user1"
                            />
                          </div>
                          <div className="comment-block">
                            <div className="rating-wrap">
                              <div className="rating">
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStarOutline />
                              </div>
                            </div>
                            <p className="customer-meta">
                              <span className="review-author">Alea Brooks</span>
                              <span className="comment-date">
                                March 5, 2020
                              </span>
                            </p>
                            <div className="description">
                              <p>
                                Lorem Ipsumin gravida nibh vel velit auctor
                                aliquet. Aenean sollicitudin, lorem quis
                                bibendum auctor, nisi elit consequat ipsum, nec
                                sagittis sem nibh id elit. Duis sed odio sit
                                amet nibh vulputate
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="comment-img">
                            <img
                              src="/assets/images/users/user2.jpg"
                              alt="user2"
                            />
                          </div>
                          <div className="comment-block">
                            <div className="rating-wrap">
                              <div className="rating">
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStarOutline />
                              </div>
                            </div>
                            <p className="customer-meta">
                              <span className="review-author">Grace Wong</span>
                              <span className="comment-date">
                                June 17, 2020
                              </span>
                            </p>
                            <div className="description">
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has a more-or-less normal
                                distribution of letters
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {/*
                    <div className="review-form field-form">
                      <h5>Add a review</h5>
                      <form className="row mt-3">
                        <div className="form-group col-12">
                          <span className="product-rating">
                            <IoIosStarOutline />
                            <IoIosStarOutline />
                            <IoIosStarOutline />
                            <IoIosStarOutline />
                            <IoIosStarOutline />
                          </span>
                        </div>
                        <div className="form-group col-12">
                          <textarea
                            required="required"
                            placeholder="Your review *"
                            className="form-control"
                            name="message"
                            rows={4}
                            defaultValue={''}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <input
                            required="required"
                            placeholder="Enter Name *"
                            className="form-control"
                            name="name"
                            type="text"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <input
                            required="required"
                            placeholder="Enter Email *"
                            className="form-control"
                            name="email"
                            type="email"
                          />
                        </div>
                        <div className="form-group col-12">
                          <button
                            type="submit"
                            className="btn btn-fill-out"
                            name="submit"
                            value="Submit"
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                    </div>
                   */}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="followers">
                  <br></br>
                  <div className="product-description-tab__additional-info">
                    <FollowersTabEoProfile
                      attendees={attendeeFollowers}
                      partners={partnerFollowers}
                    />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withRouter(EventOrgProfile);
