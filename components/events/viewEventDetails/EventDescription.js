import { Fragment, useState } from 'react';
import {
  IoMdWifi,
  IoIosBody,
  IoMdStar, //vip
  IoMdStarOutline,
  IoMdCloudDownload, //publish and unpublish
  IoMdCloudUpload,
  IoMdEye, //hide and unhide
  IoMdEyeOff,
  IoMdCalendar,
  IoMdLocate,
  IoMdCreate,
  IoIosTrash,
} from 'react-icons/io';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ProductRating from '../../Product/ProductRating';
import Link from 'next/link';
import { Modal, Button } from 'react-bootstrap';
import HidePopover from '../../Event/HidePopover';

const EventDescription = ({
  event,
  prettyStartDate,
  prettyEndDate,
  publishToggle,
  hideToggle,
  vipToggle,
  handleCancel,
  handleDelete,
  createToast
}) => {
  
  const [broadcastModalShow, setBroadcastModalShow] = useState(false);
  const closeBroadcastModal = () => setBroadcastModalShow(false);
  const openBroadcastModal = () => setBroadcastModalShow(true);

  const [confirmBroadcastModalShow, setConfirmBroadcastModalShow] = useState(false);
  const closeConfirmBroadcastModal = () => setConfirmBroadcastModalShow(false);
  const openConfirmBroadcastModal = () => setConfirmBroadcastModalShow(true);

  const deleteCancelButton = () => {
    if (event.eventStatus == 'CANCELLED') {
      return (
        <button
          disabled
          className="btn btn-fill-out btn-addtocart space-ml--10"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            pointerEvents: 'none',
          }}
        >
          <i className="icon-basket-loaded" /> Cancelled Event
        </button>
      );
    } else if (event.eventStatus == 'DRAFT') {
      return (
        <button
          onClick={() => handleDelete(event)}
          className="btn btn-fill-out btn-addtocart space-ml--10"
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          <i className="icon-basket-loaded" /> Delete Draft
        </button>
      );
    } else if (
      (event.eventBoothTransactions?.length == 0 || !event.eventBoothTransactions)
      && (event.ticketTransactions?.length == 0 || !event.ticketTransactions)
    ) {
      //in this case we can delete
      return (
        <button
          onClick={() => handleDelete(event)}
          className="btn btn-fill-out btn-addtocart space-ml--10"
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          <i className="icon-basket-loaded" /> Delete Event
        </button>
      );
    } else {
      //only can cancel, cannot delete
      return (
        <button
          onClick={() => handleCancel(event)}
          className="btn btn-fill-out btn-addtocart space-ml--10"
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          <i className="icon-basket-loaded" /> Cancel Event
        </button>
      );
    }
  };

  return (
    <div className="product-content">

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
              onClick={() => handleBroadcastNotification(event)}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        
        <Modal.Header closeButton>
          <Modal.Title>
            Broadcast Message<br/>
            <h6>{event.name}</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea style={{width: "100%", height: "10em"}} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeBroadcastModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => openConfirmBroadcastModal()}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* event name originally here */}
      {/* <h2 className="product-content__title space-mb--10">{event.name}</h2> */}
      <div className="product-content__price-rating-wrapper space-mb--10">
        <h2 className="product-content__title space-mb--10">
          {event.name ? event.name : '(Add event name)'}
        </h2>
        {/* <div className="product-content__price d-flex-align-items-center">
          <span className="price">{prettyStartDate}</span>
        </div> */}

        {/* CONDITIONAL RENDERING CHECK WHETHER EVENT IS COMPLETED THEN SHOW THIS */}
        {/* {event.rating && event.rating == 0 ? ( */}
        <div className="product-content__rating-wrap">
          <div className="product-content__rating">
            <ProductRating ratingValue={event.rating} />
            <span>(0)</span> {/* we hardcode 0 ratings for now */}
          </div>
        </div>
        {/*  ) : (
          ""
         )} */}
      </div>
      <div className="product-content__description space-mb--20">
        <p>
          {event.descriptions
            ? event.descriptions
            : '(Add your event description)'}
        </p>
      </div>

      <div className="product-content__sort-info space-mb--20">
        <ul>
          {event.physical ? (
            <li>
              <IoIosBody />
              Physical Event
            </li>
          ) : (
              <li>
                <IoMdWifi />
              Online Event
              </li>
            )}
          <li>
            <IoMdLocate />
            Event Location:{' '}
            {event.address ? event.address : '(Add Event Location)'}
          </li>
          <li>
            <IoMdCalendar />
            {prettyStartDate
              ? prettyStartDate
              : '(Add Event Start Date)'} to{' '}
            {prettyEndDate ? prettyEndDate : '(Add Event End Date)'}
          </li>
          {/* {event.vip && (
            <li>
              < IoMdStar onClick={vipToggle} />VIP event
            </li>
          )}
          {event.hidden ? (
            <li>
              <IoMdEye title="Unhide your event from attendees!" onClick={hideToggle} />Hidden from attendees
            </li>
          ) : (
              <li>
                <IoMdEyeOff title="Temporarily hide your event from attendees" onClick={hideToggle} />Open for attendees to view!
              </li>
            )}
          {event.published ? (
            <li>
              <IoMdCloudDownload title="Temporarily unpublish your event from business partners!" onClick={publishToggle} />Open for business partners to view!
            </li>
          ) : (
              <li>
                <IoMdCloudUpload title="Publish your event for business partners to see!" onClick={publishToggle} />Event is unpublished, business partners won't find your event
              </li>
            )} */}
        </ul>
      </div>
      <hr />

      <Fragment>
        <div>
          <div
            className="product-content__product-share space-mt--15"
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            {/* <span>Actions:</span> */}
            <ul className="social-icons">
              {/* <li>
                <a href="javascript:void(0);" onClick={() => vipToggle(event)}>
                  {event.vip ? (
                    <IoMdStarOutline title="Unlist event from VIP" />
                  ) :
                    (<IoMdStar title="Make this a VIP-only event!" />)}
                </a>
              </li> */}
              <li>
                <IconButton
                  aria-label="vip"
                  color="secondary"
                  onClick={() => vipToggle(event)}
                >
                  {event.vip ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </li>
              {event.eventStatus && (
                <li>
                  <HidePopover event={event} createToast={createToast}/>
                </li>
              )}
              {/* <li>
                <a href="javascript:void(0);" onClick={() => hideToggle(event)}>
                  {event.hidden ? (
                    <IoMdEye title="Unhide your event from attendees!" />
                  ) : (
                      <IoMdEyeOff title="Temporarily hide your event from attendees" />
                    )}
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" onClick={() => publishToggle(event)}>
                  {event.published ? (
                    <IoMdCloudDownload title="Temporarily unpublish your event from business partners!" />
                  ) : (
                      <IoMdCloudUpload title="Publish your event for business partners to see!" />
                    )}
                </a>
              </li> */}
              <li>
                <Link href={`/organiser/events/create?eid=${event.eid}`}>
                  <a>
                    <IoMdCreate />
                  </a>
                </Link>
              </li>
              <li>
                <IconButton
                  onClick={() => openBroadcastModal()}
                  aria-label="broadcast"
                  color="secondary"
                >
                  <svg style={{width:"20px", height:"20px"}} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z" />
                  </svg>
                </IconButton>
              </li>
            </ul>
            {deleteCancelButton()}
          </div>

          {/* three ugly ass buttons */}
          {/* {event.published ?

            (<button
              onClick={publishToggle}
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              <i className="icon-basket-loaded" /> Unpublish Event
            </button>
          ) : (
            <button
              onClick={publishToggle}
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              <i className="icon-basket-loaded" /> Publish Event
            </button>
          )}

          {event.hidden ? (
            <button
              onClick={hideToggle}
              title="Unhide your event from attendees!"
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              <i className="icon-basket-loaded" /> Unhide Event
            </button>
          ) : (
            <button
              onClick={hideToggle}
              title="Hide your event from attendees from now"
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              <i className="icon-basket-loaded" /> Hide Event
            </button>
          )}

          {event.vip ? (
            <button
              onClick={vipToggle}
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              <i className="icon-basket-loaded" /> Unlist from VIP
            </button>
          ) : (
              <button
                onClick={vipToggle}
                className="btn btn-fill-out btn-addtocart space-ml--10"
              >
                <i className="icon-basket-loaded" /> Make VIP
              </button>
            )
          } */}
        </div>
      </Fragment>
      <hr />
      {/* <div className="product-content__product-share space-mt--15">
        <span>Share:</span>
        <ul className="social-icons">
          <li>
            <a href="#">
              <IoLogoFacebook />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoTwitter />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoGoogleplus />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoYoutube />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoInstagram />
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default EventDescription;
