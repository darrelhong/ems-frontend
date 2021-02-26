import Head from 'next/head';
import Link from 'next/link';
import { Container, Row } from 'react-bootstrap';
import button from 'react-bootstrap/Button'
import { LayoutOne } from '../../layouts';

import HomeHeaderTop from '../../components/Header/HomeHeaderTop';

export default function RegisterVerified() {
  return (
    <>
      <Head>
        <title>Email verification succesful!</title>
      </Head>

      <HomeHeaderTop />
      <LayoutOne> 
          
      <Container>
        <Row className="justify-content-center">
          <p className="mt-5">
            {/* <strong> */}
              Email succesfully verified. Please proceed to login.
            {/* </strong> */}
          </p>
          </Row>
          <Row className="justify-content-center">
            &nbsp;
            <div>
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
            </div>
          </Row>
        
      </Container>
    </LayoutOne>
    </>
  );
}
