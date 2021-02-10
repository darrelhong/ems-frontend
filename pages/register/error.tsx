import Head from 'next/head';
import Link from 'next/link';
import { Alert, AlertIcon, Button, Container, Text } from '@chakra-ui/react';

import NavBar from '../../components/NavBar/NavBar';
import PageContainer from '../../components/PageContainer';
import { GetServerSideProps } from 'next';
import { useMutation } from 'react-query';
import api from '../../lib/ApiClient';
import ChakraWrapper from '../../components/ChakraWrapper';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      token: query?.token ?? '',
    },
  };
};

export default function RegisterVerificationError({
  token,
}: {
  token: string;
}): JSX.Element {
  const {
    mutate,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(({ token }: { token: string }) =>
    api.get(`/api/user/register/resend?token=${token}`)
  );

  return (
    <ChakraWrapper>
      <Head>
        <title>Email verification unsuccesful!</title>
      </Head>

      <NavBar />

      <PageContainer centerContent>
        <Text mt={10} fontWeight="bold">
          Your email could not be verified.{' '}
          {token && 'Your verfication link may have expired.'}
        </Text>
        {token ? (
          <Button
            mt={4}
            isLoading={isLoading}
            onClick={() => {
              mutate({ token });
            }}
          >
            Resend verification email
          </Button>
        ) : (
          <Link href="/" passHref>
            <Button mt={4}>Back to home</Button>
          </Link>
        )}

        <Container maxW="sm" mt={4}>
          {isError && (
            <Alert status="error">
              <AlertIcon />
              An error occured.
            </Alert>
          )}
          {isSuccess && (
            <Alert status="success">
              <AlertIcon />
              Verification email resent. Please check your inbox.
            </Alert>
          )}
        </Container>
      </PageContainer>
    </ChakraWrapper>
  );
}
