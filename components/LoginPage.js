import { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { login } from '../lib/auth';


// import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';
import { Col, Container, Row } from 'react-bootstrap';
import { BreadcrumbOne } from './Breadcrumb';
import { LayoutOne } from '../layouts';

// export default function LoginPage({
//   info,
//   heading,
//   loginApiUrl,
//   loginSuccessUrl,
//   registerUrl,
// }) {
//   const { register, handleSubmit, errors, formState } = useForm();
//   const [loginError, setLoginError] = useState(null);
//   const onSubmit = async (data) => {
//     login(data, loginApiUrl, loginSuccessUrl, setLoginError);
//   };

//   return (
//     <>
//       <Head>
//         <title>{heading}</title>
//       </Head>

//       <NavBar />

//       <PageContainer centerContent>
//         <Heading mt={4} mb={3} textAlign="center" size="lg">
//           {heading}
//         </Heading>
//         <Container maxW="xs">
//           {info == 'noToken' && (
//             <Alert status="error" size="xs">
//               <AlertIcon />
//               Session timed out. Please sign in again.
//             </Alert>
//           )}
//           <Card>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Grid rowGap={3}>
//                 <FormControl isInvalid={errors.email}>
//                   <FormLabel htmlFor="email">Email address</FormLabel>
//                   <Input
//                     placeholder="Enter email"
//                     type="email"
//                     name="email"
//                     id="email"
//                     ref={register({ required: true })}
//                   />
//                   <FormErrorMessage>
//                     {errors.email && 'Email is required'}
//                   </FormErrorMessage>
//                 </FormControl>
//                 <FormControl isInvalid={errors.password}>
//                   <FormLabel htmlFor="password">Password</FormLabel>
//                   <Input
//                     placeholder="Enter password"
//                     type="password"
//                     name="password"
//                     id="password"
//                     ref={register({ required: true })}
//                   />
//                   <FormErrorMessage>
//                     {errors.password && 'Password is required'}
//                   </FormErrorMessage>
//                 </FormControl>
//                 {loginError && (
//                   <FormControl isInvalid={loginError}>
//                     <FormErrorMessage>{loginError}</FormErrorMessage>
//                   </FormControl>
//                 )}
//                 <Button mt={2} type="submit" isLoading={formState.isSubmitting}>
//                   Log in
//                 </Button>

//                 <Grid mt={2} fontSize="sm" rowGap={2}>
//                   <GridItem>
//                     <NextLink href={registerUrl} passHref>
//                       <Link>Register</Link>
//                     </NextLink>
//                   </GridItem>
//                   <GridItem>
//                     <NextLink href="/register/forgot-password" passHref>
//                       <Link>Forgot password</Link>
//                     </NextLink>
//                   </GridItem>
//                 </Grid>
//               </Grid>
//             </form>
//           </Card>
//         </Container>
//       </PageContainer>
//     </>
//   );
// }

export default function LoginPage({
  info,
  heading,
  loginApiUrl,
  loginSuccessUrl,
  registerUrl,
}) {
  const [loginError, setLoginError] = useState(null);
  const { register, handleSubmit } = useForm();

  return (
    <LayoutOne>
      <Head>
        <title>{heading}</title>
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
                  <h3>{heading}</h3>
                </div>
                <div>
                  <form
                    onSubmit={handleSubmit((data) => {
                      login(data, loginApiUrl, loginSuccessUrl, setLoginError);
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
                      <a href="/register/forgot-password">Forgot password?</a>
                    </div>
                    {loginError && (
                      <div className="alert alert-danger" role="alert">
                        {loginError}
                      </div>
                    )}
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-fill-out btn-block"
                        name="login"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                  {/* <div className="different-login">
                    <span> or</span>
                  </div> */}
                  {/* <ul className="btn-login text-center">
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
                  </ul> */}
                  <div className="form-note text-center space-mt--20">
                    {"Don't Have an Account? "}
                    <Link href={registerUrl}>
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
