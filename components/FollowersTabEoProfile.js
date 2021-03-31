import { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Container,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import axios from 'axios';
import api from '../lib/ApiClient';
import { useMutation } from 'react-query';
import { AiOutlineNotification } from 'react-icons/ai';
// import EventEoProfileSliderTen from './ProductSlider/EventEoProfileSliderTen';
import { store } from 'react-notifications-component';
import { BsFillInfoCircleFill } from 'react-icons/bs';

const FollowersTabEoProfile = ({
  attendees,
  partners,
  showPublicView,
  organiser,
  showEoView,
}) => {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [checkAttendee, setCheckAttendee] = useState(false);
  const [checkPartner, setCheckPartner] = useState(false);
  //const [emailbroadcastoption, setEmailbroadcastoption] = useState('');

  const [broadcastModalShow, setBroadcastModalShow] = useState(false);
  const closeBroadcastModal = () => {
    setBroadcastModalShow(false);
    setErrorMessage('null');
    setMessage('');
  };
  const openBroadcastModal = () => setBroadcastModalShow(true);
  const [confirmBroadcastModalShow, setConfirmBroadcastModalShow] = useState(
    false
  );
  const closeConfirmBroadcastModal = () => {
    setConfirmBroadcastModalShow(false);
    setBroadcastModalShow(true);
  };
  const openConfirmBroadcastModal = () => {
    if (message === '' || (checkAttendee == false && checkPartner == false)) {
      setErrorMessage('Please ensure that all fields are filled.');
    } else {
      setErrorMessage('null');
      setConfirmBroadcastModalShow(true);
      setBroadcastModalShow(false);
    }
  };

  // var checkAttendee;
  // var checkPartner;

  const handleMessage = (e) => {
    setMessage(e.target.value);
    console.log(e.target.value + 'message');
  };

  // const handleUser = (user) => {
  //   setCheckUser(user);
  //   console.log(user + "user");

  //   console.log(checkUser + "checkuser");

  // };

  const handlePartner = (e) => {
    if (e.target.checked) {
      console.log('checked');

      setCheckPartner(true);
    } else {
      console.log('unchecked');

      setCheckPartner(false);
    }
    console.log(checkPartner + 'partner');
  };

  const handleAttendee = (e) => {
    if (e.target.checked) {
      console.log('checked');

      setCheckAttendee(true);
    } else {
      console.log('unchecked');

      setCheckAttendee(false);
    }
    console.log(checkAttendee + 'attendee');
  };

  const sendNoti = () => {
    var endpoint =
      'https://api.ravenhub.io/company/WLU2yLZw9d/broadcasts/ziyDknTScF';
    /* 
       The "data" key is optional within each notification
       object in the notifications array below.
    */
    console.log('organiser' + organiser);
    console.log('noti attendee' + checkAttendee);
    var postBody = { notifications: [] };
    if (checkAttendee == true) {
      for (var i = 0; i < attendees.length; i++) {
        console.log('attendee' + attendees[i].id);
        postBody.notifications.push({
          subscriberId: 'attendee' + attendees[i].id,
          data: {
            title: organiser,
            message: message,
          },
        });
        console.log(
          postBody.notifications[i].subscriberId + 'notification postbody'
        );
      }
    }
    if (checkPartner == true) {
      for (var i = 0; i < partners.length; i++) {
        console.log('partner' + partners[i].id);
        postBody.notifications.push({
          subscriberId: 'partner' + partners[i].id,
          data: {
            title: organiser,
            message: message,
          },
        });
        console.log(
          postBody.notifications[i].subscriberId + 'notification postbody'
        );
      }
    }
    console.log('postbody' + postBody.notifications);

    axios.post(endpoint, postBody, {
      headers: { 'Content-type': 'application/json' },
    });

    closeConfirmBroadcastModal();
    closeBroadcastModal();

    store.addNotification({
      title: 'Success',
      message:
        'The broadcast message has been sent out as both system notification and email successfully.',
      type: 'success',
      insert: 'top',
      container: 'top-left',
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });

    console.log('broadcastOption');
    console.log(checkAttendee);
    console.log(checkPartner);

    var emailbroadcastoption = '';
    if (checkAttendee == true && checkPartner == true) {
      emailbroadcastoption = 'Both';
    } else if (checkPartner == true && checkAttendee == false) {
      emailbroadcastoption = 'AllBpFollowers';
    } else if (checkAttendee == true && checkPartner == false) {
      emailbroadcastoption = 'AllAttFollowers';
    }
    console.log(emailbroadcastoption);
    console.log(message);
    mutateEmailNoti.mutate({
      content: message,
      broadcastOption: emailbroadcastoption,
    });
  };

  const mutateEmailNoti = useMutation((data) => {
    api
      .post('/api/organiser/broadcastEmailToFollowers', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const broadcastMsgToolTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      The message will be sent out as both system notification and email.
    </Tooltip>
  );

  if (attendees !== undefined && partners !== undefined) {
    return (
      <div className="product-tab-area space-pb--r70">
        {/* broadcast modal */}

        {/* confirm broadcast modal */}
        <Modal
          show={confirmBroadcastModalShow}
          onHide={closeConfirmBroadcastModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Broadcast Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to broadcast this message?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeConfirmBroadcastModal}>
              No
            </Button>
            <button
              variant="primary"
              className="btn btn-fill-out"
              onClick={sendNoti}
            >
              Yes
            </button>
          </Modal.Footer>
        </Modal>
        <Modal show={broadcastModalShow} onHide={closeBroadcastModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Broadcast Message &nbsp;
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={broadcastMsgToolTip}
              >
                <BsFillInfoCircleFill></BsFillInfoCircleFill>
              </OverlayTrigger>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            {/* <input
              required
              className="form-control"
              name="broadcastTitle"
              id="broadcastTitle"
              placeholder="Title"
              style={{ width: "100%" }}
            /> */}
            <textarea
              required
              className="form-control"
              name="broadcastMessage"
              id="broadcastMessage"
              placeholder="Type your message here..."
              defaultValue={message}
              style={{ width: '100%', height: '10em' }}
              onChange={handleMessage}
            />

            <div style={{ display: 'flex' }}>
              {partners.length > 0 && (
                <div style={{ display: 'flex', width: '50%' }}>
                  <Form.Check
                    id="chkBusinessPartner"
                    onClick={handlePartner.bind(this)}
                  />

                  <label htmlFor="chkBusinessPartner">
                    All Business Partners
                  </label>
                </div>
              )}
              {attendees.length > 0 && (
                <div style={{ display: 'flex', width: '50%' }}>
                  <Form.Check
                    id="chkAttendee"
                    onClick={handleAttendee.bind(this)}
                  />

                  <label htmlFor="chkAttendee">All Attendees</label>
                </div>
              )}
            </div>

            <div className="error">
              {errorMessage != 'null' && <span>{errorMessage}</span>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeBroadcastModal}>
              Close
            </Button>
            <button
              variant="primary"
              className="btn btn-fill-out"
              onClick={() => openConfirmBroadcastModal()}
            >
              Proceed
            </button>
          </Modal.Footer>
        </Modal>

        <Container>
          <Tab.Container defaultActiveKey="attendees">
            <Nav
              variant="pills"
              className="product-tab-navigation text-center justify-content-center space-mb--30"
            >
              <Nav.Item>
                <Nav.Link eventKey="attendees">Attendee</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="partners">Partner</Nav.Link>
              </Nav.Item>
              {((showEoView && !showPublicView && attendees.length > 0) ||
                (showEoView && !showPublicView && partners.length > 0)) && (
                <button
                  className="btn btn-fill-out btn-sm"
                  style={{ float: 'right' }}
                  onClick={() => openBroadcastModal()}
                >
                  <AiOutlineNotification />
                </button>
              )}
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="attendees">
                <Row>
                  <Col md={12}>
                    <div
                      style={{
                        overflowY: 'auto',
                        // border:'1px solid red',
                        // width:'500px',
                        overflowX: 'hidden',
                        height: '40vh',
                        position: 'relative',
                      }}
                    >
                      <div className="product-description-tab__additional-info">
                        {attendees != null &&
                          attendees.map((attendee) => {
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
                                      {attendee?.profilePic == null && (
                                        <img
                                          src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                          className="img-circle img-no-padding img-responsive"
                                        />
                                      )}
                                      {attendee?.profilePic != null && (
                                        <Image
                                          className="img-circle img-no-padding img-responsive"
                                          src={attendee?.profilePic}
                                        />
                                      )}
                                    </div>
                                  </Col>
                                  <Col md="4" xs="4">
                                    {/* <br></br> */}
                                    {attendee.name} <br />
                                    <span className="text-muted">
                                      {attendee.email}
                                    </span>
                                    {/* <div>
                                    {!attendee.categoryPreferences.isEmpty &&
                                      attendee.categoryPreferences.map(
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
                                    {!attendee.categoryPreferences.isEmpty &&
                                      attendee.categoryPreferences.map(
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
                                    {/* {!showPublicView && (<Button
                                    className="btn-round btn-icon"
                                    color="success"
                                    outline
                                    size="sm"
                                  >
                                    Select
                                     <i className="fa fa-envelope" /> 
                                   </Button>)} */}
                                  </Col>
                                </Row>
                              </li>
                            );
                          })}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="partners">
                <Row>
                  <Col md={12}>
                    <div
                      style={{
                        overflowY: 'auto',
                        // border:'1px solid red',
                        // width:'500px',
                        overflowX: 'hidden',
                        height: '40vh',
                        position: 'relative',
                      }}
                    >
                      <div className="product-description-tab__additional-info">
                        <ul className="list-unstyled team-members">
                          {partners != null &&
                            partners.map((partner) => {
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
                                        {partner?.profilePic == null && (
                                          <img
                                            src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                            className="img-circle img-no-padding img-responsive"
                                          />
                                        )}
                                        {partner?.profilePic != null && (
                                          <Image
                                            className="img-circle img-no-padding img-responsive"
                                            src={partner?.profilePic}
                                          />
                                        )}
                                      </div>
                                    </Col>
                                    <Col md="4" xs="4">
                                      {/* <br></br> */}
                                      <Link
                                        href={{
                                          pathname: '/partner/partner-profile',
                                          query: {
                                            paraId: JSON.stringify(partner?.id),
                                          },
                                        }}
                                      >
                                        {partner.name}
                                      </Link>{' '}
                                      <br />
                                      <span className="text-muted">
                                        {partner.email}
                                      </span>
                                      {/* <div>
                                        {partner.businessCategory !== null &&
                                          (
                                            <span>
                                              {' '}
                                              <Badge variant="primary">
                                                {partner.businessCategory}
                                              </Badge>{' '}
                                            </span>


                                          )}
                                      </div> */}
                                    </Col>
                                    <Col className="text-center" md="4" xs="4">
                                      <br></br>
                                      {partner.businessCategory !== null && (
                                        <span>
                                          {' '}
                                          <Badge variant="primary">
                                            {partner.businessCategory}
                                          </Badge>{' '}
                                        </span>
                                      )}
                                      {/* {!showPublicView && (<Button
                                        className="btn-round btn-icon"
                                        color="success"
                                        outline
                                        size="sm"
                                      >
                                        Select
                                       <i className="fa fa-envelope" /> */}
                                      {/* </Button>)}  */}
                                    </Col>
                                  </Row>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default FollowersTabEoProfile;
