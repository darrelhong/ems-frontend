import React, { useState } from 'react';
import { Fragment } from 'react';
import Link from 'next/link';
import { Col, ProgressBar, Modal, Button, Form, Alert } from 'react-bootstrap';
import { formatDate } from '../../lib/formatDate';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import HidePopover from './HidePopover';
import { vipToggle } from '../../lib/functions/eventOrganiser/eventFunctions';
import { Unstable_TrapFocus } from '@material-ui/core';
import api from '../../lib/ApiClient';

const EventCard = ({ event, deleteCancelEvent, createToast }) => {
  const [currEvent, setCurrEvent] = useState(event);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const closeModal = () => setDeleteModalShow(false);
  const openModal = () => setDeleteModalShow(true);

  const [broadcastModalShow, setBroadcastModalShow] = useState(false);
  const closeBroadcastModal = () => setBroadcastModalShow(false);
  const openBroadcastModal = () => setBroadcastModalShow(true);

  const [confirmBroadcastModalShow, setConfirmBroadcastModalShow] = useState(false);
  const closeConfirmBroadcastModal = () => setConfirmBroadcastModalShow(false);
  const openConfirmBroadcastModal = () => setConfirmBroadcastModalShow(true);
  
  const [showRecipientError, setRecipientError] = useState(false);
  const [showBroadcastError, setBroadcastError] = useState(false);
  const [showBroadcastSuccess, setBroadcastSuccess] = useState(false);

  const handleDeleteCancel = async (currEvent) => {
    await deleteCancelEvent(currEvent);
    closeModal();
  };

  const handleVipToggle = async (currEvent) => {
    let message = '';
    await vipToggle(currEvent).then((updatedEvent) => {
      setCurrEvent(updatedEvent);
      updatedEvent.vip
        ? (message = 'Event is exclusive to VIP members')
        : (message = 'Event open for all!');
      createToast(message, 'success');
    });
  };

  const checkCanDelete = (currEvent) => {
    if (
      (event.eventBoothTransactions?.length == 0 ||
        !event.eventBoothTransactions) &&
      (event.ticketTransactions?.length == 0 || !event.ticketTransactions)
    ) {
      return true;
    }
    return false;
  };

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

  function broadcastNotification(currEvent) {
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
        return "Allbp";
      }
      else if (chkAttendee.checked) {
        return "Allatt";
      }
    }

    let data = {
      subject: broadcastTitle,
      content: broadcastMessage,
      eventId: currEvent.eid,
      broadcastOption: broadcastOption()
    }

    api.post('/api/organiser/broadcastEmailEnquiry', data)
    .then(() => {
      setBroadcastSuccess(true);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <Fragment>
      <Modal show={deleteModalShow} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete An Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {checkCanDelete(currEvent)
            ? 'Are you sure you want to delete this event?'
            : 'Unable to delete this Event. Do you want to cancel this event?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleDeleteCancel(currEvent)}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>

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
              onClick={() => broadcastNotification(currEvent)}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        
        <Modal.Header closeButton>
          <Modal.Title>
            Broadcast Message<br/>
            <h6>{currEvent.name}</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display: "flex", flexDirection: "column", gap: "5px"}} >
          <input
            required
            className="form-control"
            name="broadcastTitle"
            id="broadcastTitle"
            placeholder="Title"
            style={{width: "100%"}}
          />
          <textarea 
            required
            className="form-control"
            name="broadcastMessage"
            id="broadcastMessage"
            placeholder="Type something here..."
            style={{width: "100%", height: "10em"}}
          />
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

      <Col lg={4} sm={6} className="space-mb--50">
        <div className="product-list">
          <div className="product-list__image">
            <Link href={`/organiser/events/${currEvent.eid}`}>
              <a>
                <img src={currEvent.images[0]} alt="event_image" />
              </a>
            </Link>
          </div>

          <div className="product-list__info">
            <span style={{ float: 'right' }}>
              <IconButton
                onClick={() => openBroadcastModal()}
                aria-label="broadcast"
                color="secondary"
              >
                <svg style={{width:"24px", height:"24px"}} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z" />
                </svg>
              </IconButton>
              <IconButton
                onClick={() => openModal()}
                aria-label="delete"
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            </span>

            <h6 className="product-title">
              <Link href={`/organiser/events/${currEvent.eid}`}>
                <a>{currEvent.name}</a>
              </Link>
            </h6>

            <div className="d-flex justify-content-between">
              <div className="product-price">
                <span className="price">
                  {' '}
                  {formatDate(
                    currEvent.eventStartDate,
                    'eee, dd MMM yyyy, hh:mmaa'
                  )}
                </span>
                {/* <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> */}
                {/* <span className="rating-num"> {`Sales End Date: ${formatDate(event.salesEndDate)}`} </span> */}
              </div>
            </div>
            <div className="product-description">{currEvent.descriptions}</div>

            <div>
              <span className="price">
                Ticket Price: ${currEvent.ticketPrice}
              </span>
            </div>

            <div className="d-flex justify-content-between">
              <span className="rating-num">
                {' '}
                {`Date: ${formatDate(currEvent.saleStartDate)} ~ ${formatDate(
                  currEvent.salesEndDate
                )}`}{' '}
              </span>
            </div>

            <div className="product-list__actions">
              <ul>
                {/* <li>
                                    <IconButton aria-label="Hide" color="primary" onClick={publishToggle}>
                                        {event.published ?
                                            (<PublishIcon />) :
                                            (<PublishIcon disabled />)
                                        }
                                    </IconButton>
                                </li> */}

                {/* <li>
                                    <IconButton aria-label="Hide" color="default" onClick={hideToggle}>
                                        {event.hidden ?
                                            (<VisibilityIcon />) :
                                            (<VisibilityOffIcon />)
                                        }
                                    </IconButton>
                                </li> */}

                {/* Handles logic for toggling visibility of events for Business Partners and Attendees */}
                <li>
                  <HidePopover event={currEvent} createToast={createToast} />
                </li>

                <li>
                  <IconButton
                    aria-label="vip"
                    color="secondary"
                    onClick={() => handleVipToggle(currEvent)}
                  >
                    {currEvent.vip ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </li>

                <ProgressBar
                  animated
                  now={60}
                  label="60%"
                  style={{ width: '50%', float: 'right' }}
                />
                {event.ticketCapacity}
              </ul>
            </div>
          </div>
        </div>
      </Col>
    </Fragment>
  );
};

export default EventCard;
