import PropTypes from 'prop-types';
import { useState } from "react";
import { format, parseISO } from 'date-fns';
import { likeEvent, unlikeEvent } from '../../../lib/query/events'
import { Card } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useFavouriteEventMutation from 'lib/query/useFavouriteEventMutation';
import styles from './EventCard.module.css';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useMutation, useQueryClient } from "react-query";

export default function EventCard({ event, user }) {

  // function inFav(event, user) {
  //   return user.favouriteEventList.some(e => e.eid === event.eid)
  // }

  const queryClient = useQueryClient();
  const [inFav, setinFav] = useState(user?.favouriteEventList.some(e => e.eid === event.eid))
  // const [applied, setApplied] = useState(user?.sellerAppplications.some(e => e.event.eid === event.eid))
  const applied = true

  const toggleLike = async (e) => {
    e.preventDefault()
    if (!inFav) {
      // user?.favouriteEventList.push(event)
      likeEvent(user.id, event.eid)
      // console.log(user.favouriteEventList)
    }
    else {
      unlikeEvent(user.id, event.eid)
    }
    setinFav(!inFav)
    queryClient.invalidateQueries("events")
  }

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
      <Card.Body className="d-flex flex-column">
        {applied && <h1>Test</h1>}
        <Card.Title>{event.name}</Card.Title>
        <Card.Text className="line-clamp">{event?.descriptions}</Card.Text>
        <Card.Text className="text-default mt-auto">
          {format(parseISO(event.eventStartDate), 'eee, dd MMM yy hh:mmbbb')}
          <span style={{ float: 'right' }}>
            <IconButton aria-label="fav" color="secondary"
              onClick={(e) => { toggleLike(e) }}>
              {inFav ?
                (<FavoriteIcon />) :
                (<FavoriteBorderIcon />)
              }
            </IconButton>
          </span>
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
