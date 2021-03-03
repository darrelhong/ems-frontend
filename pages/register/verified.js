import Head from 'next/head';
import Link from 'next/link';
import { Container, Row } from 'react-bootstrap';
import button from 'react-bootstrap/Button'
import { LayoutOne } from '../../layouts';
import GuestWrapper from '../../components/wrapper/GuestWrapper';

import HomeHeaderTop from '../../components/Header/HomeHeaderTop';

export default function RegisterVerified() {
  return (
    <>
    <GuestWrapper> 
      <Head>
        <title>Email verification succesful!</title>
      </Head>
      
          
      <Container>
        <Row className="justify-content-center mb-3">
          <p className="mt-5">
            {/* <strong> */}
              Email succesfully verified. Please proceed to login.
            {/* </strong> */}
          </p>
          </Row>
           &nbsp;
            <br></br>
          <Row className="justify-content-center">
           
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
            <Link href="/attendee/login">
              <button className="btn btn-sm btn-fill-out">
                Attendee Login
              </button>
            </Link>s
            </div>
          </Row>
        
      </Container>
    </GuestWrapper>
    </>
  );
}
