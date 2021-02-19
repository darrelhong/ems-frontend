import Link from 'next/link';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import api from '../lib/ApiClient';

import HomeHeaderTop from './Header/HomeHeaderTop';
import { Col, Container, Row } from 'react-bootstrap';
import { BreadcrumbOne } from './Breadcrumb';

export default function RegisterPage({ title, registerApiUrl }) {
  const router = useRouter();
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const { mutate, isError } = useMutation(
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
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <HomeHeaderTop />

      <BreadcrumbOne pageTitle="Register">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">{title}</li>
        </ol>
      </BreadcrumbOne>

      <div className="login-content space-pt--r100 space-pb--r100">
        <Container>
          <Row className="justify-content-center">
            <Col xl={6} md={10}>
              <div className="login-wrap">
                <div className="heading-s1 space-mb--20">
                  <h3>Register</h3>
                </div>
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label htmlFor="name">
                        Name <span className="required">*</span>
                      </label>
                      <input
                        className={`form-control ${
                          errors?.name ? 'is-invalid' : ''
                        }`}
                        type="text"
                        required
                        name="name"
                        id="name"
                        placeholder="Your name"
                        ref={register({ required: 'Name is required' })}
                      />
                      <div className="invalid-feedback">
                        {errors?.name?.message}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        Email <span className="required">*</span>
                      </label>
                      <input
                        className={`form-control ${
                          errors?.email ? 'is-invalid' : ''
                        }`}
                        type="email"
                        required
                        name="email"
                        id="email"
                        placeholder="Your email"
                        ref={register({ required: 'Email is required' })}
                      />
                      <div className="invalid-feedback">
                        {errors?.email?.message}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">
                        Password <span className="required">*</span>
                      </label>
                      <input
                        className={`form-control ${
                          errors?.password ? 'is-invalid' : ''
                        }`}
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        ref={register({
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must have at least 8 characters',
                          },
                        })}
                      />
                      <div className="invalid-feedback">
                        {errors?.password?.message}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password_confirm">
                        Confirm Password <span className="required">*</span>
                      </label>
                      <input
                        className={`form-control ${
                          errors?.password_confirm ? 'is-invalid' : ''
                        }`}
                        required
                        type="password"
                        name="password_confirm"
                        placeholder="Confirm password"
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
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox1"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-fill-out btn-block"
                      >
                        Register
                      </button>
                    </div>
                  </form>

                  {isError && (
                    <div className="alert alert-danger mt-4 mb-0" role="alert">
                      An error has occurred.
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* <PageContainer centerContent>
        <Grid maxW="sm" w="100%" h="200px" rowGap={3}>
          <Heading textAlign="center" size="lg" mt={4}>
            Create an acccount
          </Heading>

          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid rowGap={3}>
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                    ref={register({ required: 'Name is required' })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    ref={register({ required: 'Email is required' })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <PasswordInput
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    ref={register({
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must have at least 8 characters',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password_confirm}>
                  <FormLabel htmlFor="password_confirm">
                    Confirm Password
                  </FormLabel>
                  <PasswordInput
                    name="password_confirm"
                    id="password_confirm"
                    placeholder="Re-enter password"
                    ref={register({
                      validate: (value) =>
                        value === password.current || 'Passwords do not match',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password_confirm && errors.password_confirm.message}
                  </FormErrorMessage>
                </FormControl>

                <Button mt={2} type="submit" isLoading={isLoading}>
                  Submit
                </Button>

                {isError && (
                  <Alert status="error">
                    <AlertIcon />
                    An error occurred creating your account. Please try again.
                  </Alert>
                )}
              </Grid>
            </form>
          </Card>
        </Grid>
      </PageContainer> */}
    </>
  );
}

RegisterPage.propTypes = {
  title: PropTypes.string,
  registerApiUrl: PropTypes.string,
};
