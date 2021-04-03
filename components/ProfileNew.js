import React from 'react';
import Head from 'next/head';
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';

import { useMutation } from 'react-query';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BreadcrumbOne } from '../components/Breadcrumb';
import { Alert } from 'react-bootstrap';
import { getUser } from '../lib/query/getUser';
import getAllEventByBpId from '../lib/query/getEvents';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { getEoEventsByIdRoleStatus } from '../lib/query/useEvent';
import { getFollowers, getFollowing } from '../lib/query/getBPFollow';
import { getBpEventsByIdRoleStatus } from '../lib/query/getEventsBPProfile';
import { isBpVip, addVip } from '../lib/query/useVip';
import { BsPencilSquare, BsPlus } from 'react-icons/bs';
import api from '../lib/ApiClient';
import { PermDataSettingTwoTone } from '@material-ui/icons';
import { FiPlus } from 'react-icons/fi';
// <<<<<<< HEAD
import Modal from 'react-bootstrap/Modal';
import ButtonWithLoading from './custom/ButtonWithLoading';

// const PartnerProfile = ({ localuser, currentUserId, currentUserRole }) => {
// =======
import EventTabOne from '../components/EventTabBpProfile';
const PartnerProfile = ({ localuser }) => {
  const [publicView, setPublicView] = useState();
  const [eoView, setEOView] = useState();

  // const [events, setEvents] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [unfollowBtn, setUnfollowBtn] = useState();
  const [followBtn, setFollowBtn] = useState();
  const [partner, setPartner] = useState();
  const [user, setUser] = useState();
  const [currenteventlist, setCurrenteventlist] = useState([]);
  const [pasteventlist, setPastEventlist] = useState([]);
  // const [markVip, setMarkVip] = useState(false);
  // const [unmarkVip, setUnmarkVip] = useState(false);
  const [checkIsBpVip, setCheckIsBpVip] = useState(null);
  //const { data: partner } = useUser(localuser);
  // for vip modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [enquiryEventList, setEnquiryEventList] = useState([]);
  const [showEnquiryError, setEnquiryError] = useState(false);
  const [showEnquirySuccess, setEnquirySuccess] = useState(false);
  const [sendEnquiryLoading, setSendEnquiryLoading] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  var followId;

  useEffect(() => {
    // get the profile page bp's data
    const getUserData = async () => {
      await getUser(localuser).then((data) => {
        setPartner(data);
      });
    };
    getUserData();

    const getFollowingData = async () => {
      await getFollowing(localuser).then((data) => {
        setFollowing(data);
      });
    };
    getFollowingData();
    const getFollowersData = async () => {
      await getFollowers(localuser).then((data) => {
        setFollowers(data);
        if (followId >= 0) {
          var found = false;
          for (var i = 0; i < data.length; i++) {
            console.log('test' + data[i].id + ' ' + followId);
            if (data[i].id === followId) {
              found = true;
              break;
            }
          }
          if (found) {
            console.log('found');
            setUnfollowBtn(true);
            setFollowBtn(false);
          } else {
            setFollowBtn(true);
            setUnfollowBtn(false);
          }
        }
      });
    };

    if (localStorage.getItem('userId') != null) {
      const getCurrentUserData = async () => {
        // get currentUser
        await getUser(localStorage.getItem('userId')).then(async (data) => {
          console.log('current ' + data.id);
          setUser(data?.name);
          if (data?.id !== localuser) {
            if (data.roles[0].roleEnum === 'EVNTORG') {
              await getBpEventsByIdRoleStatus(
                localuser,
                data.roles[0].roleEnum,
                'current'
              ).then((events) => {
                setCurrenteventlist(events);
                setEnquiryEventList(events);
              });
              await getBpEventsByIdRoleStatus(
                localuser,
                data.roles[0].roleEnum,
                'past'
              ).then((events) => {
                setPastEventlist(events);
              });

              setEOView(true);
              setPublicView(false);
              setFollowBtn(false);
              setUnfollowBtn(false);
              setShowEnquiry(true);
              const checkIfBpIsVip = async () => {
                console.log('hello');
                console.log(localuser);
                await isBpVip(localuser).then((vipresult) => {
                  setCheckIsBpVip(vipresult);
                });
              };

              checkIfBpIsVip();
            } else if (data.roles[0].roleEnum === 'ATND') {
              console.log('attendee ');

              setEOView(false);
              setPublicView(true);
              setShowEnquiry(true);

              followId = data.id;
              getFollowersData();
              await getBpEventsByIdRoleStatus(
                localuser,
                data.roles[0].roleEnum,
                'current'
              ).then((events) => {
                setCurrenteventlist(events);
                setEnquiryEventList(events);
              });
              await getBpEventsByIdRoleStatus(
                localuser,
                data.roles[0].roleEnum,
                'past'
              ).then((events) => {
                setPastEventlist(events);
              });
            } else {
              //bp view other bp, cannot follow
              setFollowBtn(false);
              setUnfollowBtn(false);
              setEOView(false);
              setPublicView(true);
              setShowEnquiry(true);

              await getBpEventsByIdRoleStatus(
                localuser,
                data.roles[0].roleEnum,
                'current'
              ).then((events) => {
                setCurrenteventlist(events);
                setEnquiryEventList(events);
              });
              await getBpEventsByIdRoleStatus(
                localuser,
                data.roles[0].roleEnum,
                'past'
              ).then((events) => {
                setPastEventlist(events);
              });
            }
          } else {
            setPublicView(false);
            setEOView(false);
            setFollowBtn(false);
            setUnfollowBtn(false);
            setShowEnquiry(false);

            await getBpEventsByIdRoleStatus(
              localuser,
              data.roles[0].roleEnum,
              'current'
            ).then((events) => {
              setCurrenteventlist(events);
            });
            await getBpEventsByIdRoleStatus(
              localuser,
              data.roles[0].roleEnum,
              'past'
            ).then((events) => {
              setPastEventlist(events);
            });
          }
        });

        // if (currentUserRole == 'Organiser') {
        //   await getEoEventsByIdRoleStatus(
        //     currentUserId,
        //     'EVNTORG',
        //     'current'
        //   ).then(async (currentEvents) => {
        //     await getEoEventsByIdRoleStatus(
        //       currentUserId,
        //       'EVNTORG',
        //       'upcoming'
        //     ).then((upcomingEvents) => {
        //       setEnquiryEventList(currentEvents.concat(upcomingEvents));
        //     });
        //   });
        // } else if (currentUserRole == 'Attendee') {
        //   await getAllEventByBpId(localuser).then((bpEventList) => {
        //     setEnquiryEventList(bpEventList);
        //   });
        // }
      };
      getCurrentUserData();
      getFollowersData();
    } else {
      //guest cannot follow bp
      const getEvents = async () => {
        await getBpEventsByIdRoleStatus(localuser, 'guest', 'current').then(
          (events) => {
            setCurrenteventlist(events);
          }
        );
        await getBpEventsByIdRoleStatus(localuser, 'guest', 'past').then(
          (events) => {
            setPastEventlist(events);
          }
        );
      };
      getEvents();
      setPublicView(true);
      setEOView(false);
      setShowEnquiry(false);
      setFollowBtn(false);
      setUnfollowBtn(false);
      getFollowersData();
      getFollowingData();
    }

    console.log(currenteventlist + 'current');
    console.log(pasteventlist + 'past');
  }, []);

  const getRefreshedFollowers = async () => {
    await getFollowers(localuser).then((data) => {
      setFollowers(data);
    });
  };

  const mutateFollow = useMutation((data) =>
    api
      .post('/api/attendee/followBP', data)
      .then((response) => {
        setUnfollowBtn(true);
        setFollowBtn(false);
        getRefreshedFollowers();
        console.log('parner id' + data.id);
        console.log('user' + user);
        let endpoint =
          'https://api.ravenhub.io/company/WLU2yLZw9d/subscribers/partner' +
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

  const mutateUnfollow = useMutation((data) =>
    api
      .post('/api/attendee/unfollowBP', data)
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
    //if attendee follow bp, userId not null
    if (localStorage.getItem('userId') != null) {
      if (publicView && !eoView) {
        mutateFollow.mutate({
          id: partner?.id,
        });
      }
    } else {
      //if guest want to follow prompt sign up
    }
  };

  const handleUnfollow = async () => {
    //if attendee follow bp, userId not null
    if (localStorage.getItem('userId') != null) {
      if (publicView && !eoView) {
        mutateUnfollow.mutate({
          id: partner?.id,
        });
      }
    }
  };

  const handleAddVip = async () => {
    await addVip(partner.id);
    const checkIfBpIsVip_ = async () => {
      var result = await isBpVip(partner?.id);
      setCheckIsBpVip(result);
    };
    setShow(false);
    checkIfBpIsVip_();
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
    if (enquiryTitle == '' ||  enquiryMessage == '') {
      setEnquiryError(true);
    } else {
      setEnquiryError(false);
    // get sender and receiver info
    if(localStorage.getItem('userId') != null){
      getUser(localStorage.getItem('userId')).then((user) => {
            let enquiryReceiverEmail = partner.email;
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirm add as VIP?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-fill-out btn-sm" onClick={handleAddVip}>
            Yes
          </button>
          <Button variant="secondary" onClick={handleClose} className="btn-sm">
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <BreadcrumbOne pageTitle="Profile Details">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/partner/home">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Profile Details</li>
        </ol>
      </BreadcrumbOne>
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
                    {partner?.profilePic == null && (
                      <Image
                        src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                        className="avatar border-gray"
                        thumbnail
                      />
                    )}
                    {partner?.profilePic != null && (
                      <Image
                        className="avatar border-gray"
                        src={partner?.profilePic}
                        thumbnail
                      />
                    )}
                    &nbsp;
                    <h5 className="title">{partner?.name}</h5>
                  </a>
                  <div>
                    <h7 className="description">{partner?.email}</h7>
                    {partner?.phonenumber != null && (<p className="description" style={{marginBottom:"-5px"}}>+65 {partner?.phonenumber}</p>)}
                  {partner?.address != null && (<p className="description" > {partner?.address}</p>)}
                  </div>
                </div>
                <p className="description text-center">
                  {partner?.description}
                </p>
                {/* <p className="description text-center">
                  Address : {partner?.address}
                </p> */}

                <div className="description text-center">
                  <p>
                    Category :
                    <span>
                      {' '}
                      <Badge variant="primary">
                        {partner?.businessCategory}
                      </Badge>{' '}
                    </span>
                  </p>
                </div>
              </CardBody>
              <br></br>
              <CardFooter>
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="4" md="6" xs="6">
                      <h5>
                        {followers.length} <br />
                        <small>Followers</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        {following.length} <br />
                        <small>Following</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto  mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        {!publicView && !eoView && (
                          <Link href="/partner/profile-account">
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
                        {publicView && !unfollowBtn && followBtn && (
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

                        {publicView && unfollowBtn && !followBtn && (
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

                        <br />
                        {/* <small>Spent</small> */}
                        {localuser != undefined &&
                          checkIsBpVip != null &&
                          eoView &&
                          checkIsBpVip && (
                            <Badge variant="info">VIP Member</Badge>
                          )}
                        {localuser != undefined &&
                          checkIsBpVip != null &&
                          eoView &&
                          !checkIsBpVip && (
                            <button
                              className="btn btn-fill-out btn-sm"
                              onClick={() => setShow(true)}
                            >
                              <FiPlus />
                              VIP
                            </button>
                          )}

                        <br />
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
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
                      <Nav.Link eventKey="Following">FOLLOWING</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    <Tab.Pane eventKey="Events">
                      <br></br>
                      <div className="product-description-tab__additional-info">
                        <EventTabOne
                          current={currenteventlist}
                          past={pasteventlist}
                        />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Followers">
                      <br></br>
                      <ul className="list-unstyled team-members">
                        {followers != undefined &&
                          followers.map((follower) => {
                            return (
                              <li>
                                <hr></hr>
                                <Row>
                                  <Col md="1" xs="1">
                                    {' '}
                                    &nbsp;
                                  </Col>
                                  <Col md="2" xs="2">
                                    <div className="avatar">
                                      {/* <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                            /> */}
                                      {follower?.profilePic == null && (
                                        <img
                                          src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                          className="img-circle img-no-padding img-responsive"
                                        />
                                      )}
                                      {follower?.profilePic != null && (
                                        <Image
                                          className="img-circle img-no-padding img-responsive"
                                          src={follower?.profilePic}
                                        />
                                      )}
                                    </div>
                                  </Col>
                                  <Col md="4" xs="4">
                                    {/* <br></br> */}
                                    {follower.name} <br />
                                    <span className="text-muted">
                                      {follower.email}
                                    </span>
                                    {/* <div>
                                      {!follower.categoryPreferences.isEmpty &&
                                        follower.categoryPreferences.map(
                                          (eventtype) => {
                                            return (
                                              <span>
                                                {' '}
                                                <Badge variant="primary">
                                                  {eventtype}
                                                </Badge>{' '}
                                              </span>
                                            );
                                          }
                                        )}
                                    </div> */}
                                  </Col>
                                  <Col className="text-left" md="4" xs="4">
                                    <br></br>
                                    {/* {!publicView && (
                                      <Button
                                        className="btn-round btn-icon"
                                        color="success"
                                        outline
                                        size="sm"
                                      >
                                        Select
                                        <i className="fa fa-envelope" />
                                       </Button>
                                    )} */}

                                    {!follower.categoryPreferences.isEmpty &&
                                      follower.categoryPreferences.map(
                                        (eventtype) => {
                                          return (
                                            <span>
                                              {' '}
                                              <Badge variant="primary">
                                                {eventtype}
                                              </Badge>{' '}
                                            </span>
                                          );
                                        }
                                      )}
                                  </Col>
                                </Row>
                              </li>
                            );
                          })}
                      </ul>
                    </Tab.Pane>

                    <Tab.Pane eventKey="Following">
                      <br></br>
                      <ul className="list-unstyled team-members">
                        {following != undefined &&
                          following.map((follow) => {
                            return (
                              <li>
                                <hr></hr>
                                <Row>
                                  <Col md="1" xs="1">
                                    {' '}
                                    &nbsp;
                                  </Col>
                                  <Col md="2" xs="2">
                                    <div className="avatar">
                                      {follow?.profilePic == null && (
                                        <img
                                          src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                          className="img-circle img-no-padding img-responsive"
                                        />
                                      )}
                                      {follow?.profilePic != null && (
                                        <Image
                                          className="img-circle img-no-padding img-responsive"
                                          src={follow?.profilePic}
                                        />
                                      )}
                                    </div>
                                  </Col>
                                  <Col md="5" xs="5">
                                    {/* <br></br> */}
                                    <Link
                                      href={{
                                        pathname:
                                          '/organiser/organiser-profile',
                                        query: {
                                          paraId: JSON.stringify(follow?.id),
                                        },
                                      }}
                                    >
                                      {follow.name}
                                    </Link>{' '}
                                    <br />
                                    {/* <span className="text-muted">
                                      {follow.email}
                                    </span> */}
                                    <div>
                                      <span className="text-muted">
                                        {follow.description}
                                      </span>
                                    </div>
                                  </Col>

                                  <Col className="text-left" md="4" xs="4">
                                    <span>Email:</span>
                                    <br></br>
                                    <span className="text-muted">
                                      {follow.email}
                                    </span>
                                    {/* {!publicView && (
                                      <Button
                                        className="btn-round btn-icon"
                                        color="success"
                                        outline
                                        size="sm"
                                      >
                                        Select
                                      </Button>
                                    )} */}
                                  </Col>
                                </Row>
                              </li>
                            );
                          })}
                      </ul>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </CardBody>
            </Card>
          </Col>
          {/* <<<<<<< HEAD
          {Boolean(
            (currentUserId != localuser) & (currentUserRole != 'Partner')
          ) && (
            <Col xs={12} style={{ marginTop: '30px', marginBottom: '30px' }}>
              <Card className="card-user">
                <CardHeader className="text-center">
                  <h4>Have some questions?</h4>
                </CardHeader>
                <CardBody className="d-flex justify-content-center">
                  <Row className="w-100 d-flex justify-content-center">
                    <Col
                      xs={12}
                      lg={6}
                      className="d-flex flex-column"
                      style={{ gap: '10px' }}
                    >
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
                            return (
                              <option value={event.eid}>{event.name}</option>
                            );
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
                        Success! A copy of the enquiry has been sent to your
                        email.
                      </Alert>
                      <ButtonWithLoading
                        className="btn btn-fill-out"
                        onClick={() => sendEnquiry()}
                        isLoading={sendEnquiryLoading && !showEnquiryError}
                      >
                        Send Enquiry
                      </ButtonWithLoading>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          )} */}
          {/* JUSTIN
//======= */}
        </Row>
        <br></br>
        {showEnquiry && (        <Row xs="12" style={{ marginTop: '30px', marginBottom: '30px' }}>
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
                            return (
                              <option value={event.eid}>{event.name}</option>
                            );
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
                        Success! A copy of the enquiry has been sent to your
                        email.
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
        </Row>)}

        <br></br>
      </div>
    </>
  );
};

export default PartnerProfile;
