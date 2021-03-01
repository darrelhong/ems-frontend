import PropTypes from 'prop-types';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';

import api from '../../../lib/ApiClient';

import { BreadcrumbOne } from '../../../components/Breadcrumb';
import PartnerWrapper from '../../../components/wrapper/PartnerWrapper';
import EventImageGallery from '../../../components/events/partner/EventImageGallery';

const getEvent = async (id) => {
  const { data } = await api.get(`/api/event/${id}`);
  return data;
};

const useEvent = (id) => useQuery(['event', id], () => getEvent(id));

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

export default function PartnerEventPage({ id }) {
  const { data, status } = useEvent(id);

  return (
    <PartnerWrapper title={data?.name || 'Event page'}>
      {status === 'loading' ? (
        <Spinner animation="grow" role="status" aria-hidden="true" />
      ) : status === 'error' ? (
        <Alert variant="danger">An error has occured</Alert>
      ) : (
        <>
          <BreadcrumbOne pageTitle="Event">
            <ol className="breadcrumb justify-content-md-end">
              <li className="breadcrumb-item">
                <Link href="/partner/home">
                  <a>Partner Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/partner/events">
                  <a>Events</a>
                </Link>
              </li>
              <li className="breadcrumb-item active">{data.name}</li>
            </ol>
          </BreadcrumbOne>

          <Container className="space-pt--r100 space-pb--r100">
            <Row>
              <Col lg={6}>
                <EventImageGallery images={data.images} />
              </Col>
              <Col lg={6}></Col>
            </Row>
          </Container>
        </>
      )}
    </PartnerWrapper>
  );
}

PartnerEventPage.propTypes = {
  id: PropTypes.number,
};
