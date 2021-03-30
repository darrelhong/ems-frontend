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
import HidePopover from '../../Event/HidePopover';
import DeleteModal from '../../Event/DeleteModal';
import { Badge } from 'react-bootstrap';

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

  const testCategories = ['Computers', 'Legal & Financial', 'Automotive', 'Computers', 'Legal & Financial', 'Automotive', 'Computers', 'Legal & Financial', 'Automotive']
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const closeModal = () => setDeleteModalShow(false);
  const openModal = () => setDeleteModalShow(true);

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
          onClick={() => openModal()}
          // onClick={() => handleDelete(event)}
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
          onClick={() => openModal()}
          // onClick={() => handleDelete(event)}
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
          onClick={() => openModal()}
          // onClick={() => handleCancel(event)}
          className="btn btn-fill-out btn-addtocart space-ml--10"
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          <i className="icon-basket-loaded" /> Cancel Event
        </button>
      );
    }
  };

  const deleteCancelEvent = async () => {
    if (event.eventBoothTransactions?.length == 0 && event.ticketTransactions?.length == 0) {
      await handleDelete(event);
    } else {
      await handleCancel(event);
    }
  };


  return (
    <div className="product-content">
      <DeleteModal
        currEvent={event}
        deleteModalShow={deleteModalShow}
        setDeleteModalShow={setDeleteModalShow}
        closeModal={closeModal}
        openModal={openModal}
        deleteCancelEvent={deleteCancelEvent}
      />

      {/* event name originally here */}
      {/* <h2 className="product-content__title space-mb--10">{event.name}</h2> */}
      <div className="product-content__price-rating-wrapper space-mb--10">
        <h2 className="product-content__title space-mb--10">
          {event.name ? event.name : '(Add event name)'}
        </h2>

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
          <div style={{
            marginTop: '5%'
          }}>
            <p>Event Categories:</p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                overflow:'auto',
                flexWrap:'wrap'
              }}>
              {/* {testCategories.map((category) => ( */}
                {event?.categories && event.categories.map((category) => (
                <text
                  style={{
                    borderStyle: 'solid',
                    borderColor: '#c9c9c9',
                    backgroundColor: '#c9c9c9',
                    color: 'blue',
                    borderRadius: 10,
                    marginRight: '5%',
                    marginTop:'2%',
                    whiteSpace:'initial',
                    // display:'block'
                  }}>{category}</text>
                  // <span>
                  //       {' '}
                  //       <Badge variant="primary">
                  //         {category}
                  //       </Badge>{' '}
                  //     </span>
              ))}
            </div>
          </div>
        </ul>
      </div>
      <hr />

      <Fragment>
        <div>
          <div
            className="product-content__product-share space-mt--15"
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <ul className="social-icons">
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
                  <HidePopover event={event} createToast={createToast} />
                </li>
              )}
              <li>
                <Link href={`/organiser/events/create?eid=${event.eid}`}>
                  <a>
                    <IoMdCreate />
                  </a>
                </Link>
              </li>
            </ul>
            {deleteCancelButton()}
          </div>
        </div>
      </Fragment>
      <hr />
    </div>
  );
};

export default EventDescription;
