import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import {
  partnerLikeEvent,
  partnerUnlikeEvent,
} from '../../../lib/query/events';
import { Card, Badge, Button, Modal } from 'react-bootstrap';
import useFavouriteEventMutation from 'lib/query/useFavouriteEventMutation';
import styles from './EventCard.module.css';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useMutation, useQueryClient } from 'react-query';
import { attendeeFavouriteEvent, retrieveLastReview } from 'lib/query/eventApi';
import Box from '@material-ui/core/Box';
import RegisterModal from 'components/events/registration/RegisterModal';
import { useToasts } from 'react-toast-notifications';
import { getBoothTotalFromEvent } from 'lib/functions/boothFunctions';
import { getSellerApplicationsFromBpId } from 'lib/query/sellerApplicationApi';

// from wj side
import api from 'lib/ApiClient';
import { store } from 'react-notifications-component';
import Rating from "react-rating";
import { FaStar, FaRegStar } from 'react-icons/fa';
import {
  AiOutlineNotification,
} from 'react-icons/ai';

export default function EventCard({ event, user }) {
  // function inFav(event, user) {
  //   return user.favouriteEventList.some(e => e.eid === event.eid)
  // }

  const queryClient = useQueryClient();
  const [inFav, setinFav] = useState(user?.favouriteEventList.some(e => e.eid === event.eid))
  const [applied, setApplied] = useState(user?.sellerApplications.some(e => e.event.eid === event.eid))
  const isPendingApproval = user?.sellerApplications.filter(sa => sa.sellerApplicationStatus === "PENDING").some(e => e.event.eid === event.eid)
  const isPast = user?.sellerProfiles.filter(sp => parseISO(sp.event.eventEndDate) < new Date()).some(e => e.event.eid === event.eid)
  const isConfirmed = user?.sellerApplications.filter(sa => sa.sellerApplicationStatus === "CONFIRMED").some(e => e.event.eid === event.eid)
  const isRejected = user?.sellerApplications.filter(sa => sa.sellerApplicationStatus === "REJECTED").some(e => e.event.eid === event.eid)
  const [badgeStatus, setBadgeStatus] = useState("")
  const [badgeStyle, setBadgeStyle] = useState("primary")
  const isAllocated = user?.sellerApplications.filter(sa => (sa.paymentStatus === "PENDING" && sa.sellerApplicationStatus === "APPROVED")).some(e => e.event.eid === event.eid)
  const [needPay, setNeedPay] = useState(isAllocated && user?.sellerApplications.filter(sa => (sa.paymentStatus === "PENDING" && sa.sellerApplicationStatus === "APPROVED" && sa.boothQuantity > 0)).some(e => e.event.eid === event.eid))
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [boothTotal, setBoothTotal] = useState(0);
  const [applicationMade, setApplicationMade] = useState();
  const { addToast, removeToast } = useToasts();

  // from wj side
  const [errorMessage, setErrorMessage] = useState('')
  const [reviewModalShow, setReviewModalShow] = useState(false);
  const closeReviewModal = () => { setReviewModalShow(false); setRating(0); setErrorMessage("null"); setMessage(""); }
  const openReviewModal = () => setReviewModalShow(true);
  const role = user?.roles[0].roleEnum;
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [confirmReviewModalShow, setConfirmReviewModalShow] = useState(false);
  const disabledStatuses = ["Pending", "Pending Payment", "Waiting For Allocation", "Pending Approval", "Confirm", "Rejected"]
  // const closeConfirmReviewModal = () => { setConfirmReviewModalShow(false); setReviewModalShow(true); }
  // const openConfirmReviewModal = () => {
  //   if (message === "") {
  //     setErrorMessage("Please ensure that all fields are filled.");

  //   } else {
  //     setErrorMessage("null");
  //     setConfirmReviewModalShow(true);
  //     setReviewModalShow(false);
  //   }
  // }
  // console.log(event);
  // console.log(user);
  const handleMessage = (e) => {
    setMessage(e.target.value);
    // console.log(e.target.value + "message");
  };
  const mutateCreateReview = useMutation((data) =>
    api
      .post('/api/review/create', data)
      .then((response) => {
        // setMessage('');
        // setRating(0);
        console.log("review submitted successfully");
        setReviewModalShow(false);
        store.addNotification({
          title: "Success",
          message: "Thank you. Your reviews have been submitted!",
          type: "success",
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      })
      .catch((error) => {
        console.log("Is it working?")
        console.log(error);
      })
  );
  const createReview = async () => {
    if (role == "BIZPTNR") {
      mutateCreateReview.mutate({
        rating: rating,
        partnerId: user.id,
        eventId: event.eid,
        review: message,
      });
    } else if (role == "ATND") {
      mutateCreateReview.mutate({
        rating: rating,
        attendeeId: user.id,
        eventId: event.eid,
        review: message,
      });
    }
  };

  const clickRating = (rate) => {
    setRating(rate)
    openReviewModal()
  }

  // console.log("Past: ", isPast)
  useEffect(() => {
    const loadBoothTotal = async () => {
      // const total = await getBoothTotalFromEvent(event?.eid);
      // setBoothTotal(total);
      setBoothTotal(1)
    }
    const loadApplications = async () => {
      if (user != null) {
        let applications = await getSellerApplicationsFromBpId(user?.id);
        applications = applications.filter(function (application) {
          return application?.event?.eid == event.eid;
          //added filtering done on the backend side 
          // return application?.event?.eid == id && application.sellerApplicationStatus != 'CANCELLED';
        });
        if (applications?.length == 1) {
          setApplicationMade(applications[0]);
        }
      }
    }

    const loadLatestReview = async () => {
      let latestReview = await retrieveLastReview(event.eid, user?.id);
      if (latestReview.rating != null) {
        setMessage(latestReview.reviewText)
        setRating(latestReview.rating)
      }
      else {
        setMessage("")
        setRating(0)
      }
    }

    loadLatestReview()
    loadBoothTotal()
    if (user != null) {
      loadApplications()
    }
    getBadge()
  }, [user])

  // console.log(message)
  // console.log(rating)

  const applyEvent = (e) => {
    e.preventDefault();
    e.stopPropagation()
    setShowRegisterModal(true);
  }

  const toggleLike = async (e) => {
    e.preventDefault();
    if (!inFav) {
      if (user.roles[0].description === 'Business Partner') {
        // user?.favouriteEventList.push(event)
        partnerLikeEvent(user.id, event.eid);
        // console.log(user.favouriteEventList)
      } else if (user.roles[0].description === 'Attendee') {
        attendeeFavouriteEvent(event.eid);
      }
    } else {
      if (user.roles[0].description === 'Business Partner') {
        partnerUnlikeEvent(user.id, event.eid);
      } else if (user.roles[0].description === 'Attendee') {
        attendeeFavouriteEvent(event.eid);
      }
    }
    setinFav(!inFav);
    queryClient.invalidateQueries('events');
  };

  const createToast = (message, appearanceStyle) => {
    const toastId = addToast(message, { appearance: appearanceStyle });
    setTimeout(() => removeToast(toastId), 3000);
  };

  const getBadge = () => {
    let status = '';
    if (applied) status = 'Pending';
    if (needPay) status = 'Pending Payment';
    else if (isAllocated) status = 'Waiting For Allocation';
    else if (isPendingApproval) status = 'Pending Approval';

    if (isConfirmed) status = 'Confirmed';
    if (isPast) status = 'Past';
    if (isRejected) status = 'Rejected';

    switch (status) {
      case '':
        setBadgeStyle('secondary');
        break;
      case 'Pending':
      case 'Pending Approval':
        setBadgeStyle('primary');
        break;
      case 'Waiting For Allocation':
        setBadgeStyle('info');
        break;
      case 'Pending Payment':
        setBadgeStyle('warning');
        break;
      case 'Confirmed':
        setBadgeStyle('success');
        break;
      case 'Past':
        setBadgeStyle('dark');
        break;
      case 'Rejected':
        setBadgeStyle('light');
    }
    setBadgeStatus(status);
  };

  // const { mutateAsync } = useMutation(toggleLike)

  // export default function EventCard({ event, isPublic }) {
  //   const queryClient = useQueryClient();
  //   const { mutate } = useFavouriteEventMutation(queryClient);

  //   const onFavouriteClick = (e) => {
  //     e.preventDefault();
  //     if (!isPublic) {
  //       mutate(event.eid);
  //     } else {
  //       alert('Please login or create and account to save events');
  //     }
  //   };

  return (
    <div>
      {/* From wj side */}
      {/* <Modal show={confirmReviewModalShow} onHide={closeConfirmReviewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Confirm Review/Rating
      </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="product-content__rating-wrap">
            <div className="product-content__rating">
              <Rating
               emptySymbol= {<FaRegStar className="yellow"/>}
                fullSymbol= {<FaStar className="yellow" />}
                readonly
                initialRating={rating}
              />
            </div>
          </div>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmReviewModal}>
            No
           
      </Button>
          <button
            variant="primary"
            className="btn btn-fill-out "
          onClick={createReview}
          >
            Yes
      </button>
        </Modal.Footer>
      </Modal> */}

      <Modal show={reviewModalShow} onHide={closeReviewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Review/Rating
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "column", gap: "5px" }} >
          <div className="product-content__rating-wrap">
            <div className="product-content__rating">
              <Rating
                emptySymbol={<FaRegStar className="yellow" />}
                fullSymbol={<FaStar className="yellow" />}

                initialRating={rating}
                onClick={rate => setRating(rate)}
              />
            </div>
          </div>
          <textarea
            required
            className="form-control"
            name="reviewMessage"
            id="reviewMessage"
            placeholder="Type your review here..."
            style={{ width: "100%", height: "10em" }}
            onChange={handleMessage}
          />
          <div className="error">
            {errorMessage != "null" && <span>{errorMessage}</span>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeReviewModal}>
            Close
          </Button>
          <button
            variant="primary"
            className="btn btn-fill-out"
            onClick={createReview}
          >
            Proceed
          </button>
        </Modal.Footer>
      </Modal>

      <Card
        className={`h-100 ${styles.eventCard}`}
        style={{
          transition: 'all 0.3s ease',
          ':hover': {
            boxShadow: '2px 1px 8px -3px rgb(0 0 0 / 30%)',
          },
        }}
      >
        <RegisterModal
          showRegisterModal={showRegisterModal}
          closeRegisterModal={() => { setShowRegisterModal(false) }}
          event={event}
          boothTotal={boothTotal}
          bpId={user.id}
          createToast={createToast}
          setApplicationMade={setApplicationMade}
          applicationMade={applicationMade}
        />
        <Link href={`/partner/events/${event.eid}`}>
          <Card.Img
            variant="top"
            src={event.images?.[0] || '/assets/images/img-placeholder.jpg'}
            style={{ height: 200 }}
          />
        </Link>
        <Badge
          pill
          variant={badgeStyle}
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
          }}
        >
          {badgeStatus}
        </Badge>
        <Card.Body className="d-flex flex-column">
          <Link href={`/partner/events/${event.eid}`}>
            <Card.Title>{event.name}</Card.Title>
          </Link>
          <Card.Text className="line-clamp">{event?.descriptions}</Card.Text>
          <Card.Text className="text-default mt-auto">
            {format(parseISO(event.eventStartDate), 'eee, dd MMM yy hh:mmbbb')}
            <div>
              <span style={{ float: 'right' }}>
                <IconButton
                  aria-label="fav"
                  color="secondary"
                  onClick={(e) => {
                    toggleLike(e);
                  }}
                >
                  {inFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </span>
              <span style={{ float: 'left' }}>
                {badgeStatus == "" && <Button size="sm" onClick={(e) => applyEvent(e)} variant="danger">Apply</Button>}
                {/* {badgeStatus == "Confirmed" && <Button size="sm" variant="danger" disabled="true">Apply</Button>}
                {badgeStatus == "Pending Payment" && <Button size="sm" variant="danger" disabled="true">Apply</Button>} */}
                {badgeStatus in disabledStatuses && <Button size="sm" variant="danger" disabled="true">Apply</Button>}
                {/* {badgeStatus == "Past" && <Button size="sm" onClick={() => openReviewModal()} variant="danger">Rate</Button>} */}
                {badgeStatus == "Past" && <Rating emptySymbol={<FaRegStar className="yellow" />} fullSymbol={<FaStar className="yellow" />} initialRating={rating} onClick={(rate) => clickRating(rate)} />}
              </span>
            </div>

          </Card.Text>
          {/* <div className="d-flex align-items-baseline mt-auto">
          <Card.Text className="text-default mb-0">
            {format(parseISO(event.eventStartDate), 'eee, dd MMM yy hh:mmbbb')}
          </Card.Text>
          {event.isFavourite ? (
            <FaHeart
              className="ml-auto"
              color="#e83e8c"
              onClick={onFavouriteClick}
            />
          ) : (
            <FaRegHeart
              className="ml-auto"
              color="black"
              onClick={onFavouriteClick}
            />
          )}
        </div> */}
        </Card.Body>
      </Card>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
  isPublic: PropTypes.bool,
  user: PropTypes.object,
};
