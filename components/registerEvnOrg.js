import { useState, useEffect, useRef } from 'react';
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

import Card from './Card';
import NavBar from './NavBar/NavBar';
import PageContainer from './PageContainer';
import PasswordInput from './settings/PasswordInput';
import Form from 'react-bootstrap/Form';

export default function RegisterEvnOrg({
     title, registerApiUrl 
  }) {
    const router = useRouter();
    const { register, handleSubmit, errors, watch } = useForm();
    const [show, setShow] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailedMsg, setShowFailedMsg] = useState(false);
    const password = useRef({});
    password.current = watch('password', '');
    const [fileUpload, setfileUpload] = useState(false);
    // if multiple file, we ask them to zip
    const [fileName, setFileName] = useState('Choose file');
    const [file, setFile] = useState('uploadfile');
    useEffect(() => {
      setFileName('Choose file');
    }, ['Choose file']);

    const { mutate, isLoading, isError } = useMutation((data) =>
      api
        .post(registerApiUrl, data, {
          onSuccess: () => {
            // router.push('/organiser/register-success');
            setShowSuccess(true);
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            // submitFile();
          }
        })
        .catch((error) => {
          console.log(error);
        })
    );

    const onSubmit = async (data) => {
      mutate({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    };

    const handleFileChange = async (e) => {
      console.log('call handleFileChange');
      console.log(e);
      console.log(e.target.files[0].name);
      setFile(e.target.files[0]);
      setfileUpload(true);
      setFileName(e.target.files[0].name);
    };
    const submitFile = async () => {
      const data = new FormData();
      //if(file name is not empty..... handle condition when no file is selected)
      data.append('file', file);
      api
        .post('/api/uploadBizFile', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onSuccess: () => {
            queryClient.invalidateQueries(['user', user?.id.toString()]);
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            console.log('file upload sucessfully');
            console.log(response);
            console.log(response.data['fileDownloadUri']);
            var newlink = response.data['fileDownloadUri'];
            setProfilepicUrl(newlink);
          }
        })
        .catch(() => {
          setShowFailedMsg(true);
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
                      <FormControl isInvalid={errors.email}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <div className="form-group">
                          <input
                            type="email"
                            required
                            className="form-control"
                            name="email"
                            placeholder="Your Email"
                            ref={register({ required: 'Email is required' })}
                          />
                        </div>
                        <FormErrorMessage>
                          {errors.email && errors.email.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.name}>
                        <FormLabel htmlFor="name">Company Name</FormLabel>
                        <div className="form-group">
                          <input
                            type="text"
                            required
                            className="form-control"
                            name="name"
                            placeholder="Your Name"
                            ref={register({ required: 'Name is required' })}
                          />
                        </div>
                        <FormErrorMessage>
                          {errors.name && errors.email.name}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.password}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <div className="form-group">
                          <input
                            // <div className="form-group">
                            //   <input
                            className="form-control"
                            required
                            type="password"
                            name="password"
                            placeholder="Password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            ref={register({ required: true })}
                          />
                        </div>
                        <FormErrorMessage>
                          {errors.password && errors.password.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.password_confirm}>
                        <FormLabel htmlFor="password_confirm">
                          Confirm Password
                        </FormLabel>
                        <div className="form-group">
                          <input
                            className="form-control"
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
                        </div>
                        <FormErrorMessage>
                          {errors.password_confirm && (
                            <AlertModal
                              show={show}
                              variant="danger"
                              onClose={() => setShow(false)}
                              dismissible
                            >
                              {' '}
                              {errors.password_confirm.message}{' '}
                            </AlertModal>
                          )}
                        </FormErrorMessage>
                      </FormControl>
                      {/* />
                     </div> */}
                      <Row>
                        <FormLabel className="uploadFileLabel">
                          Upload Business Document
                        </FormLabel>

                        <Col className="form-group" md={12}>
                          <Form.Group>
                            <Form.File
                              id="custom-file"
                              type="file"
                              onChange={handleFileChange}
                              custom
                            />
                            <Form.Label
                              className="custom-file-label"
                              md={12}
                              for="custom-file"
                            >
                              {fileName}
                            </Form.Label>
                            {/* <br></br>
                                  <div style={{display: (showUploadBtn?'block':'none')}}>
                                  <button
                                    className="btn btn-fill-out"
                                    onClick={submitFile}
                                  >
                                    Upload
                                  </button>
                                  </div> */}
                          </Form.Group>
                        </Col>
                      </Row>

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
                        <AlertModal
                          show={show}
                          variant="danger"
                          onClose={() => setShow(false)}
                          dismissible
                        >
                          {' '}
                          An error occurred creating your account. Please try
                          again.{' '}
                        </AlertModal>
                      )}

                      <AlertModal
                        show={showSuccess}
                        variant="success"
                        onClose={() => setShowSuccess(false)}
                        dismissible
                      >
                        {' '}
                        You have succesfully registered. Please check your inbox
                        to verify your email.{' '}
                      </AlertModal>
                    </form>

                    <div className="form-note text-center space-mt--20">
                      {'Already Have an Account? '}
                      <Link href="/organiser/login">
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

RegisterEvnOrg.propTypes = {
  title: PropTypes.string,
  registerApiUrl: PropTypes.string,
};
