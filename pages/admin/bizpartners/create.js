import Head from 'next/head';
import Link from 'next/link';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import cx from 'classnames';
import { Container } from 'react-bootstrap';

import api from '../../../lib/ApiClient';

import { BreadcrumbOne } from '../../../components/Breadcrumb';
import AdminHeaderTop from '../../../components/Header/AdminHeaderTop';
import withProtectRoute from '../../../components/ProtectRouteWrapper';
import { FooterOne } from '../../../components/Footer';

function CreateBusinessPartner() {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const { mutate, isSuccess, isError, isLoading } = useMutation((data) =>
    api.post('/api/partner/register/noverify', data)
  );

  return (
    <>
      <Head>
        <title>Event Organisers</title>
      </Head>

      <AdminHeaderTop />

      <BreadcrumbOne pageTitle="Create business partner">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/admin/home">
              <a>Admin Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/admin/bizpartners">
              <a>Business Partners</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Create business partners</li>
        </ol>
      </BreadcrumbOne>

      <Container className="space-pb--r70 space-pt--r70" style={{ zIndex: -1,
    position:"relative" }}>
        <form
          onSubmit={handleSubmit((data) => {
            mutate({
              name: data.name,
              email: data.email,
              password: data.password,
            });
          })}
        >
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">
                Name <span className="required">*</span>
              </label>
              <input
                className={cx('form-control', { 'is-invalid': errors?.name })}
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                ref={register({ required: 'Name is required' })}
              />
              <div className="invalid-feedback">{errors?.name?.message}</div>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                className={cx('form-control', { 'is-invalid': errors?.email })}
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                ref={register({ required: 'Email is required' })}
              />
              <div className="invalid-feedback">{errors?.email?.message}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <input
                className={`form-control ${
                  errors?.password ? 'is-invalid' : ''
                }`}
                type="password"
                name="password"
                placeholder="Password"
                ref={register({
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters',
                  },
                })}
              />
              <div className="invalid-feedback">
                {errors?.password?.message}
              </div>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="password_confirm">
                Confirm Password <span className="required">*</span>
              </label>
              <input
                className={`form-control ${
                  errors?.password_confirm ? 'is-invalid' : ''
                }`}
                type="password"
                name="password_confirm"
                placeholder="Confirm password"
                ref={register({
                  validate: (value) =>
                    value === password.current || 'Passwords do not match',
                })}
              />
              <div className="invalid-feedback">
                {errors?.password_confirm?.message}
              </div>
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-fill-out">
              Register{' '}
              {isLoading && (
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
            </button>
          </div>
        </form>

        {isSuccess && (
          <div className="alert alert-success mt-4" role="alert">
            Account succefully created!
          </div>
        )}

        {isError && (
          <div className="alert alert-danger mt-4 mb-0" role="alert">
            An error has occurred.
          </div>
        )}
      </Container>

      <FooterOne />
    </>
  );
}

export default withProtectRoute(CreateBusinessPartner, {
  redirectTo: '/admin/login',
});
