import { useState } from 'react';
import Head from 'next/head';
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import Card from './Card';
import NavBar from './NavBar/NavBar';
import PageContainer from './PageContainer';
import { login } from '../lib/auth';

type AdminLoginProps = {
  info?: string;
  heading: string;
  loginApiUrl: string;
  loginSuccessUrl: string;
};

export default function LoginPage({
  info,
  heading,
  loginApiUrl,
  loginSuccessUrl,
}: AdminLoginProps): JSX.Element {
  const { register, handleSubmit, errors, formState } = useForm();
  const [loginError, setLoginError] = useState(null);
  const onSubmit = async (data) => {
    login(data, loginApiUrl, loginSuccessUrl, setLoginError);
  };

  return (
    <>
      <Head>
        <title>{heading}</title>
      </Head>

      <NavBar />

      <PageContainer>
        <Center>
          <Grid w="xs" rowGap={2}>
            <Heading mt={4} textAlign="center" size="lg">
              {heading}
            </Heading>
            {info == 'noToken' && (
              <Alert status="error" size="xs">
                <AlertIcon />
                Session timed out. Please sign in again.
              </Alert>
            )}
            <Card>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid rowGap={3}>
                  <FormControl isInvalid={errors.email} isRequired>
                    <FormLabel htmlFor="email">Email address</FormLabel>
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
                  <FormControl isInvalid={errors.password} isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      name="password"
                      id="password"
                      ref={register({ required: true })}
                    />
                    <FormErrorMessage>
                      {errors.password && 'Password is required'}
                    </FormErrorMessage>
                  </FormControl>
                  {loginError && (
                    <FormControl isInvalid={loginError}>
                      <FormErrorMessage>{loginError}</FormErrorMessage>
                    </FormControl>
                  )}
                  <Button
                    mt={2}
                    type="submit"
                    isLoading={formState.isSubmitting}
                  >
                    Log in
                  </Button>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Center>
      </PageContainer>
    </>
  );
}
