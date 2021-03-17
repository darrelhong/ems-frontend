import React from 'react';

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
import { Container } from 'react-bootstrap';
import { getUser } from '../lib/query/getUser';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { getFollowers, getFollowing } from '../lib/query/getBPFollow';
import { isBpVip, addVip } from '../lib/query/useVip';
import { BsPencilSquare, BsPlus } from 'react-icons/bs';
import api from '../lib/ApiClient';
import { FiPlus } from 'react-icons/fi';

const PartnerProfile = ({ localuser }) => {
  const [publicView, setPublicView] = useState();
  const [eoView, setEOView] = useState();

  // const [events, setEvents] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [unfollowBtn, setUnfollowBtn] = useState();
  const [followBtn, setFollowBtn] = useState();
  const [partner, setPartner] = useState();
  // const [markVip, setMarkVip] = useState(false);
  // const [unmarkVip, setUnmarkVip] = useState(false);
  const [checkIsBpVip, setCheckIsBpVip] = useState(null);
  //const { data: partner } = useUser(localuser);
  var followId;

  useEffect(() => {
    // get the profile page bp's data
    const getUserData = async () => {
      await getUser(localuser).then((data) => {
        setPartner(data);
      });
    };
    getUserData();

    console.log('user ' + localuser);
    // const getPartnerData = async () => {
    //   await getUser(localuser).then((data) => {
    //     setPartner(data);
    //   });
    // };
    // getPartnerData();

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
            setUnfollowBtn(true);
            setFollowBtn(false);
          } else {
            setFollowBtn(true);
            setUnfollowBtn(false);
          }
        }
      });
    };
    getFollowersData();

    if (localStorage.getItem('userId') != null) {
      const getCurrentUserData = async () => {
        // get currentUser
        await getUser(localStorage.getItem('userId')).then((data) => {
          console.log('current ' + data.id);
          if (data?.id !== localuser) {
            console.log('passed ');

            if (data.roles[0].roleEnum === 'EVNTORG') {
              console.log('eventorg ');

              setEOView(true);
              setPublicView(false);
              setFollowBtn(false);
              setUnfollowBtn(false);

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
              followId = data.id;
            } else {
              //bp view other bp, cannot follow
              setFollowBtn(false);
              setUnfollowBtn(false);
              setEOView(false);
              setPublicView(true);
            }
          } else {
            setPublicView(false);
            setEOView(false);
          }
        });
      };
      getCurrentUserData();
    } else {
      //guest cannot follow bp
      setPublicView(true);
      setEOView(false);
      setFollowBtn(false);
      setUnfollowBtn(false);
    }
  }, [localuser, followId]);

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

    checkIfBpIsVip_();
  };

  return (
    <>
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
                    <h5 className="title">{partner?.name}</h5>
                  </a>
                  <p className="description">{partner?.email}</p>
                </div>
                <p className="description text-center">
                  {partner?.description}
                </p>
                <p className="description text-center">
                  Address :{partner?.address}
                </p>

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
                              onClick={handleAddVip}
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
              <CardHeader>
                <CardTitle tag="h5">Profile Details</CardTitle>
              </CardHeader>
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
                      <span>There are currently no events.</span>
                      {/* <div className="product-description-tab__details">
                  
                    <EventsProfile
                      current={events}
                    //   upcoming="bestSellerProducts"
                    //  past="featuredProducts"
                    />
                  </div> */}
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
          <Col xs="12" style={{marginTop: "30px", marginBottom: "30px"}}>
            <Card className="card-user">
              <CardHeader className="text-center">
                <h4>Have some questions?</h4>
              </CardHeader>
              <CardBody className="d-flex justify-content-center">
                <div className="d-flex flex-column text-center w-50" style={{gap: "10px"}}>
                  <input
                    id="enquiryTitle"
                    className="form-control"
                    placeholder="Title"
                  />
                  <input
                    id="enquiryEventName"
                    className="form-control"
                    placeholder="Event Name"
                  />
                  <textarea
                    id="enquiryMessage"
                    className="form-control"
                    placeholder="Type something here..."
                    style={{height: "10em"}}
                  />
                  <button
                    className="btn btn-fill-out"
                  >
                    Send Enquiry
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PartnerProfile;
