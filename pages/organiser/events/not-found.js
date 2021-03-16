import Head from 'next/head';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import HomeHeaderTop from '../../../components/Header/HomeHeaderTop';

const EventNotFound = () => {
  return (
    <>
      <Head>
        <title>Event Not Found!</title>
      </Head>

      <HomeHeaderTop />

      <Container>
        <Row className="justify-content-center">
          <Col>
            <p className="mt-5 text-center">
              <strong>
                This event has already been deleted. Please continue to look at
                other available events!
              </strong>
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Link href="/" passHref>
            <button className="btn btn-fill-out btn-sm mt-2">
              Back to home
            </button>
          </Link>
        </Row>
      </Container>
    </>
  );
};

export default EventNotFound;
