import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getAttendeeFavouriteEvents, getBusinessPartnerFavouriteEvents } from '../../lib/query/eventApi';
import useUser from '../../lib/query/useUser';
import HomeEventCard from './HomeEventCard';

export default function HomeEventTab({ events, tab, isGuest }) {
    const { data: user } = isGuest == null ? useUser(localStorage.getItem('userId')) : () => {return null};
    const [favouriteEvents, setFavouriteEvents] = useState([]);

    useEffect(() => {
        if (user != null) {
            if (user.roles[0].description === "Attendee") {
                const getEvent = async () => {
                    const data = await getAttendeeFavouriteEvents();
                    setFavouriteEvents(data);
                };
                getEvent();
            }
            else if (user.roles[0].description === "Business Partner") {
                const getEvent = async () => {
                    const data = await getBusinessPartnerFavouriteEvents();
                    setFavouriteEvents(data);
                };
                getEvent();
            }
        }
    }, [user])

    return(
        <Row>
            {events.map((event) => (
                <Col
                key={event.eid}
                sm={6}
                lg={4}
                className="mb-5 d-flex align-items-stretch"
                >
                {/* <Link href={`/partner/events/${event.eid}`}> */}
                <a className="w-100">
                    <HomeEventCard user={user} event={event} isFavourite={favouriteEvents !== null ? favouriteEvents.some(fEvent => fEvent.eid === event.eid) : null} tab={tab} setFavouriteEvents={setFavouriteEvents} />
                </a>
                {/* </Link> */}
                </Col>
            ))}
        </Row>
    );
}