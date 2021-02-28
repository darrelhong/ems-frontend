import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import api from '../../../lib/ApiClient';

import { FooterOne } from '../../../components/Footer';
import AdminHeaderTop from '../../../components/Header/AdminHeaderTop';
import withProtectRoute from '../../../components/ProtectRouteWrapper';
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import ButtonWithLoading from '../../../components/custom/ButtonWithLoading';

const getEventOrganiser = async (id) => {
  const { data } = await api.get(`/api/organiser/${id}`);
  return data;
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      ...query,
    },
  };
}

function EventOrganiserDetails({ id }) {
  // onClick handlers
  const queryClient = useQueryClient();
  const useMutationInvalidate = (fn, options) =>
    useMutation(fn, {
      onSuccess: () => {
        queryClient.invalidateQueries(['organiser', id]);
      },
      ...options,
    });

  const { mutate: approve } = useMutationInvalidate((id) =>
    api.post(`/api/organiser/approve/${id}`)
  );

  const { mutate: reject } = useMutationInvalidate((id) =>
    api.post(`/api/organiser/reject/${id}`, {
      message: 'Default message',
    })
  );

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

  // data fetching
  const { data: eo, isLoading } = useQuery(['organiser', id], () =>
    getEventOrganiser(id)
  );

  return (
    <>
      <Head>
        <title>Event Organiser details</title>
      </Head>

      <AdminHeaderTop />

      <BreadcrumbOne pageTitle="Event Organiser Details">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/admin/home">
              <a>Admin Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/admin/eventorg">
              <a>Event Organisers</a>
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

        {eo && (
          <>
            <dl className="row">
              <dt className="col-sm-3">ID</dt>
              <dd className="col-sm-9">{eo.id}</dd>

              <dt className="col-sm-3">Name</dt>
              <dd className="col-sm-9">{eo.name}</dd>

              <dt className="col-sm-3">Email</dt>
              <dd className="col-sm-9">{eo.email}</dd>

              <dt className="col-sm-3">Description</dt>
              <dd className="col-sm-9">{eo.description || '-'}</dd>

              <dt className="col-sm-3">Phone no.</dt>
              <dd className="col-sm-9">{eo.phoneNumber || '-'}</dd>

              <dt className="col-sm-3">Address</dt>
              <dd className="col-sm-9">{eo.address || '-'}</dd>

              <dt className="col-sm-3">Status</dt>
              <dd className="col-sm-9">
                <ul className="list-unstyled">
                  <li>
                    {eo.enabled ? 'Account is enabled' : 'Account is disabled'}
                  </li>
                  <li>
                    {eo.approved
                      ? 'Account is approved'
                      : 'Account is not approved'}
                  </li>
                </ul>
              </dd>
            </dl>
            <Row>
              <Col md={5} className="mb-4">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  disabled={eo.approved}
                  onClick={() => approve(id)}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  disabled={!eo.approved}
                  onClick={() => reject(id)}
                >
                  Reject
                </button>
              </Col>
              <Col md={5} className="mb-4">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  disabled={eo.enabled}
                  onClick={() => enable(id)}
                >
                  Enable
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  disabled={!eo.enabled}
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
                  onClick={() => resetPassword(eo.email)}
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

            <UpdateEventOrganiserForm eo={eo} />
          </>
        )}
      </Container>

      <FooterOne />
    </>
  );
}

EventOrganiserDetails.propTypes = {
  id: PropTypes.string,
};

export default withProtectRoute(EventOrganiserDetails, {
  redirectTo: '/admin/login',
});

function UpdateEventOrganiserForm({ eo }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: {
      name: eo.name,
      phonenumber: eo.phonenumber,
      address: eo.address,
      description: eo.description,
    },
  });

  const { mutate, isSuccess, isError } = useMutation(
    (data) => api.post('/api/user/admin-update', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', eo.id.toString()]);
      },
    }
  );

  const onSubmit = async (data) => {
    mutate({
      ...data,
      id: eo.id,
    });
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="name">Name</label>
          <input
            className={cx('form-control', {
              'is-invalid': errors?.name,
            })}
            type="text"
            name="name"
            id="name"
            ref={register({ required: 'Name is required' })}
          />
          <div className="invalid-feedback">{errors?.name?.message}</div>
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="phonenumber">Phone no.</label>
          <input
            className={cx('form-control', {
              'is-invalid': errors?.phone,
            })}
            type="text"
            name="phonenumber"
            id="phonenumber"
            ref={register({ required: 'Phone is required' })}
          />
          <div className="invalid-feedback">{errors?.phone?.message}</div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className={cx('form-control', {
            'is-invalid': errors?.description,
          })}
          type="text"
          name="description"
          id="description"
          ref={register()}
        />
        <div className="invalid-feedback">{errors?.description?.message}</div>
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea
          className={cx('form-control', {
            'is-invalid': errors?.address,
          })}
          type="text"
          name="address"
          id="address"
          ref={register()}
        />
        <div className="invalid-feedback">{errors?.address?.message}</div>
      </div>
      <div className="form-group">
        <ButtonWithLoading
          type="submit"
          className="btn btn-fill-out"
          isLoading={formState?.isSubmitting}
        >
          Update
        </ButtonWithLoading>

        {isError && (
          <Alert className="mt-4 mb-0" variant="danger">
            An error has occurred.
          </Alert>
        )}

        {isSuccess && (
          <Alert className="mt-4 mb-0" variant="success">
            Profile succesfully updated!
          </Alert>
        )}
      </div>
    </form>
  );
}

UpdateEventOrganiserForm.propTypes = {
  eo: PropTypes.object,
};
