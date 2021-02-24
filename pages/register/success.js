import Head from 'next/head';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';

import HomeHeaderTop from '../../components/Header/HomeHeaderTop';

export default function RegisterSucces() {
  return (
    <>
      <Head>
        <title>Registration succesful!</title>
      </Head>

      <HomeHeaderTop />

      <Container>
        <Row className="justify-content-center">
          <Col>
            <p className="mt-5 text-center">
              <strong>
                You have succesfully registered. Please check your inbox to
                verify your email.
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
}
