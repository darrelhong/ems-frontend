import { Alert, Container } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import api from '../../lib/ApiClient';

import GuestWrapper from '../../components/wrapper/GuestWrapper';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';

export default function ForgotPassword() {
  const { register, handleSubmit, errors } = useForm();
  const { mutate, isLoading, isSuccess, isError } = useMutation(({ email }) =>
    api.post(`/api/user/reset-password/request?email=${email}`)
  );

  const onSubmit = async (data) => {
    mutate(data);
  };

  return (
    <>
      <GuestWrapper title="Forgot password">
        <Container className="my-4">
          <div className="d-flex justify-content-center">
            <div style={{ maxWidth: '576px' }}>
              <h2>Reset your password</h2>
              {isError && (
                <Alert variant="danger">
                  An error occurred. Please try again.
                </Alert>
              )}

              {isSuccess ? (
                <Alert variant="success">
                  {
                    ' Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.'
                  }
                </Alert>
              ) : (
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label htmlFor="email">
                        {
                          " Enter your account's verified email address and we will send you a password reset link."
                        }
                      </label>
                      <input
                        className={cx('form-control', {
                          'is-invalid': errors?.email,
                        })}
                        placeholder="Enter email"
                        type="email"
                        name="email"
                        id="email"
                        ref={register({ required: 'Email is required' })}
                      />
                      <div className="invalid-feedback">
                        {errors?.email?.message}
                      </div>
                    </div>

                    <ButtonWithLoading
                      className="btn btn-fill-out btn-sm"
                      type="submit"
                      isLoading={isLoading}
                    >
                      Send password reset email
                    </ButtonWithLoading>
                  </form>
                </div>
              )}
            </div>
          </div>
        </Container>
      </GuestWrapper>
    </>
  );
}
