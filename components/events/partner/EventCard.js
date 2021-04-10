import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';
import { partnerLikeEvent, partnerUnlikeEvent } from '../../../lib/query/events'
import { Card, Badge, Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useFavouriteEventMutation from 'lib/query/useFavouriteEventMutation';
import styles from './EventCard.module.css';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useMutation, useQueryClient } from "react-query";
import { attendeeFavouriteEvent } from 'lib/query/eventApi';
import Box from '@material-ui/core/Box';

export default function EventCard({ event, user }) {

  // function inFav(event, user) {
  //   return user.favouriteEventList.some(e => e.eid === event.eid)
  // }

  const queryClient = useQueryClient();
  const [inFav, setinFav] = useState(user?.favouriteEventList.some(e => e.eid === event.eid))
  const [applied, setApplied] = useState(user?.sellerApplications.some(e => e.event.eid === event.eid))
  const [needPay, setNeedPay] = useState(user?.sellerApplications.filter(sa => sa.paymentStatus === "PENDING").some(e => e.event.eid === event.eid))
  const isPast = user?.sellerProfiles.filter(sp => parseISO(sp.event.eventEndDate) < new Date()).some(e => e.event.eid === event.eid)
  const isConfirmed = user?.sellerApplications.filter(sa => sa.sellerApplicationStatus === "CONFIRMED").some(e => e.event.eid === event.eid)
  const isRejected = user?.sellerApplications.filter(sa => sa.sellerApplicationStatus === "REJECTED").some(e => e.event.eid === event.eid)
  const [badgeStatus, setBadgeStatus] = useState("")
  const [badgeStyle, setBadgeStyle] = useState("primary")
  // console.log(user?.sellerApplications.filter(sa => sa.paymentStatus === "PENDING"))

  // console.log("Past: ", isPast)
  useEffect(() => {
    getVariant()
  }, [user])

  const toggleLike = async (e) => {
    e.preventDefault();
    if (!inFav) {
      if (user.roles[0].description === 'Business Partner') {
        // user?.favouriteEventList.push(event)
        partnerLikeEvent(user.id, event.eid);
        // console.log(user.favouriteEventList)
      }
      else if (user.roles[0].description === 'Attendee') {
        attendeeFavouriteEvent(event.eid);
      }
    }
    else {
      if (user.roles[0].description === 'Business Partner') {
        partnerUnlikeEvent(user.id, event.eid);
      }
      else if (user.roles[0].description === 'Attendee') {
        attendeeFavouriteEvent(event.eid);
      }
    }
    setinFav(!inFav)
    queryClient.invalidateQueries("events")
  }

  const getVariant = () => {
    let ind = "light"
    if (isConfirmed) ind = "success";
    else if (needPay) ind = "warning";
    else if (isRejected) ind = "secondary";
    else if (applied) ind = "primary";
    else ind = "light"

    if (isPast) ind = "dark"

    switch (ind) {
      case "success":
        setBadgeStatus("Confirmed")
        break;
      case "warning":
        setBadgeStatus("To pay")
        break;
      case "primary":
        setBadgeStatus("Applied")
        break;
      case "secondary":
        setBadgeStatus("Rejected")
        break;
      case "light":
        setBadgeStatus("")
        break;
      case "dark":
        setBadgeStatus("Past")
    }
    setBadgeStyle(ind)
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
    <Card
      className={`h-100 ${styles.eventCard}`}
      style={{
        transition: 'all 0.3s ease',
        ':hover': {
          boxShadow: '2px 1px 8px -3px rgb(0 0 0 / 30%)',
        },
      }}
    >
      <Card.Img
        variant="top"
        src={event.images?.[0] || '/assets/images/img-placeholder.jpg'}
        style={{ height: 200 }}
      />
      <Badge
        pill
        variant={badgeStyle}
        style={{
          position: 'absolute',
          top: 5,
          right: 5
        }}
      >
        {badgeStatus}
      </Badge>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{event.name}</Card.Title>
        <Card.Text className="line-clamp">{event?.descriptions}</Card.Text>
        <Card.Text className="text-default mt-auto">
          {format(parseISO(event.eventStartDate), 'eee, dd MMM yy hh:mmbbb')}
          <div>
            <span style={{ float: 'right' }}>
              <IconButton aria-label="fav" color="secondary"
                onClick={(e) => { toggleLike(e) }}>
                {inFav ?
                  (<FavoriteIcon />) :
                  (<FavoriteBorderIcon />)
                }
              </IconButton>
            </span>
            <span style={{ float: 'left' }}>
              {badgeStatus == "Confirmed" && <Button size="sm" variant="danger" disabled="true">Apply</Button>}
              {badgeStatus == "" && <Button size="sm" variant="danger">Apply</Button>}
              {badgeStatus == "To pay" && <Button size="sm" variant="danger">Pay</Button>}
              {badgeStatus == "Past" && <Button size="sm" variant="danger">Rate</Button>}
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
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
  isPublic: PropTypes.bool,
};
