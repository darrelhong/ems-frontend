import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import { Col, Container, Row, Form,OverlayTrigger,Tooltip } from 'react-bootstrap';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { BreadcrumbOne } from './Breadcrumb';
import { LayoutOne } from '../layouts';
import Alert from 'react-bootstrap/Alert';
import { useMutation } from 'react-query';
import api from '../lib/ApiClient';


export default function RegisterEvnOrg({ title, registerApiUrl }) {
  const { register, handleSubmit, errors, watch } = useForm();
  const [show, setShow] = useState(true);
  const [showFileSizeError, setShowFileSizeError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const password = useRef({});
  password.current = watch('password', '');

  // const { mutate, isError } = useMutation(
  //   (data) => api.post(registerApiUrl, data),
  //   {
  //     onSuccess: () => {
  //       // router.push('/organiser/register-success');
  //       setShowSuccess(true);
  //     },
  //   }
  // );
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
     Please upload your business supporting document(s) as a zip file.
    </Tooltip>
  );

    const [fileUpload, setfileUpload] = useState(false);
    // if multiple file, we ask them to zip
    const [fileName, setFileName] = useState('Choose file');
    const [file, setFile] = useState('uploadfile');
    useEffect(() => {
      setFileName('Choose file');
    }, ['Choose file']);

    // const { mutate, isLoading, isError } = useMutation((data) =>
    //   api
    //     .post(registerApiUrl, data, {
    //       // onSuccess: () => {
    //       //   // router.push('/organiser/register-success');
    //       // //  setShowSuccess(true);
    //       // },
    //     })
    //     .then((response) => {
          
    //       console.log(response);
    //       if (response.status == 200) {
    //            setShowSuccess(true);
    //         // submitFile();
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // );

       const { mutate, isLoading, isError } =  useMutation((data) => {
        
        console.log(data);
        var form_data = new FormData();
        form_data.append('name', data["email"]);
        form_data.append("email", data["email"]);
        form_data.append("password", data['password']);
        form_data.append('file', file);

        // for (var value of form_data.values()) {
        //   console.log(value);
        // }
          
         api
           .post(registerApiUrl, form_data, {
             headers: {
               'Content-Type': 'multipart/form-data',
             },
             // onSuccess: () => {
             //   // router.push('/organiser/register-success');
             // //  setShowSuccess(true);
             // },
           })
           .then((response) => {
             console.log(response);
             if (response.status == 200) {
               setShowSuccess(true);
               // submitFile();
             }
           })
           .catch((error) => {
             console.log(error);
           });
       });

        const handleFileChange = async (e) => {
          console.log('call handleFileChange');
          console.log(e);
          console.log(e.target.files[0].name);
          console.log(e.target.files[0].size);

          // if size is more than 5mb, display error message
          console.log(e.target.files[0].size/1000000);
          if(e.target.files[0].size/1000000 > 5 || e.target.files[0].name == ''){
            console.log("exceeded");
            setShowFileSizeError(true);
            document.getElementById('custom-file').value = '';
          }else{
            setShowFileSizeError(false);
             setFile(e.target.files[0]);
             setfileUpload(true);
             setFileName(e.target.files[0].name);
          }
        };
        // const submitFile = async () => {
        //   const data = new FormData();
        //   //if(file name is not empty..... handle condition when no file is selected)
        //   data.append('file', file);
        //   api
        //     .post('/api/uploadBizFile', data, {
        //       headers: {
        //         'Content-Type': 'multipart/form-data',
        //       }
        //       // onSuccess: () => {
        //       //   queryClient.invalidateQueries(['user', user?.id.toString()]);
        //       // },
        //     })
        //     .then((response) => {
        //       console.log(response);
        //       if (response.status == 200) {
        //         console.log('file upload sucessfully');
        //         console.log(response);
        //         console.log(response.data['fileDownloadUri']);
        //         var newlink = response.data['fileDownloadUri'];
        //         setProfilepicUrl(newlink);
        //       }
        //     })
        //     .catch(() => {
        //       setShowFailedMsg(true);
        //     });
        // };


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
                    <div className="form-group">
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="name"
                        placeholder="Your Name"
                        ref={register()}
                      />
                    </div>
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
                  <Row>
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

                  <div
                    style={{ display: showFileSizeError ? 'block' : 'none' }}
                  >
                    {
                      <Alert
                        show={showFileSizeError}
                        variant="danger"
                        onClose={() => setShowFileSizeError(false)}
                        dismissible
                      >
                        {' '}
                        The zip file size of your business supporting document
                        must be less than 5 mb{' '}
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
    </LayoutOne>
  );
}

RegisterEvnOrg.propTypes = {
  title: PropTypes.string,
  registerApiUrl: PropTypes.string,
};
