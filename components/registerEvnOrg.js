import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Col, Container, Row } from 'react-bootstrap';
import { BreadcrumbOne } from './Breadcrumb';
import { LayoutOne } from '../layouts';
import AlertModal from 'react-bootstrap/Alert'
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import api from '../lib/ApiClient';

import Card from './Card';
import NavBar from './NavBar/NavBar';
import PageContainer from './PageContainer';
import PasswordInput from './settings/PasswordInput';


export default function RegisterEvnOrg({
     title, registerApiUrl 
  }) {
    const router = useRouter();
    const { register, handleSubmit, errors, watch } = useForm();
    const [show,setShow] = useState(true);
    const password = useRef({});
    password.current = watch('password', '');
  
    const { mutate, isLoading, isError } = useMutation(
      (data) => api.post(registerApiUrl, data),
      {
        onSuccess: () => {
          router.push('/register/success');
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
                <FormLabel htmlFor="name">Name</FormLabel>
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
                          <FormErrorMessage>
                            {errors.password && errors.password.message}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.password_confirm}>
                  <FormLabel htmlFor="password_confirm">
                    Confirm Password
                  </FormLabel>
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
                        value === password.current || 'Passwords do not match',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password_confirm && (<AlertModal show={show} variant="danger" onClose={() => setShow(false)} dismissible> {errors.password_confirm.message} </AlertModal>)}
                  </FormErrorMessage>

                  
                </FormControl>
                        {/* />
                     </div> */}
                     
                     
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
                  <Alert status="error">
                    <AlertIcon />
                    An error occurred creating your account. Please try again.
                  </Alert>
                )}
                    </form>
{/* 
                    <div className="form-note text-center space-mt--20">
                      {"Don't Have an Account? "}
                      <Link href={registerUrl}>
                        <a>Sign up now</a>
                      </Link>
                    </div> */}
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
  