import { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import api from '../lib/ApiClient';
// import EventEoProfileSliderTen from './ProductSlider/EventEoProfileSliderTen';

const FollowersTabEoProfile = ({ attendees, partners, showPublicView }) => {
  
  const [broadcastModalShow, setBroadcastModalShow] = useState(false);
  const closeBroadcastModal = () => setBroadcastModalShow(false);
  const openBroadcastModal = () => setBroadcastModalShow(true);

  const [confirmBroadcastModalShow, setConfirmBroadcastModalShow] = useState(false);
  const closeConfirmBroadcastModal = () => setConfirmBroadcastModalShow(false);
  const openConfirmBroadcastModal = () => setConfirmBroadcastModalShow(true);
  
  const [showRecipientError, setRecipientError] = useState(false);
  const [showBroadcastError, setBroadcastError] = useState(false);
  const [showBroadcastSuccess, setBroadcastSuccess] = useState(false);

  function proceedBroadcast() {
    let broadcastTitle = document.getElementById("broadcastTitle").value;
    let broadcastMessage = document.getElementById("broadcastMessage").value;
    let chkBusinessPartner = document.getElementById("chkBusinessPartner");
    let chkAttendee = document.getElementById("chkAttendee")

    if (!chkBusinessPartner.checked && !chkAttendee.checked) {
      setRecipientError(true);
    }
    else {
      setRecipientError(false);
    }
    if (broadcastTitle == "" || broadcastMessage == "") {
      setBroadcastError(true);
    }
    else {
      setBroadcastError(false);
    }
    if ((chkBusinessPartner.checked || chkAttendee.checked) &&
      broadcastTitle != "" &&
      broadcastMessage != ""
    ) {
      openConfirmBroadcastModal()
      setRecipientError(false);
      setBroadcastError(false);
    }
  }

  function broadcastNotification() {
    closeConfirmBroadcastModal();

    // get user inputs
    let broadcastTitle = document.getElementById("broadcastTitle").value;
    let broadcastMessage = document.getElementById("broadcastMessage").value;
    let chkBusinessPartner = document.getElementById("chkBusinessPartner");
    let chkAttendee = document.getElementById("chkAttendee")

    let broadcastOption = () => {
      if (chkBusinessPartner.checked && chkAttendee.checked) {
        return "Both";
      }
      else if (chkBusinessPartner.checked) {
        return "AllBpFollowers";
      }
      else if (chkAttendee.checked) {
        return "AllAttFollowers";
      }
    }

    let data = {
      subject: broadcastTitle,
      content: broadcastMessage,
      broadcastOption: broadcastOption()
    }

    api.post('/api/organiser/broadcastEmailToFollowers', data)
    .then(() => {
      setBroadcastSuccess(true);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  if (attendees !== undefined && partners !== undefined) {
    return (
      <div className="product-tab-area space-pb--r70">

        {/* broadcast modal */}
        <Modal show={broadcastModalShow} onHide={closeBroadcastModal} centered>

          {/* confirm broadcast modal */}
          <Modal show={confirmBroadcastModalShow} onHide={closeConfirmBroadcastModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                Confirm Broadcast Message
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to broadcast this message?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeConfirmBroadcastModal}>
                No
              </Button>
              <Button
                variant="primary"
                onClick={() => broadcastNotification()}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          
          <Modal.Header closeButton>
            <Modal.Title>
              Broadcast Message
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{display: "flex", flexDirection: "column", gap: "5px"}} >
            <input
              required
              className="form-control"
              name="broadcastTitle"
              id="broadcastTitle"
              placeholder="Title *"
              style={{width: "100%"}}
            />
            <textarea 
              required
              className="form-control"
              name="broadcastMessage"
              id="broadcastMessage"
              placeholder="Broadcast Message *"
              style={{width: "100%", height: "10em"}}
            />
            <br/>Please select at least one *
            <div style={{display: "flex"}}>
              <div style={{display: "flex", width: "50%"}}>
                <Form.Check id="chkBusinessPartner" />
                <label htmlFor="chkBusinessPartner">
                  All Business Partners
                </label>
              </div>
              <div style={{display: "flex", width: "50%"}}>
                <Form.Check id="chkAttendee" />
                <label htmlFor="chkAttendee">
                  All Attendees
                </label>
              </div>
            </div>
            <Alert
              show={showRecipientError}
              variant="danger"
              onClose={() => setRecipientError(false)}
              dismissible
            >
              No recipients selected.
            </Alert>
            <Alert
              show={showBroadcastError}
              variant="danger"
              onClose={() => setBroadcastError(false)}
              dismissible
            >
              Please fill in all the fields.
            </Alert>
            <Alert
              show={showBroadcastSuccess}
              variant="success"
              onClose={() => setBroadcastSuccess(false)}
              dismissible
            >
              Broadcast sent!
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeBroadcastModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => proceedBroadcast()}
            >
              Proceed
            </Button>
          </Modal.Footer>
        </Modal>
      
        <Container>
          <Tab.Container defaultActiveKey="attendees">
            <Nav
              variant="pills"
              className="product-tab-navigation text-center justify-content-left space-mb--30"
            >
              <Nav.Item>
                <Nav.Link eventKey="attendees">Attendee</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="partners">Partner</Nav.Link>
              </Nav.Item>
            </Nav>
            <button
              className="btn btn-fill-out"
              style={{float: "right", marginTop: "-78px", paddingLeft: "25px", paddingRight: "25px"}}
              onClick={() => openBroadcastModal()}
            >
              Broadcast
            </button>
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
