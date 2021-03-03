import React from 'react';
import EventCard from './EventCard';
import { Row } from 'react-bootstrap';

const EventView = ({ events, layout }) => {
  console.log(events);
  return (
    <div className="shop-products">
      <h1>I am here</h1>
      <Row className={layout}>
        {events &&
          events.map((event) => {
            return <EventCard key={event.eid} event={event} />;
          })}
      </Row>
    </div>
  );
};

export default EventView;
