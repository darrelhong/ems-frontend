import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getAttendeeFavouriteEvents } from '../../lib/query/eventApi';
import HomeEventCard from './HomeEventCard';

export default function HomeEventTab({ events }) {
    const [favouriteEvents, setFavouriteEvents] = useState([]);

    useEffect(() => {
        const getEvent = async () => {
            const data = await getAttendeeFavouriteEvents();
            setFavouriteEvents(data);
        };
        getEvent();
    }, [])

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
                    <HomeEventCard event={event} isFavourite={favouriteEvents.some(fEvent => fEvent.eid === event.eid)} />
                </a>
                {/* </Link> */}
                </Col>
            ))}
        </Row>
    );
}