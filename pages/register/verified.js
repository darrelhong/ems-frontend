import Head from 'next/head';
import Link from 'next/link';
import { Container, Row } from 'react-bootstrap';
import button from 'react-bootstrap/Button';
import GuestWrapper from '../../components/wrapper/GuestWrapper';

export default function RegisterVerified() {
  return (
    <>
      <GuestWrapper>
        <Head>
          <title>Email verification succesful!</title>
        </Head>

        <Container className="vh-100">
          <Row className="justify-content-center mb-3">
            <p className="mt-5">
              <strong>
                Email succesfully verified. Please proceed to login.
              </strong>
            </p>
          </Row>
          &nbsp;
          <br></br>
          <Row className="justify-content-center">
            <div>
              <Link href="/">
                <button className="btn btn-sm btn-fill-out">
                  Back to Home
                </button>
              </Link>
            </div>
          </Row>
        </Container>
      </GuestWrapper>
    </>
  );
}
