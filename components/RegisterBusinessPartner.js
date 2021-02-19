import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import { Col, Container, Row } from 'react-bootstrap';
import { BreadcrumbOne } from './Breadcrumb';
import { LayoutOne } from '../layouts';
import Alert from 'react-bootstrap/Alert';

import { useMutation } from 'react-query';
import api from '../lib/ApiClient';

export default function RegisterBusinessPartner({ title, registerApiUrl }) {
  const { register, handleSubmit, errors, watch } = useForm();
  const [show, setShow] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const password = useRef({});
  password.current = watch('password', '');

  const { mutate, isError } = useMutation(
    (data) => api.post(registerApiUrl, data),
    {
      onSuccess: () => {
        // router.push('/organiser/register-success');
        setShowSuccess(true);
      },
    }
  );

  const onSubmit = async (data) => {
    mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <LayoutOne>
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
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="Your Name"
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
                      <button
                        type="submit"
                        className="btn btn-fill-out btn-block"
                        name="register"
                      >
                        Register
                      </button>
                    </div>

                    {isError && (
                      <Alert
                        show={show}
                        variant="danger"
                        onClose={() => setShow(false)}
                        dismissible
                      >
                        {' '}
                        An error occurred creating your account. Please try
                        again.{' '}
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
    </LayoutOne>
  );
}

RegisterBusinessPartner.propTypes = {
  title: PropTypes.string,
  registerApiUrl: PropTypes.string,
};
