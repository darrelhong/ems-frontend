import Head from 'next/head';

import Link from 'next/link';
import { Card, Col, Container, Row } from 'react-bootstrap';
import GuestWrapper from '../components/wrapper/GuestWrapper';
export default function Home() {
  return (
    <>
      <GuestWrapper>
        <Head>
          <title>Event Management System</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <LayoutOne> */}

        <Container className="space-mt--40 space-mb--40">
          <h2 className="space-mb--40">Event Management System</h2>

          <Row className="justify-content-center mt-10">
            <Col lg={4} className="mb-3">
              <Card
                style={{ maxWidth: '20em' }}
                className="mx-auto border-danger"
              >
                <Card.Body>
                  <h5>For Event Organisers ➜</h5>
                  <p>Create/host events</p>
                  <div>
                    <Link href="/organiser/login" passHref>
                      <button className="btn btn-border-fill btn-sm">
                        Login
                      </button>
                    </Link>
                    <Link href="/organiser/register" passHref>
                      <button className="btn btn-fill-out btn-sm">
                        Register
                      </button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="mb-3">
              <Card
                style={{ maxWidth: '20em' }}
                className="mx-auto border-success"
              >
                <Card.Body>
                  <h5>For Business Partners ➜</h5>
                  <p>Register for events</p>
                  <div>
                    <Link href="/partner/login">
                      <button className="btn btn-border-fill btn-sm">
                        Login
                      </button>
                    </Link>
                    <Link href="/partner/register">
                      <button className="btn btn-fill-out btn-sm">
                        Register
                      </button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card
                style={{ maxWidth: '20em' }}
                className="mx-auto border-primary"
              >
                <Card.Body>
                  <h5>For Attendees ➜</h5>
                  <p>Buy tickets for events</p>
                  <div>
                    <Link href="/attendee/login">
                      <button className="btn btn-border-fill btn-sm">
                        Login
                      </button>
                    </Link>
                    <Link href="/attendee/register">
                      <button className="btn btn-fill-out btn-sm">
                        Register
                      </button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </GuestWrapper>
      {/* </LayoutOne> */}
    </>
  );
}
