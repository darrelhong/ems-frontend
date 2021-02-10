import { useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import api from '../../../lib/ApiClient';

import NavBar from '../../../components/NavBar/NavBar';
import PageContainer from '../../../components/PageContainer';
import Card from '../../../components/Card';
import PasswordInput from '../../../components/settings/PasswordInput';
import ChakraWrapper from '../../../components/ChakraWrapper';

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      ...query,
    },
  };
};

export default function ResetPassword({ token }) {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const { mutate, isLoading, isSuccess, isError } = useMutation((data) =>
    api.post('/api/user/reset-password', data)
  );

  const onSubmit = async (data) => {
    mutate({ newPassword: data.password, token });
  };

  return (
    <ChakraWrapper>
      <Head>
        <title>Password Reset</title>
      </Head>

      <NavBar />

      <PageContainer centerContent>
        <Heading mt={4} mb={3} textAlign="center" size="lg">
          Change password
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
              <Grid rowGap={2}>
                <GridItem justifySelf="center">
                  <AlertIcon />
                </GridItem>
                Your password has been updated successfully. Please proceed to
                login.
                <Link href="/" passHref>
                  <Button>Back to home</Button>
                </Link>
              </Grid>
            </Alert>
          ) : (
            <Card>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid rowGap={3}>
                  <FormControl isInvalid={errors.password}>
                    <FormLabel htmlFor="password">New password</FormLabel>
                    <PasswordInput
                      name="password"
                      id="password"
                      ref={register({
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must have at least 8 characters',
                        },
                      })}
                      placeholder="Enter new password"
                    />
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.password_confirm}>
                    <FormLabel htmlFor="password_confirm">
                      Confirm password
                    </FormLabel>
                    <PasswordInput
                      name="password_confirm"
                      id="password_confirm"
                      ref={register({
                        validate: (value) =>
                          value === password.current ||
                          'Passwords do not match',
                      })}
                      placeholder="Enter new password"
                    />
                    <FormErrorMessage>
                      {errors.password_confirm &&
                        errors.password_confirm.message}
                    </FormErrorMessage>
                  </FormControl>

                  <GridItem>
                    <Button mt={2} type="submit" isLoading={isLoading}>
                      Submit
                    </Button>
                  </GridItem>
                </Grid>
              </form>
            </Card>
          )}
        </Container>
      </PageContainer>
    </ChakraWrapper>
  );
}

ResetPassword.propTypes = {
  token: PropTypes.string,
};
