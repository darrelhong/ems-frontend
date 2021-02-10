import { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import NextLink from 'next/link';
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
  Input,
  Link,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import Card from './Card';
import NavBar from './NavBar/NavBar';
import PageContainer from './PageContainer';
import { login } from '../lib/auth';

export default function LoginPage({
  info,
  heading,
  loginApiUrl,
  loginSuccessUrl,
  registerUrl,
}) {
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

      <PageContainer centerContent>
        <Heading mt={4} mb={3} textAlign="center" size="lg">
          {heading}
        </Heading>
        <Container maxW="xs">
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
                <FormControl isInvalid={errors.password}>
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
                <Button mt={2} type="submit" isLoading={formState.isSubmitting}>
                  Log in
                </Button>

                <Grid mt={2} fontSize="sm" rowGap={2}>
                  <GridItem>
                    <NextLink href={registerUrl} passHref>
                      <Link>Register</Link>
                    </NextLink>
                  </GridItem>
                  <GridItem>
                    <NextLink href="/register/forgot-password" passHref>
                      <Link>Forgot password</Link>
                    </NextLink>
                  </GridItem>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Container>
      </PageContainer>
    </>
  );
}

LoginPage.propTypes = {
  info: PropTypes.string,
  heading: PropTypes.string,
  loginApiUrl: PropTypes.string,
  loginSuccessUrl: PropTypes.string,
  registerUrl: PropTypes.string,
};
