import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Card, Button, Modal } from 'react-bootstrap';
import Link from 'next/link';
import Rating from "react-rating";
import { getUser } from '../../../lib/query/getUser';

import { ProductRating } from '../../Product';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { useState, useEffect } from 'react';
import api from '../../../lib/ApiClient';

import { store } from 'react-notifications-component';
import {
  AiOutlineNotification,
} from 'react-icons/ai';
export default function EventCard({ event }) {

  const [reviewModalShow, setReviewModalShow] = useState(false);
  const closeReviewModal = () => {setReviewModalShow(false); setRating(0);}
  const openReviewModal = () => setReviewModalShow(true);

  const [confirmReviewModalShow, setConfirmReviewModalShow] = useState(false);
  const closeConfirmReviewModal = () => { setConfirmReviewModalShow(false); setReviewModalShow(true);}
  const openConfirmReviewModal = () => { setConfirmReviewModalShow(true); setReviewModalShow(false); }
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);

    const[user, setUser] = useState();
    const[role, setRole] = useState('');


  const handleMessage = (e) => {
    setMessage(e.target.value);
    console.log(e.target.value + "message");

  };


  const mutateCreateReview = useMutation((data) => 
    api 
      .post('/api/review/create', data)
      .then ((response) => {
        setMessage('');
        setRating(0);
        console.log("success");
        closeConfirmReviewModal();
        closeReviewModal();  
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
        console.log(error);
      })
  
  );


  
  const createReview = async () => {
    if(role == "partner"){
      mutateCreateReview.mutate({
        rating : rating,
        partnerId: user,
        eventId: event.eid,
        review : message,
      });
    }else if(role=="attendee"){
      mutateCreateReview.mutate({
        rating : rating,
        attendeeId: user,
        eventId: event.eid,
        review : message,
      });
    }
      
    
  };

  
  useEffect(() => {
    const getUserData = async () => {
      await getUser(localStorage.getItem('userId')).then((data) => {
        if (data.roles[0].roleEnum === 'BIZPTNR') {
          setRole('partner');
          setUser(data?.id);
        } else if(data.roles[0].roleEnum === 'ATND'){
          setRole('attendee');
          setUser(data?.id);
        }
        
      });
    };
    getUserData();
   

  }, [])



  return (
    <>
    
      <Modal show={confirmReviewModalShow} onHide={closeConfirmReviewModal} centered>
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
          <Button
            variant="primary"
          onClick={createReview}
          >
            Yes
      </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={reviewModalShow} onHide={closeReviewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Review/Rating
    </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "column", gap: "5px" }} >
          {/* <input
      required
      className="form-control"
      name="broadcastTitle"
      id="broadcastTitle"
      placeholder="Title"
      style={{ width: "100%" }}
      
    /> */}
          <div className="product-content__rating-wrap">
            <div className="product-content__rating">
              <Rating
               emptySymbol= {<FaRegStar className="yellow"/>}
                fullSymbol= {<FaStar className="yellow" />}
               
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
          {/* <div style={{ display: "flex" }}>
      
    
    </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeReviewModal}>
            Close
    </Button>
          <Button
            variant="primary"
            onClick={() => openConfirmReviewModal()}
          >
            Proceed
    </Button>
        </Modal.Footer>
      </Modal>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={event.images?.[0] || '/assets/images/img-placeholder.jpg'}
          style={{ height: 200 }}
        />
        <Card.Body className="d-flex flex-column">
          <Link href={`/partner/events/${event.eid}`}>
            <Card.Title>{event.name}</Card.Title>
          </Link>
          <Card.Text className="line-clamp">{event?.descriptions}</Card.Text>
          <Card.Text className="text-default mt-auto">
            {format(parseISO(event.eventStartDate), 'eee, dd MMM yy hh:mmbbb')}
          </Card.Text>
          <Card.Text>
            {' '}
            <button
              className="btn btn-outline-primary btn-sm"
              type="button"
              onClick={() => openReviewModal()}
            >
              {' '}
              Add Review{' '}
            </button>
          </Card.Text>
        </Card.Body>

      </Card>
    </>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};
