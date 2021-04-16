import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import {
  Col,
  Container,
  Row,
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import api from '../lib/ApiClient';
import ButtonWithLoading from './custom/ButtonWithLoading';

import { BreadcrumbOne } from './Breadcrumb';
import { LayoutOne } from '../layouts';
import Alert from 'react-bootstrap/Alert';
import { useMutation } from 'react-query';
import GuestWrapper from '../components/wrapper/GuestWrapper';

export default function RegisterEvnOrg({ title, registerApiUrl }) {
  const router = useRouter();
  const { register, handleSubmit, errors, watch } = useForm();
  const [show, setShow] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const password = useRef({});
  password.current = watch('password', '');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showUserAlrExistError, setShowUserAlrExistError] = useState(false);

  const { mutate, isLoading, isError } = useMutation((data) => {
    // for (var value of form_data.values()) {
    //   console.log(value);
    // }
    console.log('mutation');
    console.log(data);

    api
      .post(registerApiUrl, data, {
        // onSuccess: () => {
        //   // router.push('/organiser/register-success');
        // //  setShowSuccess(true);
        // },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          document.getElementById('register-form').reset();
          console.log(response.data['message']);
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
  });

  const onSubmit = async (data) => {
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
                <form onSubmit={handleSubmit(onSubmit)} id="register-form">
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
                        {' '}
                        User already exist.{' '}
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
                      {' '}
                      An error occurred creating your account. Please try again.{' '}
                    </Alert>
                  )}

                  <Alert
                    show={showSuccess}
                    variant="success"
                    onClose={() => setShowSuccess(false)}
                    dismissible
                  >
                    {' '}
                    You have succesfully registered. Please check your inbox to
                    verify your email.{' '}
                  </Alert>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email
                      <span className="required">*</span>
                    </label>
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
                    <label htmlFor="password">
                      Password
                      <span className="required">*</span>
                    </label>

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
                    <label htmlFor="password_confirm">
                      Confirm Password
                      <span className="required">*</span>
                    </label>

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

                  {/* <Row>
                    <div className="form-group">
                      <Form.Label className="uploadFileLabel">
                        Upload Business Document &nbsp;
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <BsFillInfoCircleFill></BsFillInfoCircleFill>
                        </OverlayTrigger>
                      </Form.Label>

                      <Col className="form-group" md={12}>
                        <Form.Group>
                          <Form.File
                            id="custom-file"
                            type="file"
                            accept=".zip"
                            onChange={handleFileChange}
                            required
                            custom
                          />
                          <Form.Label
                            className="form-group custom-file-label"
                            md={12}
                            for="custom-file"
                          >
                            {fileName}
                          </Form.Label>
                        </Form.Group>
                      </Col>
                    </div>
                  </Row> */}

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
                </form>

                <div className="form-note text-center space-mt--20">
                  {'Already Have an Account? '}
                  <Link href="/organiser/login">
                    <a>Login now</a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </GuestWrapper>
  );
}

RegisterEvnOrg.propTypes = {
  title: PropTypes.string,
  registerApiUrl: PropTypes.string,
};
