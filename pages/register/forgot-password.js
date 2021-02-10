import Head from 'next/head';
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import api from '../../lib/ApiClient';

import NavBar from '../../components/NavBar/NavBar';
import PageContainer from '../../components/PageContainer';
import Card from '../../components/Card';
import ChakraWrapper from '../../components/ChakraWrapper';

export default function ForgotPassword() {
  const { register, handleSubmit, errors } = useForm();
  const { mutate, isLoading, isSuccess, isError } = useMutation(({ email }) =>
    api.post(`/api/user/reset-password/request?email=${email}`)
  );

  const onSubmit = async (data) => {
    mutate(data);
  };

  return (
    <ChakraWrapper>
      <Head>
        <title>Forgot password</title>
      </Head>

      <NavBar />

      <PageContainer centerContent>
        <Heading mt={4} mb={3} textAlign="center" size="lg">
          Reset your password
        </Heading>

        <Container maxW="xs">
          {isError && (
            <Alert status="error" mb={3}>
              <AlertIcon />
              An error occurred. Please try again.
            </Alert>
          )}

          {isSuccess ? (
            <Alert status="success" mb={3}>
              <AlertIcon />
              {
                ' Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.'
              }
            </Alert>
          ) : (
            <Card>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email" fontSize="sm" fontWeight="bold">
                    {
                      " Enter your account's verified email address and we will send you a password reset link."
                    }
                  </FormLabel>
                  <Input
                    placeholder="Enter email"
                    type="email"
                    name="email"
                    id="email"
                    ref={register({ required: true })}
                  />
                  <FormErrorMessage>
                    {errors.email && 'Email is required'}
                  </FormErrorMessage>
                </FormControl>

                <Button mt={4} type="submit" w="100%" isLoading={isLoading}>
                  Send password reset email
                </Button>
              </form>
            </Card>
          )}
        </Container>
      </PageContainer>
    </ChakraWrapper>
  );
}
