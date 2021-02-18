import { useRef } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import api from '../../lib/ApiClient';

export default function UpdateProfileForm() {
  const { register, handleSubmit, errors, watch, reset } = useForm();
  const password = useRef({});
  password.current = watch('password_new', '');

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    (data) => api.post('/api/user/change-password', data),
    { onSettled: () => reset() }
  );

  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Change password</h3>
      </Card.Header>
      <Card.Body>
        <div className="change-password-form">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              mutate({
                oldPassword: data.password_current,
                newPassword: data.password_new,
              });
            })}
          >
            <Row>
              <Col className="form-group" md={12}>
                <label>
                  Current password <span className="required">*</span>
                </label>
                <input
                  required
                  className={`form-control ${
                    errors?.password_current ? 'is-invalid' : ''
                  }`}
                  name="password_current"
                  type="password"
                  ref={register({ required: 'Password is required' })}
                />
                <div className="invalid-feedback">
                  {errors?.password_current?.message}
                </div>
              </Col>
              <Col className="form-group " md={12}>
                <label>
                  New password <span className="required">*</span>
                </label>
                <input
                  required
                  className={`form-control ${
                    errors?.password_new ? 'is-invalid' : ''
                  }`}
                  name="password_new"
                  type="password"
                  ref={register({
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must have at least 8 characters',
                    },
                  })}
                />
                <div className="invalid-feedback">
                  {errors?.password_new?.message}
                </div>
              </Col>
              <Col className="form-group" md={12}>
                <label>
                  Confirm new password <span className="required">*</span>
                </label>
                <input
                  className={`form-control ${
                    errors?.password_new_confirm ? 'is-invalid' : ''
                  }`}
                  name="password_new_confirm"
                  type="password"
                  ref={register({
                    validate: (value) =>
                      value === password.current || 'Passwords do not match',
                  })}
                />
                <div className="invalid-feedback">
                  {errors?.password_new_confirm?.message}
                </div>
              </Col>

              <Col md={12}>
                <button
                  type="submit"
                  className="btn btn-fill-out"
                  name="submit"
                  value="Submit"
                >
                  Submit{' '}
                  {isLoading && (
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                </button>
              </Col>
            </Row>
          </form>

          {isError && (
            <div className="alert alert-danger mt-4 mb-0" role="alert">
              An error has occurred.
            </div>
          )}

          {isSuccess && (
            <div className="alert alert-success mt-4 mb-0" role="alert">
              Password succesfully updated!
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
