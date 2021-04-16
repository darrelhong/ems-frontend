import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import { Col, Container, Row } from 'react-bootstrap';
import { BreadcrumbOne } from './Breadcrumb';
import Alert from 'react-bootstrap/Alert';

import { useMutation } from 'react-query';
import api from '../lib/ApiClient';
import GuestWrapper from '../components/wrapper/GuestWrapper';
import ButtonWithLoading from './custom/ButtonWithLoading';

export default function RegisterBusinessPartner({ title, registerApiUrl }) {
  const { register, handleSubmit, errors, watch } = useForm();
  const [show, setShow] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const password = useRef({});
  const [showUserAlrExistError, setShowUserAlrExistError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  password.current = watch('password', '');

  const { mutate, isError } = useMutation(
    //   (data) => api.post(registerApiUrl, data),
    //   {
    //     onSuccess: () => {
    //       // router.push('/partner/home');
    //       setShowSuccess(true);
    //       document.getElementById('register-form').reset();

    //     },
    //   }
    // );

    (data) => {
      api
        .post(registerApiUrl, data)
        .then((response) => {
          console.log(response.data['message']);
          if (response.status == 200) {
            document.getElementById('register-form').reset();
            if (response.data['message'] == 'alreadyExisted') {
              setShowUserAlrExistError(true);
              setShowSuccess(false);
              setLoginLoading(false);
            } else if (response.data['message'] == 'success') {
              setShowSuccess(true);
              setShowUserAlrExistError(false);
              setLoginLoading(false);
            } else {
              setShow(true);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );

  const onSubmit = async (data) => {
    setShow(false);
    setShowSuccess(false);
    setShowUserAlrExistError(false);
    setLoginLoading(true);
    mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <GuestWrapper>
      <Head>
        <title>{title}</title>
      </Head>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle="Register">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Register</li>
        </ol>
      </BreadcrumbOne>
      <div className="login-content space-pt--r100 space-pb--r100">
        <Container>
          <Row className="justify-content-center">
            <Col xl={6} md={10}>
              <div className="login-wrap">
                <div className="heading-s1 space-mb--20">
                  <h3>{title}</h3>
                </div>
                <div>
                  <form onSubmit={handleSubmit(onSubmit)} id="register-form">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        ref={register()}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Company Name</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="name"
                        placeholder="Your Company Name"
                        ref={register()}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        className="form-control"
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        ref={register()}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password_confirm">Confirm Password</label>
                      <input
                        className={cx('form-control', {
                          'is-invalid': errors?.password_confirm,
                        })}
                        required
                        type="password"
                        name="password_confirm"
                        id="password_confirm"
                        placeholder="Re-enter password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        ref={register({
                          validate: (value) =>
                            value === password.current ||
                            'Passwords do not match',
                        })}
                      />
                      <div className="invalid-feedback">
                        {errors?.password_confirm?.message}
                      </div>
                    </div>

                    <div className="form-group">
                      &nbsp;
                      <ButtonWithLoading
                        type="submit"
                        className="btn btn-fill-out btn-block"
                        name="register"
                        isLoading={loginLoading && !isError}
                      >
                        Register
                      </ButtonWithLoading>
                    </div>

                    <div
                      style={{
                        display: showUserAlrExistError ? 'block' : 'none',
                      }}
                    >
                      {
                        <Alert
                          show={showUserAlrExistError}
                          variant="danger"
                          onClose={() => setShowUserAlrExistError(false)}
                          dismissible
                        >
                          User already exist.
                        </Alert>
                      }
                    </div>
                    {isError && (
                      <Alert
                        show={show}
                        variant="danger"
                        onClose={() => setShow(false)}
                        dismissible
                      >
                        An error occurred creating your account. Please try
                        again.
                      </Alert>
                    )}

                    <Alert
                      show={showSuccess}
                      variant="success"
                      onClose={() => setShowSuccess(false)}
                      dismissible
                    >
                      {' '}
                      You have succesfully registered. Please check your inbox
                      to verify your email.{' '}
                    </Alert>
                  </form>

                  <div className="form-note text-center space-mt--20">
                    {'Already Have an Account? '}
                    <Link href="/partner/login">
                      <a>Login now</a>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </GuestWrapper>
  );
}

RegisterBusinessPartner.propTypes = {
  title: PropTypes.string,
  registerApiUrl: PropTypes.string,
};
