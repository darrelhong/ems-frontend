import PropTypes from 'prop-types';
import Link from 'next/link';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import {
  IoMdCalendar,
  IoMdRestaurant,
  IoMdCash,
  IoMdTrophy,
} from 'react-icons/io';
import TicketingModal from '../../Event/TicketingModal';

// import { format, parseISO } from 'date-fns';

const EventDescriptionTab = ({
  event,
  setEvent,
  prettySaleStartDate,
  prettySalesEndDate,
  createToast,
}) => {
  const [showModal, setShowModal] = useState(false);

  const renderBoothSection = () => {
    if (event.boothCapacity == 0) {
      //booth capacity not set or left at 0, just say no booth capacity was set, zero button
      return (
        <div
          className="product-description-tab__details"
          style={{ textAlign: 'center' }}
        >
          Booth capacity not set yet !
        </div>
      );
    } else if (event.eventStatus == 'DRAFT') {
      //this case we just show the booth capacity set, no transaction count or button
      return (
        <li>
          <IoMdRestaurant />{' '}
          {event.ticketCapacity
            ? `Tickets Capacity: ${event.ticketCapacity}`
            : 'Ticket Capacity not set yet!'}
        </li>
      );
    } else {
      //render the normal page with count, capacity and button
      return (
        <div
          className="product-content__sort-info space-mb--20"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <ul>
            <li>
              <IoMdTrophy />
              Confirmed booths for your event:{' '}
              {event.eventBoothTransactions?.length ?? 0} /{' '}
              {event.boothCapacity}
            </li>
          </ul>
          <ul>
            <button
              onClick={() => console.log('hello')}
              className="btn btn-fill-out btn-addtocart space-ml--10"
              style={{ textAlign: 'right' }}
            >
              <i className="icon-basket-loaded" /> Manage Event Booths
            </button>
          </ul>
        </div>
      );
    }
  };

  const renderTicketingSection = () => (
    <div
      className="product-content__sort-info space-mb--20"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      {event && event.sellingTicket ? (
        <div>
          <ul>
            <li>
              <IoMdCash /> Ticket Price:{' '}
              {event.ticketPrice ? '$' + event.ticketPrice : 'Not set yet'}
            </li>
            <li>
              <IoMdRestaurant />
              {event.ticketCapacity
                ? `Tickets Sold: ${event?.ticketTransactions?.length ?? 0} / ${
                    event.ticketCapacity
                  }`
                : 'Ticket Capacity not set yet!'}
            </li>
            <li>
              <IoMdCalendar /> Ticket Sale Start Date:{' '}
              {prettySaleStartDate ? prettySaleStartDate : 'Not set yet'}
              {/* <IoMdLocate />{format(parseISO(event.eventStartDate), 'eee, dd MMM yy hh:mmbbb')} */}
            </li>
            <li>
              <IoMdCalendar /> Ticket Sale End Date:{' '}
              {prettySalesEndDate ? prettySalesEndDate : 'Not set yet'}
            </li>
          </ul>
        </div>
      ) : (
        <ul>
          <li>
            <IoMdCash />
            No Ticket Sales for this event!
          </li>
        </ul>
      )}
      <ul>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-fill-out btn-sm btn-addtocart space-ml--10"
          style={{ textAlign: 'right' }}
        >
          <i className="icon-basket-loaded" />{' '}
          {event.sellingTicket
            ? 'Manage ticketing details'
            : 'Activate Ticket Sales'}
        </button>

        <br></br>
        <br></br>

        <Link href={`${event.eid}/ticketing`} passHref>
          <button className="btn btn-fill-out btn-sm space-ml--10">
            View tickets sold
          </button>
        </Link>
      </ul>
    </div>
  );

  return (
    <div className="product-description-tab space-pt--r100 space-pb--50">
      {/* event.name here is dumb but to make sure we load the event before rendering the ticket modal */}
      {event.name && (
        <TicketingModal
          event={event}
          setEvent={setEvent}
          createToast={createToast}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <Tab.Container defaultActiveKey="ticketing">
        <Nav
          variant="pills"
          className="product-description-tab__navigation space-mb--50"
        >
          <Nav.Item>
            <Nav.Link eventKey="ticketing">TICKETING</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="businessPartners">BUSINESS PARTNERS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reviews">
              REVIEWS {event.ratingCount ? `(${event.ratingCount})` : ''}
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="ticketing">{renderTicketingSection()}</Tab.Pane>

          <Tab.Pane eventKey="businessPartners">
            {renderBoothSection()}
          </Tab.Pane>

          <Tab.Pane eventKey="reviews">
            <div
              className="product-description-tab__details"
              style={{ textAlign: 'center' }}
            >
              No reviews yet!
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

EventDescriptionTab.propTypes = {
  event: PropTypes.object,
};

export default EventDescriptionTab;
