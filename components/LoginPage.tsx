import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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

import api from '../lib/ApiClient';

import Card from './Card';
import NavBar from './NavBar/NavBar';
import PageContainer from './PageContainer';

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
  const router = useRouter();
  const { register, handleSubmit, errors, formState } = useForm();
  const [loginError, setLoginError] = useState(null);
  const onSubmit = async (data) => {
    api
      .post(loginApiUrl, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        sessionStorage.setItem('userId', res.data.user.id);
        router.push(loginSuccessUrl);
      })
      .catch(() => setLoginError('An error occured'));
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
                  <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      ref={register({ required: true })}
                    />
                    <FormErrorMessage>
                      {errors.email && 'Email is required'}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
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
