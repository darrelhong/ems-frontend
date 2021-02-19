import Head from 'next/head';
import Link from 'next/link';
import { Container, Row } from 'react-bootstrap';

import HomeHeaderTop from '../../components/Header/HomeHeaderTop';

export default function RegisterVerified() {
  return (
    <>
      <Head>
        <title>Email verification succesful!</title>
      </Head>

      <HomeHeaderTop />

      <Container>
        <Row className="justify-content-center">
          <p className="mt-5">
            <strong>
              Email succesfully verified. Please proceed to login.
            </strong>
          </p>
          <Row>
            <Link href="/organiser/login">
              <button className="btn btn-sm btn-fill-out">
                Event Organiser Login
              </button>
            </Link>
            <Link href="/partner/login">
              <button className="btn btn-sm btn-fill-out">
                Business Partner Login
              </button>
            </Link>
          </Row>
        </Row>
      </Container>
    </>
  );
}



