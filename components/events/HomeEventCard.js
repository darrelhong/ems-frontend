import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { IconButton } from '@material-ui/core';
import { attendeeFavouriteEvent } from '../../lib/query/eventApi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useEffect } from 'react';
export default function HomeEventCard({ event, isFavourite }) {

  useEffect(() => {
    var heart = document.getElementById("heart" + event.eid)
    var heartFilled = document.getElementById("heart-filled" + event.eid)
    
    if (isFavourite) {
      heart.style.display = "none";
      heartFilled.style.display = "block";
    }
    else {
      heart.style.display = "block";
      heartFilled.style.display = "none";
    }
  }, [])

  function favouriteEvent() {
    attendeeFavouriteEvent(event.eid).then(() => {
      var heart = document.getElementById("heart" + event.eid)
      var heartFilled = document.getElementById("heart-filled" + event.eid)
      if (heart.style.display == "block") {
        heart.style.display = "none";
        heartFilled.style.display = "block";
      }
      else {
        heart.style.display = "block";
        heartFilled.style.display = "none";
      }
    });
  }

  return (
    <>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={event.images?.[0] || '/assets/images/img-placeholder.jpg'}
          style={{ height: 200 }}
        />
        <Card.Body className="d-flex flex-column">
          {/* <Link href={`/attendee/events/${event.eid}`}> */}
          <Link href={`/partner/events/${event.eid}`}>
            <Card.Title>{event.name}</Card.Title>
          </Link>
          <Card.Text className="text-default mt-auto">
            {format(parseISO(event.eventStartDate), 'eee, dd MMM yy hh:mmbbb')}
          </Card.Text>
          <span style={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <IconButton
              onClick={() => favouriteEvent()}
              aria-label="favourite"
              color="secondary"
            >
              <BsHeart id={"heart" + event.eid} style={{display: "block"}} />
              <BsHeartFill id={"heart-filled" + event.eid} style={{display: "none"}} />
            </IconButton>
          </span>
        </Card.Body>
      </Card>
    </>
  );
}

HomeEventCard.propTypes = {
  event: PropTypes.object,
};
