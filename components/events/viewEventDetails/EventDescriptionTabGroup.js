import { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import { Badge } from 'react-bootstrap';
import {
  IoMdCalendar,
  IoMdRestaurant,
  IoMdCash,
  IoMdTrophy,
} from 'react-icons/io';
import TicketingModal from '../../Event/TicketingModal';
import TicketingTab from './DescriptionTabs/TicketingTab';
import BusinessPartnerTab from './DescriptionTabs/BusinessPartnerTab';
import RecommendedPartnersTab from './DescriptionTabs/RecommendedPartnersTab';
import ReviewTab from './DescriptionTabs/ReviewTab';
import { getRecommendedPartners } from 'lib/query/eventApi';

// import { format, parseISO } from 'date-fns';

const EventDescriptionTabGroup = ({
  event,
  setEvent,
  prettySaleStartDate,
  prettySalesEndDate,
  createToast,
  newSellerApplications,
  sellerProfiles,
  eventReviews
}) => {
  const [showModal, setShowModal] = useState(false);
  const [recommendedPartners, setRecommendedPartners] = useState([]);
  const [inviteCount,setInviteCount] = useState(0);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const response = await getRecommendedPartners(event.eid);
        setRecommendedPartners(response);
      } catch(e) {
        console.log("error caught");
      }
    };
    if (event.eid) loadPartners();
  }, [event]);

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
          className="product-content__sort-info space-mb--20">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            {newSellerApplications.length != 0 ? (
              <ul>
                <li
                  style={{
                    color: 'red'
                  }}>
                  <IoMdTrophy />
                  {newSellerApplications.length} {' '}new applications
                </li>
              </ul>
            )
              : (
                <ul>
                  <li>
                    <IoMdTrophy />
                  No new applications
                </li>
                </ul>
              )}
            <ul>
              <Link href={`/organiser/events/applications?eid=${event.eid}`}>
                <button
                  // onClick={() => console.log('hello')}
                  className="btn btn-fill-out btn-addtocart space-ml--10"
                  style={{ textAlign: 'right' }}
                >
                  <i className="icon-basket-loaded" /> Manage Event Booths
               </button>
              </Link>

            </ul>
          </div>
          <ul>
            <li>
              <IoMdTrophy />
              {/* STILL WRONG */}
              Confirmed partners for your event:{' '}
              {/* {event.sellerApplications?.length ?? 0} / {event.boothCapacity} */}
              {sellerProfiles.length ?? 0} / {event.boothCapacity}
              {/* {event.eventBoothTransactions?.length ?? 0} / {event.boothCapacity} */}
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="product-description-tab space-pt--r100 space-pb--50">
      {/* event.name here is dumb but to make sure we load the event before rendering the ticket modal */}
      {event.name && <TicketingModal event={event} setEvent={setEvent} createToast={createToast} showModal={showModal} setShowModal={setShowModal} />}
      <Tab.Container defaultActiveKey="ticketing">
        <Nav
          variant="pills"
          className="product-description-tab__navigation space-mb--50"
        >
          <Nav.Item>
            <Nav.Link eventKey="ticketing">TICKETING</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="businessPartners">BUSINESS PARTNERS {' '}
              {newSellerApplications.length > 0 && (<Badge pill variant="danger">{newSellerApplications.length}</Badge>)}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reviews">
              REVIEWS {event.ratingCount ? `(${event.ratingCount})` : ''}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="recommendedPartners">
              SUGGESTED PARTNERS{' '}
              {recommendedPartners?.length > 0 && (<Badge pill variant="danger">{recommendedPartners.length - inviteCount}</Badge>)}
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="ticketing">
            {event && (
              <TicketingTab
                event={event}
                prettySaleStartDate={prettySaleStartDate}
                prettySalesEndDate={prettySalesEndDate}
                setShowModal={setShowModal} />
            )}
          </Tab.Pane>

          <Tab.Pane eventKey="businessPartners">
            {/* {renderBoothSection()} */}
            <BusinessPartnerTab
              event={event}
              newSellerApplications={newSellerApplications}
              sellerProfiles={sellerProfiles}
            />
          </Tab.Pane>

          <Tab.Pane eventKey="reviews">
            <ReviewTab 
            reviews={eventReviews}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="recommendedPartners">
            {event?.eid && (
              <RecommendedPartnersTab
                eventId={event.eid}
                recommendedPartners={recommendedPartners}
                increaseInviteCount={()=>setInviteCount(inviteCount+1)}
              />
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default EventDescriptionTabGroup;
