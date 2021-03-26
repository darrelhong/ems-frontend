import Link from 'next/link';
import { Alert, Container, ListGroup } from 'react-bootstrap';

import useAttendeeFavouriteEvents from 'lib/query/useAttendeeFavouriteEvents';

import { BreadcrumbOne } from 'components/Breadcrumb';
import CenterSpinner from 'components/custom/CenterSpinner';
import AttendeeWrapper from 'components/wrapper/AttendeeWrapper';

export default function AttendeeFavouriteEvents() {
  const { data, status } = useAttendeeFavouriteEvents();
  return (
    <AttendeeWrapper title="Favourite Events">
      <BreadcrumbOne pageTitle="Favourites">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/attendee/home">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Favourite events</li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        {status === 'loading' ? (
          <CenterSpinner />
        ) : status === 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <ListGroup variant="flush">
            {data.map(({ eid, name, descriptions }) => (
              <ListGroup.Item key={eid} action>
                <Link href={`/attendee/events/${eid}`}>
                  <a className="w-100 justify-content-between">
                    <div
                      className="mb-1 font-weight-bold"
                      style={{ fontSize: 20 }}
                    >
                      {name}
                    </div>
                    <div className="text-truncate  text-muted">
                      {descriptions}
                    </div>
                  </a>
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
    </AttendeeWrapper>
  );
}
