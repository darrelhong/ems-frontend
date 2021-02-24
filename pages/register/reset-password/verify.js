import { useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import cx from 'classnames';

import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import api from '../../../lib/ApiClient';

import { LayoutOne } from '../../../layouts';
import { Alert, Container } from 'react-bootstrap';
import ButtonWithLoading from '../../../components/custom/ButtonWithLoading';

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      ...query,
    },
  };
};

export default function ResetPassword({ token }) {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const { mutate, isLoading, isSuccess, isError } = useMutation((data) =>
    api.post('/api/user/reset-password', data)
  );

  const onSubmit = async (data) => {
    mutate({ newPassword: data.password, token });
  };

  return (
    <>
      <Head>
        <title>Password Reset</title>
      </Head>

      <LayoutOne>
        <Container className="my-4">
          <div className="d-flex justify-content-center">
            <div>
              <h2>Change password</h2>
              {isError && (
                <Alert variant="danger">
                  An error occurred. Please try again.
                </Alert>
              )}

              {isSuccess ? (
                <Alert varaint="success">
                  Your password has been updated successfully. Please proceed to
                  login.
                  <Link href="/">
                    <button className="btn btn-fill-out btn-sm">
                      Back to home
                    </button>
                  </Link>
                </Alert>
              ) : (
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label htmlFor="password">New password</label>
                      <input
                        name="password"
                        id="password"
                        type="password"
                        ref={register({
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must have at least 8 characters',
                          },
                        })}
                        placeholder="Enter new password"
                        className={cx('form-control', {
                          'is-invalid': errors?.password,
                        })}
                      />
                      <div className="invalid-feedback">
                        {errors?.password?.message}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password_confirm">Confirm password</label>
                      <input
                        name="password_confirm"
                        id="password_confirm"
                        type="password"
                        ref={register({
                          validate: (value) =>
                            value === password.current ||
                            'Passwords do not match',
                        })}
                        placeholder="Enter new password"
                        className={cx('form-control', {
                          'is-invalid': errors?.password_confirm,
                        })}
                      />
                      <div className="invalid-feedback">
                        {errors.password_confirm &&
                          errors.password_confirm.message}
                      </div>
                    </div>

                    <ButtonWithLoading
                      className="btn btn-fill-out btn-sm"
                      type="submit"
                      isLoading={isLoading}
                    >
                      Submit
                    </ButtonWithLoading>
                  </form>
                </div>
              )}
            </div>
          </div>
        </Container>
      </LayoutOne>
    </>
  );
}

ResetPassword.propTypes = {
  token: PropTypes.string,
};
