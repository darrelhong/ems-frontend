import PropTypes from 'prop-types';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

import { BreadcrumbOne } from 'components/Breadcrumb';
import AttendeeWrapper from 'components/wrapper/AttendeeWrapper';

export function getServerSideProps({ query }) {
  return {
    props: {
      ...query,
    },
  };
}

export default function CheckoutError({ eventId, error }) {
  return (
    <AttendeeWrapper title="Checkout failed">
      <BreadcrumbOne pageTitle="Error">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/attendee/home">
              <a>Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        <h5>An error occured during checkout.</h5>
        <p>{error}</p>

        <Link href={`/attendee/events/${eventId || ''}`}>
          <button className="btn btn-fill-out btn-sm">Back to event</button>
        </Link>
      </Container>
    </AttendeeWrapper>
  );
}

CheckoutError.propTypes = {
  eventId: PropTypes.string,
  error: PropTypes.string,
};
