import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import api from 'lib/ApiClient';

import { BreadcrumbOne } from 'components/Breadcrumb';
import ButtonWithLoading from 'components/custom/ButtonWithLoading';
import AdminWrapper from 'components/wrapper/AdminWrapper';

const getBusinessPartner = async (id) => {
  const { data } = await api.get(`/api/partner/${id}`);
  return data;
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      ...query,
    },
  };
}

export default function BusinessPartnerDetails({ id }) {
  // data fetching
  const { data: bp, isLoading } = useQuery(['partner', id], () =>
    getBusinessPartner(id)
  );

  // onClick handlers
  const queryClient = useQueryClient();
  const useMutationInvalidate = (fn, options) =>
    useMutation(fn, {
      onSuccess: () => {
        queryClient.invalidateQueries(['partner', id]);
      },
      ...options,
    });

  const {
    mutate: enable,
    isLoading: enableIsLoading,
  } = useMutationInvalidate((id) => api.post(`/api/user/enable/${id}`));

  const {
    mutate: disable,
    isLoading: disableIsLoading,
  } = useMutationInvalidate((id) => api.post(`/api/user/disable/${id}`));

  const {
    mutate: resetPassword,
    isLoading: rpIsLoading,
    isSuccess: rpSuccess,
    isError: rpError,
  } = useMutation((email) =>
    api.post(`/api/user/reset-password/request?email=${email}`)
  );

  const [showForm, setShowForm] = useState(false);

  return (

    <>
      <Head>
        <title>Business Partner details</title>
      </Head>

      <AdminHeaderTop />

      <BreadcrumbOne pageTitle="Business Partner Details">

        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/admin/home">
              <a>Admin Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/admin/bizpartners">
              <a>Business Partner</a>
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

        {bp && (
          <>
            <dl className="row">
              <dt className="col-sm-3">ID</dt>
              <dd className="col-sm-9">{bp.id}</dd>

              <dt className="col-sm-3">Name</dt>
              <dd className="col-sm-9">{bp.name}</dd>

              <dt className="col-sm-3">Email</dt>
              <dd className="col-sm-9">{bp.email}</dd>

              <dt className="col-sm-3">Description</dt>
              <dd className="col-sm-9">{bp.description || '-'}</dd>

              <dt className="col-sm-3">Phone no.</dt>
              <dd className="col-sm-9">{bp.phonenumber || '-'}</dd>

              <dt className="col-sm-3">Address</dt>
              <dd className="col-sm-9">{bp.address || '-'}</dd>

              <dt className="col-sm-3">Status</dt>
              <dd className="col-sm-9">
                {bp.enabled ? 'Enabled' : 'Disabled'}
              </dd>
            </dl>

            <Row className="mb-4">
              <Col>
                <ButtonWithLoading
                  type="button"
                  className="btn btn-success btn-sm"
                  disabled={bp.enabled}
                  onClick={() => enable(id)}
                  isLoading={enableIsLoading}
                >
                  Enable
                </ButtonWithLoading>
                <ButtonWithLoading
                  type="button"
                  className="btn btn-danger btn-sm"
                  disabled={!bp.enabled}
                  onClick={() => disable(id)}
                  isLoading={disableIsLoading}
                >
                  Disable
                </ButtonWithLoading>
              </Col>
            </Row>

            <Row>
              <Col>
                <ButtonWithLoading
                  className="btn btn-primary btn-sm mb-4"
                  onClick={() => resetPassword(bp.email)}
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

            <Row>
              <Col>
                <button
                  className="btn btn-fill-out btn-sm"
                  onClick={() => setShowForm((curr) => !curr)}
                >
                  {showForm ? 'Close form' : 'Show update form'}
                </button>
              </Col>
            </Row>

            {showForm && <UpdatePartnerForm bp={bp} />}
          </>
        )}
      </Container>
    </AdminWrapper>
  );
}

BusinessPartnerDetails.propTypes = {
  id: PropTypes.string,
};

function UpdatePartnerForm({ bp }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: {
      name: bp.name,
      phonenumber: bp.phonenumber,
      address: bp.address,
      description: bp.description,
    },
  });

  const { mutate, isSuccess, isError } = useMutation(
    (data) => api.post('/api/user/admin-update', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['partner', bp.id.toString()]);
      },
    }
  );

  const onSubmit = async (data) => {
    mutate({
      ...data,
      id: bp.id,
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
              'is-invalid': errors?.phonenumber,
            })}
            type="text"
            name="phonenumber"
            id="phonenumber"
            ref={register({
              required: 'Phone is required',
              pattern: {
                value: /(\+65)?(6|8|9)\d{7}/,
                message: 'Invalid number',
              },
            })}
          />
          <div className="invalid-feedback">{errors?.phonenumber?.message}</div>
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

UpdatePartnerForm.propTypes = {
  bp: PropTypes.object,
};
