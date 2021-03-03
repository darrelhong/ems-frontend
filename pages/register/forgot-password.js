import Head from 'next/head';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { Alert, Container } from 'react-bootstrap';

import api from '../../lib/ApiClient';

import { LayoutOne } from '../../layouts';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const { mutate, isLoading, isSuccess, isError } = useMutation(({ email }) =>
    api.post(`/api/user/reset-password/request?email=${email}`)
  );

  const onSubmit = async (data) => {
    mutate(data);
  };

  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>

      <LayoutOne>
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
                        className="form-control"
                        placeholder="Enter email"
                        type="email"
                        name="email"
                        id="email"
                        required
                        ref={register()}
                      />
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
      </LayoutOne>
    </>
  );
}
