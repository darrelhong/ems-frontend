import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
export default function HomeEventCard({ event }) {

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
        </Card.Body>
      </Card>
    </>
  );
}

HomeEventCard.propTypes = {
  event: PropTypes.object,
};
