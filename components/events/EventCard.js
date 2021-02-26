import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Card } from 'react-bootstrap';

export default function EventCard({ event }) {
  return (
    <Card>
      <Card.Img variant="top" src={event.images?.[0]} style={{ height: 200 }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{event.name}</Card.Title>
        <Card.Text className="line-clamp">{event?.descriptions}</Card.Text>
        <Card.Text className="text-default mt-auto">
          {format(parseISO(event.eventStartDate), 'eee, dd MMM yy hh:mmbbb')}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};
