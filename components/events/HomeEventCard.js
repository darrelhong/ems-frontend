import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { IconButton } from '@material-ui/core';
import { attendeeFavouriteEvent, getAttendeeFavouriteEvents, getBusinessPartnerFavouriteEvents } from '../../lib/query/eventApi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { partnerLikeEvent, partnerUnlikeEvent } from 'lib/query/events';
export default function HomeEventCard({ user, event, isFavourite, tab, setFavouriteEvents }) {

  useEffect(() => {
    var heart = document.getElementById(tab + "-heart-" + event.eid)
    var heartFilled = document.getElementById(tab + "-heart-filled-" + event.eid)
    
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
    if (user.roles[0].description === "Attendee") {
      attendeeFavouriteEvent(event.eid).then(async () => {
        var hearts = document.getElementsByName("heart-" + event.eid)
        var heartsFilled = document.getElementsByName("heart-filled-" + event.eid)
        for (var i = 0; i < hearts.length; i++) {
          if (hearts[i].style.display == "block") {
            hearts[i].style.display = "none";
            heartsFilled[i].style.display = "block";
          }
          else {
            hearts[i].style.display = "block";
            heartsFilled[i].style.display = "none";
          }
        }
        await setFavouriteEvents(await getAttendeeFavouriteEvents());
      });
    }
    else if (user.roles[0].description === "Business Partner") {
      if (isFavourite) {
        partnerUnlikeEvent(user.id, event.eid).then(async () => {
          var hearts = document.getElementsByName("heart-" + event.eid)
          var heartsFilled = document.getElementsByName("heart-filled-" + event.eid)

          for (var i = 0; i < hearts.length; i++) {
            hearts[i].style.display = "block";
            heartsFilled[i].style.display = "none";
          }
          await setFavouriteEvents(await getBusinessPartnerFavouriteEvents());
        });
      }
      else {
        partnerLikeEvent(user.id, event.eid).then(async () => {
          var hearts = document.getElementsByName("heart-" + event.eid)
          var heartsFilled = document.getElementsByName("heart-filled-" + event.eid)

          for (var i = 0; i < hearts.length; i++) {
            hearts[i].style.display = "none";
            heartsFilled[i].style.display = "block";
          }
          await setFavouriteEvents(await getBusinessPartnerFavouriteEvents());
        });
      }
    } 
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
              <BsHeart 
                id={tab + "-heart-" + event.eid} 
                name={"heart-" + event.eid} 
                style={{display: "block"}} 
              />
              <BsHeartFill 
                id={tab + "-heart-filled-" + event.eid} 
                name={"heart-filled-" + event.eid} 
                style={{display: "none"}} 
              />
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
