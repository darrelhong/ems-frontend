import { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Col, Container, Row } from 'react-bootstrap';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';

import { login } from 'lib/auth';

import { BreadcrumbOne } from 'components/Breadcrumb';
import ButtonWithLoading from 'components/custom/ButtonWithLoading';

// get query params from URL to dispaly relavant feedback
export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      ...query,
    },
  };
};

export default function AdminLogin({ info }) {
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { register, handleSubmit } = useForm();

  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle="Login">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Login</li>
        </ol>
      </BreadcrumbOne>
      <div className="login-content space-pt--r100 space-pb--r100">
        <Container>
          <Row className="justify-content-center">
            <Col xl={6} md={10}>
              <div className="login-wrap">
                {info == 'noToken' && (
                  <div className="alert alert-danger" role="alert">
                    Session timed out. Please sign in again.
                  </div>
                )}
                <div className="heading-s1 space-mb--20">
                  <h3>Login</h3>
                </div>
                <div>
                  <form
                    onSubmit={handleSubmit((data) => {
                      setLoginLoading(true);
                      login(
                        data,
                        '/api/user/login/admin',
                        '/admin/home',
                        setLoginError
                      );
                    })}
                  >
                    <div className="form-group">
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
                      <input
                        className="form-control"
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        ref={register({ required: true })}
                      />
                    </div>
                    <div className="login-footer form-group">
                      <div className="check-form">
                        <div className="custom-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            id="exampleCheckbox1"
                            defaultValue
                          />
                          {/* <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox1"
                          >
                            <span>Remember me</span>
                          </label> */}
                        </div>
                      </div>
                      <a href="#">Forgot password?</a>
                    </div>
                    {loginError && (
                      <div className="alert alert-danger" role="alert">
                        {loginError}
                      </div>
                    )}
                    <div className="form-group">
                      <ButtonWithLoading
                        type="submit"
                        className="btn btn-fill-out btn-block"
                        name="login"
                        isLoading={loginLoading && !loginError}
                      >
                        Log in
                      </ButtonWithLoading>
                    </div>
                  </form>
                  {/* <div className="different-login">
                    <span> or</span>
                  </div>
                  <ul className="btn-login text-center">
                    <li>
                      <a href="#" className="btn btn-facebook">
                        <FaFacebookF />
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn btn-google">
                        <FaGooglePlusG />
                        Google
                      </a>
                    </li>
                  </ul>
                  <div className="form-note text-center space-mt--20">
                    {"Don't Have an Account? "}
                    <Link href="/other/register">
                      <a>Sign up now</a>
                    </Link>
                  </div> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

AdminLogin.propTypes = {
  info: PropTypes.string,
};
