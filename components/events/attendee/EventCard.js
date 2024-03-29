import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Card } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useQueryClient } from 'react-query';

import useFavouriteEventMutation from 'lib/query/useFavouriteEventMutation';

import styles from './EventCard.module.css';
export default function AttendeeEventCard({ event, isPublic }) {
  const queryClient = useQueryClient();
  const { mutate } = useFavouriteEventMutation(queryClient);

  const onFavouriteClick = (e) => {
    e.preventDefault();
    if (!isPublic) {
      mutate(event.eid);
    } else {
      alert('Please login or create and account to save events');
    }
  };

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
        <Card.Title>{event.name}</Card.Title>
        <Card.Text className="line-clamp">{event?.descriptions}</Card.Text>
        <div className="d-flex align-items-baseline mt-auto">
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
        </div>
      </Card.Body>
    </Card>
  );
}

AttendeeEventCard.propTypes = {
  event: PropTypes.object,
  isPublic: PropTypes.bool,
};
