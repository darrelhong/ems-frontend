import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import GuestWrapper from '../../components/wrapper/GuestWrapper';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';
import { useMutation } from 'react-query';
import api from '../../lib/ApiClient';
import { Alert, Container } from 'react-bootstrap';

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

  return (
    <>
      <Head>
        <title>Email verification unsuccesful!</title>
      </Head>

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
