import Link from 'next/link';
import { useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';

import { BreadcrumbOne } from '../../../components/Breadcrumb';
import PartnerWrapper from '../../../components/wrapper/PartnerWrapper';
import api from '../../../lib/ApiClient';
import EventCard from '../../../components/events/EventCard';
import CustomPagination from '../../../components/custom/CustomPagination';

const getEvents = async (page = 0) => {
  const { data } = await api.get('/api/event/get-events?page=' + page);
  return data;
};

function PartnerHome() {
  const [page, setPage] = useState(0);
  const { status, data } = useQuery(['events', page], () => getEvents(page));

  return (
    <PartnerWrapper title="Events">
      <BreadcrumbOne pageTitle="View events">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/partner/home">
              <a>Partner Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a>Events</a>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        {status === 'loading' ? (
          <Spinner animation="grow" role="status" aria-hidden="true" />
        ) : status === 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <>
            <Row>
              {data.content.map((event, i) => (
                <Col
                  key={i}
                  sm={6}
                  lg={4}
                  className="mb-5 d-flex align-items-stretch3"
                  as="a"
                >
                  <EventCard event={event} />
                </Col>
              ))}
            </Row>

            <Row>
              <Col className="d-flex align-items-center">
                <CustomPagination
                  number={data?.number}
                  first={data?.first}
                  last={data?.last}
                  totalPages={data?.totalPages}
                  setPage={setPage}
                />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </PartnerWrapper>
  );
}

export default PartnerHome;
