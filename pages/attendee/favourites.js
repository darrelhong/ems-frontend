import Link from 'next/link';
import { Alert, Container, ListGroup } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { useQueryClient } from 'react-query';

import useAttendeeFavouriteEvents from 'lib/query/useAttendeeFavouriteEvents';
import useFavouriteEventMutation from 'lib/query/useFavouriteEventMutation';

import { BreadcrumbOne } from 'components/Breadcrumb';
import CenterSpinner from 'components/custom/CenterSpinner';
import AttendeeWrapper from 'components/wrapper/AttendeeWrapper';

export default function AttendeeFavouriteEvents() {
  const queryClient = useQueryClient();
  const { data, status } = useAttendeeFavouriteEvents();
  const { mutate } = useFavouriteEventMutation(queryClient);

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
              <ListGroup.Item
                key={eid}
                action
                className="d-flex justify-content-between align-items-center"
              >
                <Link href={`/attendee/events/${eid}`}>
                  <a className="w-75 ">
                    <div>
                      <div
                        className="mb-1 font-weight-bold"
                        style={{ fontSize: 20 }}
                      >
                        {name}
                      </div>
                      <div className="text-truncate text-muted">
                        {descriptions}
                      </div>
                    </div>
                  </a>
                </Link>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    mutate(eid);
                  }}
                >
                  <FaHeart className="ml-3" />
                  <p>
                    <small>remove</small>
                  </p>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
    </AttendeeWrapper>
  );
}
