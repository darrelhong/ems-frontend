import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import api from '../../../lib/ApiClient';

import { BreadcrumbOne } from '../../../components/Breadcrumb';
import { FooterOne } from '../../../components/Footer';
import AdminHeaderTop from '../../../components/Header/AdminHeaderTop';
import withProtectRoute from '../../../components/ProtectRouteWrapper';
import ButtonWithLoading from '../../../components/custom/ButtonWithLoading';

const getAttendee = async (id) => {
  const { data } = await api.get(`/api/attendee/${id}`);
  return data;
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      ...query,
    },
  };
}

function AttendeeDetails({ id }) {
  // data fetching
  const { data: atnd, isLoading } = useQuery(['attendee', id], () =>
    getAttendee(id)
  );

  // onClick handlers
  const queryClient = useQueryClient();
  const useMutationInvalidate = (fn, options) =>
    useMutation(fn, {
      onSuccess: () => {
        queryClient.invalidateQueries(['attendee', id]);
      },
      ...options,
    });

  const { mutate: enable } = useMutationInvalidate((id) =>
    api.post(`/api/user/enable/${id}`)
  );

  const { mutate: disable } = useMutationInvalidate((id) =>
    api.post(`/api/user/disable/${id}`)
  );

  const {
    mutate: resetPassword,
    isLoading: rpIsLoading,
    isSuccess: rpSuccess,
    isError: rpError,
  } = useMutation((email) =>
    api.post(`/api/user/reset-password/request?email=${email}`)
  );

  return (
    <>
      <Head>
        <title>Attendee details</title>
      </Head>

      <AdminHeaderTop />

      <BreadcrumbOne pageTitle="Attendee Details">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/admin/home">
              <a>Admin Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/admin/attendee">
              <a>Attendee</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Details</li>
        </ol>
      </BreadcrumbOne>

      <Container className="space-pt--r70 space-pb--r70">
        {isLoading && (
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {atnd && (
          <>
            <dl className="row">
              <dt className="col-sm-3">ID</dt>
              <dd className="col-sm-9">{atnd.id}</dd>

              <dt className="col-sm-3">Name</dt>
              <dd className="col-sm-9">{atnd.name}</dd>

              <dt className="col-sm-3">Email</dt>
              <dd className="col-sm-9">{atnd.email}</dd>

              <dt className="col-sm-3">Description</dt>
              <dd className="col-sm-9">{atnd.description || '-'}</dd>

              <dt className="col-sm-3">Phone no.</dt>
              <dd className="col-sm-9">{atnd.phoneNumber || '-'}</dd>

              <dt className="col-sm-3">Address</dt>
              <dd className="col-sm-9">{atnd.address || '-'}</dd>

              <dt className="col-sm-3">Status</dt>
              <dd className="col-sm-9">
                {atnd.enabled ? 'Enabled' : 'Disabled'}
              </dd>
            </dl>

            <Row className="mb-4">
              <Col>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  disabled={atnd.enabled}
                  onClick={() => enable(id)}
                >
                  Enable
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  disabled={!atnd.enabled}
                  onClick={() => disable(id)}
                >
                  Disable
                </button>
              </Col>
            </Row>

            <Row>
              <Col>
                <ButtonWithLoading
                  className="btn btn-primary btn-sm mb-2"
                  onClick={() => resetPassword(atnd.email)}
                  isLoading={rpIsLoading}
                >
                  Send password reset email
                </ButtonWithLoading>
                {rpSuccess && (
                  <Alert variant="success">
                    Password reset email sent to user
                  </Alert>
                )}
                {rpError && (
                  <Alert variant="danger">
                    An error has occured sending reset password email
                  </Alert>
                )}
              </Col>
            </Row>
          </>
        )}
      </Container>

      <FooterOne />
    </>
  );
}

AttendeeDetails.propTypes = {
  id: PropTypes.string,
};

export default withProtectRoute(AttendeeDetails, {
  redirectTo: '/admin/login',
});
