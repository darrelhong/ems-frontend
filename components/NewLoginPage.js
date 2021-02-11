import Link from 'next/link';
import { LayoutOne } from '../layouts';
import { BreadcrumbOne } from '../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { login } from '../lib/auth';

export default function LoginPage({
  info,
  heading,
  loginApiUrl,
  loginSuccessUrl,
  registerUrl,
}) {
  const { register, handleSubmit, errors, formState } = useForm();
  const [loginError, setLoginError] = useState(null);
  const onSubmit = async (data) => {
    login(data, loginApiUrl, loginSuccessUrl, setLoginError);
  };

  return (
    
    <LayoutOne>
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
                <div className="heading-s1 space-mb--20">
                  <h3>Login</h3>
                </div>
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        id="email"
                        ref={register({ required: true })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        required
                        type="password"
                        name="password"
                        id="password"
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
                            id="remeberMeCheckBox"
                            defaultValue
                          />
                          <label
                            className="form-check-label"
                            htmlFor="remeberMeCheckBox"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                      </div>
                      <a href="#">Forgot password?</a>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        isLoading={formState.isSubmitting}
                        className="btn btn-fill-out btn-block"
                        name="login"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                  <div className="different-login">
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
                    Don't Have an Account?{' '}
                    <Link href="/other/register">
                      <a>Sign up now</a>
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

LoginPage.propTypes = {
  info: PropTypes.string,
  heading: PropTypes.string,
  loginApiUrl: PropTypes.string,
  loginSuccessUrl: PropTypes.string,
  registerUrl: PropTypes.string,
};
