// import Head from 'next/head';
// import {
//   Alert,
//   AlertIcon,
//   Button,
//   Container,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Heading,
//   Input,
// } from '@chakra-ui/react';
// import { useMutation } from 'react-query';
// import { useForm } from 'react-hook-form';

// import api from '../../lib/ApiClient';

// import NavBar from '../../components/NavBar/NavBar';
// import PageContainer from '../../components/PageContainer';
// import Card from '../../components/Card';
// import ChakraWrapper from '../../components/ChakraWrapper';

// export default function ForgotPassword() {
//   const { register, handleSubmit, errors } = useForm();
//   const { mutate, isLoading, isSuccess, isError } = useMutation(({ email }) =>
//     api.post(`/api/user/reset-password/request?email=${email}`)
//   );

//   const onSubmit = async (data) => {
//     mutate(data);
//   };

//   return (
//     <ChakraWrapper>
//       <Head>
//         <title>Forgot password</title>
//       </Head>

//       <NavBar />

//       <PageContainer centerContent>
//         <Heading mt={4} mb={3} textAlign="center" size="lg">
//           Reset your password
//         </Heading>

//         <Container maxW="xs">
//           {isError && (
//             <Alert status="error" mb={3}>
//               <AlertIcon />
//               An error occurred. Please try again.
//             </Alert>
//           )}

//           {isSuccess ? (
//             <Alert status="success" mb={3}>
//               <AlertIcon />
//               {
//                 ' Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.'
//               }
//             </Alert>
//           ) : (
//             <Card>
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <FormControl isInvalid={errors.email}>
//                   <FormLabel htmlFor="email" fontSize="sm" fontWeight="bold">
//                     {
//                       " Enter your account's verified email address and we will send you a password reset link."
//                     }
//                   </FormLabel>
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

//                 <Button mt={4} type="submit" w="100%" isLoading={isLoading}>
//                   Send password reset email
//                 </Button>
//               </form>
//             </Card>
//           )}
//         </Container>
//       </PageContainer>
//     </ChakraWrapper>
//   );
// }

import Head from 'next/head';
// import {
//   Alert,
//   AlertIcon,
//   Button,
//   Container,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Heading,
//   Input,
// } from '@chakra-ui/react';
import { Alert, Container, Form, Row, Col } from 'react-bootstrap';

import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { LayoutOne } from '../../layouts';
import api from '../../lib/ApiClient';
import PageContainer from '../../components/PageContainer';
import Card from '../../components/Card';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import Link from 'next/link';
import GuestWrapper from '../../components/wrapper/GuestWrapper';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const { mutate, isLoading, isSuccess, isError } = useMutation(({ email }) =>
    api.post(`/api/user/reset-password/request?email=${email}`)
  );

  const onSubmit = async (data) => {
    mutate(data);
  };

  return (
    // <GuestWrapper>
    //   <Head>
    //     <title>Forgot password</title>
    //   </Head>
    //   <BreadcrumbOne pageTitle="Reset Password">
    //     <ol className="breadcrumb justify-content-md-end">
    //       <li className="breadcrumb-item">
    //         <Link href="/organiser/login">
    //           <a>Login</a>
    //         </Link>
    //       </li>
    //       <li className="breadcrumb-item active">Reset Password</li>
    //     </ol>
    //   </BreadcrumbOne>

    //   <PageContainer centerContent>
    //     <Container maxW="xs">
    //       {isError && (
    //         <Alert status="error" mb={3}>
    //           {/* <AlertIcon /> */}
    //           An error occurred. Please try again.
    //         </Alert>
    //       )}

    //       {isSuccess ? (
    //         <Alert status="success" mb={3}>
    //           {/* <AlertIcon /> */}
    //           {
    //             ' Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.'
    //           }
    //         </Alert>
    //       ) : (
    //         <Card>
    //           <form onSubmit={handleSubmit(onSubmit)}>
    //             {/* <Form.Control isInvalid={errors.email}> */}
    //             <Row>
    //               <Col>
    //                 <label>
    //                   Enter your account's verified email address and we will
    //                   send you a password reset link.
    //                 </label>
    //                 <input
    //                   placeholder="Enter email"
    //                   className="form-control"
    //                   type="email"
    //                   name="email"
    //                   id="email"
    //                   ref={register({ required: true })}
    //                   required
    //                 />
    //               </Col>

    //               <Col className="form-group" md={12}>
    //                 {/* <FormErrorMessage>
    //                 {errors.email && 'Email is required'}
    //               </FormErrorMessage> */}
    //                 {/* </Form.Control> */}
    //                 <br></br>
    //                 <button
    //                   type="submit"
    //                   isLoading={isLoading}
    //                   className="btn btn-fill-out"
    //                 >
    //                   Send password reset email
    //                 </button>
    //               </Col>
    //             </Row>
    //           </form>
    //         </Card>
    //       )}
    //     </Container>
    //   </PageContainer>
    // </GuestWrapper>




    <>
      <Head>
        <title>Forgot password</title>
      </Head>

      <GuestWrapper>
        <Container className="my-4">
          <div className="d-flex justify-content-center">
            <div style={{ maxWidth: '576px' }}>
              <h2>Reset your password</h2>
              {isError && (
                <Alert variant="danger">
                  An error occurred. Please try again.
                </Alert>
              )}

              {isSuccess ? (
                <Alert variant="success">
                  {
                    ' Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.'
                  }
                </Alert>
              ) : (
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label htmlFor="email">
                        {
                          " Enter your account's verified email address and we will send you a password reset link."
                        }
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter email"
                        type="email"
                        name="email"
                        id="email"
                        required
                        ref={register()}
                      />
                    </div>

                    <ButtonWithLoading
                      className="btn btn-fill-out btn-sm"
                      type="submit"
                      isLoading={isLoading}
                    >
                      Send password reset email
                    </ButtonWithLoading>
                  </form>
                </div>
              )}
            </div>
          </div>
        </Container>
      </GuestWrapper>
    </>
  );
}
