import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';

export default function TicketCard({ ticket }) {
  return (
    <Card bg="light" border="light" className="h-100">
      <Card.Header>ID: {ticket.id}</Card.Header>
      <Card.Body>
        <Card.Title>{ticket.event.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-dark font-weight-normal">
          Attendee: {ticket.attendee.name}
        </Card.Subtitle>
        <Card.Text className="mb-0">Payment: {ticket.paymentStatus}</Card.Text>
        <Card.Text>
          Purchase Date:{' '}
          {format(parseISO(ticket.dateTimeOrdered), 'dd MMM yyyy')}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

TicketCard.propTypes = {
  ticket: PropTypes.object,
};
