import React from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
import { Alert } from 'react-bootstrap';
import ButtonWithLoading from './custom/ButtonWithLoading';

import axios from 'axios';
import EventTabOne from '../components/EventTabEoProfile';
import FollowersTabEoProfile from '../components/FollowersTabEoProfile';
import { ProductRating } from '../components/Product';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUser } from '../lib/query/getUser';
import { getReviews, getReviewsByEvent } from '../lib/query/getReviews';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { BsPencilSquare } from 'react-icons/bs';
import api from '../lib/ApiClient';
import { getRating, getEoEventsByIdRoleStatus } from '../lib/query/useEvent';
import { getOrgAttendeeFollowers } from '../lib/query/getOrgAttendeeFollowers';
import { getOrgPartnerFollowers } from '../lib/query/getOrgPartnerFollowers';
import { useMutation } from 'react-query';
import { BreadcrumbOne } from './Breadcrumb';
import { AiOutlineNotification } from 'react-icons/ai';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
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
  const [unfollowBtn, setUnfollowBtn] = useState();
  const [followBtn, setFollowBtn] = useState();
  const [reviews, setReviews] = useState();
  const [user, setUser] = useState();
  const [enquiryEventList, setEnquiryEventList] = useState([]);
  const [showEnquiryError, setEnquiryError] = useState(false);
  const [showEnquirySuccess, setEnquirySuccess] = useState(false);
  const [sendEnquiryLoading, setSendEnquiryLoading] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  // if there is user login credential
  //const paraId_ = JSON.parse(query.paraId);

  // ADMIN: 'admin',
  // EVNTORG: 'organiser',
  // BIZPTNR: 'partner',
  // ATND: 'attendee',
  var type;
  var followId;
  const loadOrgPartnerFollowerData = async () => {
    await getOrgPartnerFollowers(paraId_).then((followers) => {
      setPartnerFollowers(followers);
      if (followId >= 0 && type === 'partner') {
        var found = false;
        for (var i = 0; i < followers.length; i++) {
          console.log('followers id' + followers[i].id);
          if (followers[i].id === followId) {
            found = true;
            break;
          }
        }
        if (found) {
          setUnfollowBtn(true);
          setFollowBtn(false);
        } else {
          setFollowBtn(true);
          setUnfollowBtn(false);
        }
      }
    });
  };
  //const { data: user } = useUser(localStorage.getItem('userId'));
  const loadOrgAttFollowerData = async () => {
    await getOrgAttendeeFollowers(paraId_).then((followers) => {
      setAttendeeFollowers(followers);
      console.log('type' + type + 'followId' + followId);

      if (followId >= 0 && type === 'atn') {
        var found = false;
        for (var i = 0; i < followers.length; i++) {
          console.log('followers' + followers[i].id);
          if (followers[i].id === followId) {
            found = true;
            break;
          }
        }
        if (found) {
          setUnfollowBtn(true);
          setFollowBtn(false);
        } else {
          setFollowBtn(true);
          setUnfollowBtn(false);
        }
      }
    });
  };

  const getReviewsEvent = async (id) => {
    await getReviewsByEvent(id).then((data) => {
      setReviews(data);
    });
  };

  const getReviewsEventFilter = async (id) => {
    var check;
    await getReviewsByEvent(id).then((data) => {
      if (data != undefined && data.length > 0) {
        console.log(data.length + 'length');
        check = true;
      } else {
        check = false;
      }
    });
    return check;
  };
  const getRefreshReviewsEO = async () => {
    await getReviews(paraId_).then((data) => {
      console.log('reviews' + reviews);
      setReviews(data);
    });
  };

  useEffect(() => {
    const getUserData = async () => {
      await getUser(paraId_).then((eventOrg) => {
        console.log('eo data');
        console.log(eventOrg);

        setEventOrganiser(eventOrg);
      });
    };
    getUserData();

    const getReviewsEO = async () => {
      await getReviews(paraId_).then((data) => {
        console.log('reviews' + reviews);
        setReviews(data);
      });
    };
    getReviewsEO();
    const getRatingData = async () => {
      await getRating(paraId_).then((rate) => {
        setRating(rate);
        console.log('rating' + rating);
      });
    };
    getRatingData();

    if (localStorage.getItem('userId') != null) {
      const loadUserData = async () => {
        await getUser(localStorage.getItem('userId')).then(async (data) => {
          console.log(data);
          setUser(data.name);
          if (data.id != null) {
            if (data.roles[0].roleEnum === 'BIZPTNR') {
              setUserRole('BIZPTNR');

              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'current'
              ).then((events) => {
                setCurrenteventlist(events);
                setEnquiryEventList(events);
              });

              setShowPublicView(true);
              setShowEoView(false);
              followId = data.id;
              type = 'partner';
              loadOrgAttFollowerData();
              setShowEnquiry(true);
              loadOrgPartnerFollowerData();
              //partner has no upcoming events

              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'past'
              ).then((events) => {
                setPastEventlist(events);
              });
            } else if (data.roles[0].roleEnum === 'ATND') {
              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'current'
              ).then((events) => {
                setCurrenteventlist(events);
              });

              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'upcoming'
              ).then((events) => {
                setUpcomingeventlist(events);
              });

              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'past'
              ).then((events) => {
                setPastEventlist(events);
              });

              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'current'
              ).then(async (currentEvents) => {
                await getEoEventsByIdRoleStatus(
                  paraId_,
                  data.roles[0].roleEnum,
                  'upcoming'
                ).then((upcomingEvents) => {
                  setEnquiryEventList(currentEvents.concat(upcomingEvents));
                });
              });
              followId = data.id;
              type = 'atn';
              console.log(followId + 'followId');
              console.log(type + 'type');
              setShowPublicView(true);
              setShowEoView(false);
              setUserRole('ATND');
              loadOrgAttFollowerData();
              setShowEnquiry(true);
              loadOrgPartnerFollowerData();
            } else if (
              data.roles[0].roleEnum === 'EVNTORG' &&
              data.id != paraId_
            ) {
              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'current'
              ).then((events) => {
                setCurrenteventlist(events);
              });

              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'upcoming'
              ).then((events) => {
                setUpcomingeventlist(events);
              });

              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'current'
              ).then(async (currentEvents) => {
                await getEoEventsByIdRoleStatus(
                  paraId_,
                  data.roles[0].roleEnum,
                  'upcoming'
                ).then((upcomingEvents) => {
                  setEnquiryEventList(currentEvents.concat(upcomingEvents));
                });
              });
              followId = data.id;
              setShowPublicView(true);
              setShowEoView(false);
              setFollowBtn(false);
              setUnfollowBtn(false);
              loadOrgAttFollowerData();
              setShowEnquiry(true);
              loadOrgPartnerFollowerData();
            } else if (
              data.roles[0].roleEnum === 'EVNTORG' &&
              data.id == paraId_
            ) {
              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'current'
              ).then((events) => {
                setCurrenteventlist(events);
              });

              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'upcoming'
              ).then((events) => {
                setUpcomingeventlist(events);
              });

              await getEoEventsByIdRoleStatus(
                paraId_,
                data.roles[0].roleEnum,
                'past'
              ).then((events) => {
                setPastEventlist(events);
              });

              setShowPublicView(false);
              setShowEoView(true);
              setFollowBtn(false);
              setUnfollowBtn(false);
              loadOrgAttFollowerData();
              setShowEnquiry(false);

              loadOrgPartnerFollowerData();
              // getReviewsEO();
            }
          }
        });
      };
      loadUserData();
    } else if (localStorage.getItem('userId') == null) {
      const loadGuestData = async () => {
        await getEoEventsByIdRoleStatus(paraId_, 'guest', 'current').then(
          (events) => {
            setCurrenteventlist(events);
          }
        );
        await getEoEventsByIdRoleStatus(paraId_, 'guest', 'upcoming').then(
          (events) => {
            setUpcomingeventlist(events);
          }
        );

        await getEoEventsByIdRoleStatus(paraId_, 'guest', 'past').then(
          (events) => {
            setPastEventlist(events);
          }
        );
        setShowPublicView(true);
        setShowEoView(false);
        setFollowBtn(false);
        setUnfollowBtn(false);
        setShowEnquiry(false);
      };
      loadGuestData();
      loadOrgAttFollowerData();
      loadOrgPartnerFollowerData();
    }
  }, []);

  const getRefreshedFollowers = async () => {
    await getOrgAttendeeFollowers(paraId_).then((followers) => {
      setAttendeeFollowers(followers);
    });

    await getOrgPartnerFollowers(paraId_).then((followers) => {
      setPartnerFollowers(followers);
    });
  };

  const mutateFollowAsBP = useMutation((data) =>
    api
      .post('/api/partner/followEO', data)
      .then((response) => {
        setUnfollowBtn(true);
        setFollowBtn(false);
        getRefreshedFollowers();
        console.log('user ' + user);
        let endpoint =
          'https://api.ravenhub.io/company/WLU2yLZw9d/subscribers/organiser' +
          data.id +
          '/events/SyTpyGmjrT';

        axios.post(
          endpoint,
          { person: user },
          {
            headers: { 'Content-type': 'application/json' },
          }
        );
      })
      .catch((error) => {
        console.log(error);
      })
  );

  const mutateUnfollowAsBP = useMutation((data) =>
    api
      .post('/api/partner/unfollowEO', data)
      .then((response) => {
        setUnfollowBtn(false);
        setFollowBtn(true);
        getRefreshedFollowers();
      })
      .catch((error) => {
        console.log(error);
      })
  );

  const mutateFollowAsAtn = useMutation((data) =>
    api
      .post('/api/attendee/followEO', data)
      .then((response) => {
        setUnfollowBtn(true);
        setFollowBtn(false);
        getRefreshedFollowers();
        console.log('user ' + user);
        let endpoint =
          'https://api.ravenhub.io/company/WLU2yLZw9d/subscribers/organiser' +
          data.id +
          '/events/SyTpyGmjrT';

        axios.post(
          endpoint,
          { person: user },
          {
            headers: { 'Content-type': 'application/json' },
          }
        );
      })
      .catch((error) => {
        console.log(error);
      })
  );

  const mutateUnfollowAsAtn = useMutation((data) =>
    api
      .post('/api/attendee/unfollowEO', data)
      .then((response) => {
        setUnfollowBtn(false);
        setFollowBtn(true);
        getRefreshedFollowers();
      })
      .catch((error) => {
        console.log(error);
      })
  );

  const handleFollow = async () => {
    if (userRole === 'ATND') {
      mutateFollowAsAtn.mutate({
        id: eventorganiser?.id,
      });
    } else if (userRole === 'BIZPTNR') {
      mutateFollowAsBP.mutate({
        id: eventorganiser?.id,
      });
    }
  };

  const handleUnfollow = async () => {
    console.log('role' + userRole);
    if (userRole === 'ATND') {
      mutateUnfollowAsAtn.mutate({
        id: eventorganiser?.id,
      });
    } else if (userRole === 'BIZPTNR') {
      mutateUnfollowAsBP.mutate({
        id: eventorganiser?.id,
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.value == 'all') {
      getRefreshReviewsEO();
    } else {
      getReviewsEvent(e.target.value);
    }
  };

  function sendEnquiry() {
    // get user inputs
    let enquiryTitle = document.getElementById('enquiryTitle').value;
    let enquiryEvent = document.getElementById('enquiryEvent').value;
    let enquiryMessage = document.getElementById('enquiryMessage').value;
    if (enquiryEvent == 'none') {
      enquiryEvent = null;
    }
    // validate
    if (enquiryTitle == '' || enquiryMessage == '') {
      setEnquiryError(true);
    } else {
      setEnquiryError(false);
      // get sender and receiver info
      if (localStorage.getItem('userId') != null) {
        getUser(localStorage.getItem('userId')).then((user) => {
          let enquiryReceiverEmail = eventorganiser.email;
          let enquirySenderEmail = user.email;
          let data = {
            subject: enquiryTitle,
            content: enquiryMessage,
            eventId: enquiryEvent,
            receiverEmail: enquiryReceiverEmail,
            senderEmail: enquirySenderEmail,
          };
          setSendEnquiryLoading(true);
          api
            .post('/api/user/enquiry', data)
            .then(() => {
              setEnquirySuccess(true);
              setSendEnquiryLoading(false);
              clearEnquiryForm();
            })
            .catch((error) => {
              console.log(error);
              setSendEnquiryLoading(false);
              setEnquiryError(true);
            });
        });
      }
    }
  }

  function clearEnquiryForm() {
    let enquiryTitle = document.getElementById('enquiryTitle');
    let enquiryEvent = document.getElementById('enquiryEvent');
    let enquiryMessage = document.getElementById('enquiryMessage');

    enquiryTitle.value = '';
    enquiryEvent.selectedIndex = 0;
    enquiryMessage.value = '';
  }

  return (
    <>
      <BreadcrumbOne pageTitle="Profile Details">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/home">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Profile Details</li>
        </ol>
      </BreadcrumbOne>
      <ReactNotification />
      <br></br>
      <div className="content" style={{ marginLeft: '8%', marginRight: '8%' }}>
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                {/* <img
                    alt="..."
                    src={require("assets/img/damir-bosnjak.jpg")}
                  /> */}
              </div>
              <CardBody>
                <div className="author">
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                      /> */}
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    {eventorganiser?.profilePic == null && (
                      <Image
                        src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                        className="avatar border-gray"
                        thumbnail
                      />
                    )}
                    {eventorganiser?.profilePic != null && (
                      <Image
                        className="avatar border-gray"
                        src={eventorganiser?.profilePic}
                        thumbnail
                      />
                    )}
                    <h5 className="title">{eventorganiser?.name}</h5>
                  </a>
                  <p className="description">{eventorganiser?.email}</p>
                  {eventorganiser?.phonenumber != null && (<p className="description" style={{marginBottom:"-5px"}}>+65 {eventorganiser?.phonenumber}</p>)}
                  {eventorganiser?.address != null && (<p className="description" > {eventorganiser?.address}</p>)}

                </div>
                <p className="description text-center">
                  {((eventorganiser?.description === null || eventorganiser?.description === "")&&
                    'There is no description.') ||
                    eventorganiser?.description}
                </p>
                <div className="description text-center">
                  <div className="product-content__rating-wrap">
                    <div className="product-content__rating">
                      {(rating != null || rating != undefined) && (
                        <ProductRating ratingValue={rating} />
                      )}
                      {(rating == null || rating == undefined) && (
                        <ProductRating ratingValue={0} />
                      )}
                      {(rating == undefined || rating == null) && (
                        <span> (0) </span>
                      )}
                      {rating >= 0 && <span>({rating})</span>}
                    </div>
                  </div>
                </div>
              </CardBody>
              <br></br>
              <CardFooter>
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="4" md="6" xs="6">
                      <h5>
                        {attendeeFollowers.length + partnerFollowers.length}{' '}
                        <br />
                        <small>Followers</small>
                      </h5>
                    </Col>
                    {/* <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                            <h5>
                                                {following.length} <br />
                                                <small>Following</small>
                                            </h5>
                                        </Col> */}
                    <Col className="ml-auto" lg="4" md="6" xs="6">
                      <h5>
                        {showEoView && (
                          <Link href="/organiser/profile-account">
                            <button
                              className="btn btn-fill-out btn-sm"
                              name="edit"
                              value="edit"
                              size="sm"
                            >
                              <BsPencilSquare />
                            </button>
                          </Link>
                        )}
                        {showPublicView && followBtn && !unfollowBtn && (
                          <button
                            type="submit"
                            className="btn btn-fill-out btn-sm"
                            name="submit"
                            value="Submit"
                            onClick={handleFollow}
                          >
                            Follow
                          </button>
                        )}
                        {showPublicView && unfollowBtn && !followBtn && (
                          <button
                            type="submit"
                            className="btn btn-fill-out btn-sm"
                            name="submit"
                            value="Submit"
                            onClick={handleUnfollow}
                          >
                            Unfollow
                          </button>
                        )}
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              {/* <CardHeader>
                <CardTitle tag="h5">Profile Details</CardTitle>
              </CardHeader> */}
              <CardBody>
                <Tab.Container defaultActiveKey="Events">
                  <Nav
                    variant="pills"
                    className="product-description-tab__navigation"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="Events">EVENTS</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Followers">FOLLOWERS</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="reviews">REVIEWS</Nav.Link>
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
                    <Tab.Pane eventKey="Followers">
                      {/* <br></br>
                      <button
                        className="btn btn-fill-out btn-sm"
                        name="noti"
                        // onClick= {sendNoti}
                        size="sm"
                      >
                        <AiOutlineNotification />
                      </button> */}

                      <ul className="list-unstyled team-members">
                        <div className="product-description-tab__additional-info">
                          <FollowersTabEoProfile
                            attendees={attendeeFollowers}
                            partners={partnerFollowers}
                            showPublicView={showPublicView}
                            organiser={eventorganiser?.name}
                            showEoView={showEoView}
                          />
                        </div>
                      </ul>
                    </Tab.Pane>
                    <Tab.Pane eventKey="reviews">
                      <div className="product-description-tab__review">
                        <div
                          style={{
                            overflowY: 'auto',
                            // border:'1px solid red',
                            // width:'500px',
                            overflowX: 'hidden',
                            height: '60vh',
                            position: 'relative',
                          }}
                        >
                          {/* <div className="comments"> */}
                          <br></br>

                          <Row className="mb-4">
                            <Col xs={6} sm={6}>
                              <select
                                className="custom-select"
                                onChange={handleChange}
                              >
                                <option value="all">Filter By Events</option>
                                {(pasteventlist != null ||
                                  pasteventlist != undefined) &&
                                  pasteventlist.map((event) => {
                                    if (getReviewsEventFilter(event.eid)) {
                                      return (
                                        <option value={event.eid}>
                                          {event.name}
                                        </option>
                                      );
                                    }
                                  })}
                              </select>
                            </Col>
                          </Row>

                          <ul className="list-none comment-list mt-8">
                            <li>
                              {(reviews == null || reviews == undefined) && (
                                <span>There is no reviews.</span>
                              )}
                              {(reviews != null || reviews != undefined) &&
                                reviews.map((review) => {
                                  return (
                                    <>
                                      <hr></hr>
                                      <div className="comment-block">
                                        <div className="rating-wrap">
                                          <div className="rating">
                                            <ProductRating
                                              ratingValue={review.rating}
                                            />
                                          </div>
                                          <div className="description">
                                            <p>{review.reviewDateTime}</p>
                                          </div>
                                        </div>
                                        <p className="customer-meta">
                                          {review.attendee != null && (
                                            <span className="review-author">
                                              {review.attendee.name}
                                            </span>
                                          )}
                                          {review.partner != null && (
                                            <span className="review-author">
                                              {review.partner.name}
                                            </span>
                                          )}
                                          <div className="rating">
                                            <span>{review.event.name}</span>
                                          </div>
                                        </p>
                                        <div className="description">
                                          <p>{review.reviewText}</p>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* </div> */}
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </CardBody>
            </Card>
          </Col>
// <<<<<<< wj-lili-final-system
// =======
//           {Boolean(currentUserId_ != paraId_ & currentUserRole_ != "Organiser") && (
//             <Col xs={12} style={{marginTop: "30px", marginBottom: "30px"}}>
//               <Card className="card-user">
//                 <CardHeader className="text-center">
//                   <h4>Have some questions?</h4>
//                 </CardHeader>
//                 <CardBody className="d-flex justify-content-center">
//                   <Row className="w-100 d-flex justify-content-center">
//                     <Col xs={12} lg={6} className="d-flex flex-column" style={{gap: "10px"}}>
//                       <Alert
//                         show={showEnquiryError}
//                         variant="danger"
//                         onClose={() => setEnquiryError(false)}
//                         dismissible
//                       >
//                         Please fill in all the required fields.
//                       </Alert>
//                       <Alert
//                         show={showEnquirySuccess}
//                         variant="success"
//                         onClose={() => setEnquirySuccess(false)}
//                         dismissible
//                       >
//                         Success! A copy of the enquiry has been sent to your email.
//                       </Alert>
//                       <input
//                         id="enquiryTitle"
//                         className="form-control"
//                         placeholder="Title *"
//                       />
//                       <select
//                         className="custom-select"
//                         id="enquiryEvent"
//                       >
//                         <option value="none">Event</option>
//                         {(enquiryEventList != null ||
//                           enquiryEventList != undefined) &&
//                           enquiryEventList.map((event) => {
//                             return (
//                               <option value={event.eid}>
//                                 {event.name}
//                               </option>
//                             );
//                           })}
//                       </select>
//                       <textarea
//                         id="enquiryMessage"
//                         className="form-control"
//                         placeholder="Your Enquiry *"
//                         style={{height: "10em"}}
//                       />
//                       <ButtonWithLoading
//                         className="btn btn-fill-out"
//                         onClick={() => sendEnquiry()}
//                         isLoading={sendEnquiryLoading && !showEnquiryError}
//                       >
//                         Send Enquiry
//                       </ButtonWithLoading>
//                     </Col>
//                   </Row>
//                 </CardBody>
//               </Card>
//             </Col>
//           )}
// >>>>>>> main
        </Row>
        <br></br>
        {showEnquiry && (
          <Row xs="12" style={{ marginTop: '30px', marginBottom: '30px' }}>
            {/* <Card className="card-user"> */}
            {/* <CardHeader className="text-center">
                <h4>Have some questions?</h4>
              </CardHeader> */}
            {/* <CardBody className="d-flex justify-content-center"> */}

            <Col xs="5" className=" justify-content-center">
              <br></br>
              <div className="d-flex justify-content-center">
                <h2>Have some questions for us?</h2>
              </div>
              {/* <br></br> */}

              <div className="d-flex justify-content-center">
                <img
                  // src="https://cdn1.iconfinder.com/data/icons/contact-us-honey-series/64/ONLINE_QUESTION-512.png"
                  src="https://icons-for-free.com/iconfiles/png/512/app+email+emailing+galaxy+mobile+open+line+icon-1320183043200419856.png"
                  className="img-responsive"
                  style={{ maxWidth: '60%' }}
                />
              </div>
            </Col>
            <Col xs="7" className="d-flex justify-content-center">
              <br></br>
              <br></br>
              <div
                className="d-flex flex-column text-center "
                style={{ gap: '10px', width: '70%' }}
              >
                <br></br>
                <input
                  id="enquiryTitle"
                  className="form-control"
                  placeholder="Title *"
                />
                <select className="custom-select" id="enquiryEvent">
                  <option value="none">Event</option>
                  {(enquiryEventList != null ||
                    enquiryEventList != undefined) &&
                    enquiryEventList.map((event) => {
                      return <option value={event.eid}>{event.name}</option>;
                    })}
                </select>
                <textarea
                  id="enquiryMessage"
                  className="form-control"
                  placeholder="Your Enquiry *"
                  style={{ height: '10em' }}
                />
                <Alert
                  show={showEnquiryError}
                  variant="danger"
                  onClose={() => setEnquiryError(false)}
                  dismissible
                >
                  Please fill in all the required fields.
                </Alert>
                <Alert
                  show={showEnquirySuccess}
                  variant="success"
                  onClose={() => setEnquirySuccess(false)}
                  dismissible
                >
                  Success! A copy of the enquiry has been sent to your email.
                </Alert>
                <ButtonWithLoading
                  className="btn btn-fill-out"
                  onClick={() => sendEnquiry()}
                  isLoading={sendEnquiryLoading && !showEnquiryError}
                >
                  Send Enquiry
                </ButtonWithLoading>
              </div>
            </Col>
          </Row>
        )}

        <br></br>
      </div>
    </>
  );
};

export default EventOrgProfile;
