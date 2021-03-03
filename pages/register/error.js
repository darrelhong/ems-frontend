import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useState} from 'react';
import HomeHeaderTop from '../../components/Header/HomeHeaderTop';
// import { LayoutOne } from '../../layouts';
import { Container, Row, Alert } from 'react-bootstrap';
import GuestWrapper from '../../components/wrapper/GuestWrapper';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';
import { useMutation } from 'react-query';
import api from '../../lib/ApiClient';

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      token: query?.token ?? '',
    },
  };
};

export default function RegisterVerificationError({ token }) {
  const { mutate, isLoading, isError, isSuccess } = useMutation(({ token }) =>
    api.get(`/api/user/register/resend?token=${token}`)
  );

  const [showMsg, setShowMsg] = useState(true);

  return (
    <>
      <Head>
        <title>Email verification unsuccesful!</title>
      </Head>
     
{/* 
      <GuestWrapper>
        <Container>
          <Row className="justify-content-center">
            <p className="mt-5">

              Your email could not be verified.{' '}
              {token && 'Your verfication link may have expired.'}
            &nbsp;
          </p>
          </Row>
          &nbsp;
          <br></br>
          <Row className="justify-content-center">
            {token ? (
              <button className="btn btn-sm btn-fill-out"

                isLoading={isLoading}
                onClick={() => {
                  mutate({ token });
                }}
              >
                Resend verification email
              </button>
            ) : (
                <Link href="/" passHref>
                  <button className="btn btn-sm btn-fill-out" >Back to home</button>
                </Link>
              )}



          </Row>
          <Row className="justify-content-center">
            <div>
              &nbsp;
              
    {isError && (
                // <Alert status="error">
                //   <AlertIcon />
                //   An error occured.
                // </Alert>
                <Alert
                show={showMsg && isError}
                  variant="danger"
                  onClose={() => setShowMsg(false)}
                  dismissible
                >
                  An error occured. Please try again.
                </Alert>
              )}
              {isSuccess && (
                // <Alert status="success">
                //   <AlertIcon />
                //   Verification email resent. Please check your inbox.
                // </Alert>
                <Alert
                show={showMsg && isSuccess}
                  variant="success"
                  dismissible
                  onClose={() => setShowMsg(false)}
                >
                  Verification email resent. Please check your inbox.
                </Alert>
              )}
            </div>
          </Row>



        </Container>

      </GuestWrapper> */}
      <GuestWrapper>
        <Container className="my-4">
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column" style={{ maxWidth: '576px' }}>
              <p className="text-center">
                <strong>
                  Your email could not be verified.
                  {token && 'Your verfication link may have expired.'}
                </strong>
              </p>
              {token ? (
                <ButtonWithLoading
                  className="btn btn-fill-out btn-sm mb-3 mx-auto"
                  isLoading={isLoading}
                  onClick={() => {
                    mutate({ token });
                  }}
                >
                  Resend verification email
                </ButtonWithLoading>
              ) : (
                <Link href="/">
                  <button className="btn btn-fill-out btn-sm mb-3">
                    Back to home
                  </button>
                </Link>
              )}
              {isError && <Alert variant="danger">An error occured.</Alert>}
              {isSuccess && (
                <Alert variant="success">
                  Verification email resent. Please check your inbox.
                </Alert>
              )}
            </div>
          </div>
        </Container>
    </GuestWrapper>
    </>
  );
}

RegisterVerificationError.propTypes = {
  token: PropTypes.string,
};
