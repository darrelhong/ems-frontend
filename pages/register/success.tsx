import Head from 'next/head';
import Link from 'next/link';
import { Button, Text } from '@chakra-ui/react';

import NavBar from '../../components/NavBar/NavBar';
import PageContainer from '../../components/PageContainer';

export default function RegisterSucces(): JSX.Element {
  return (
    <>
      <Head>
        <title>Registration succesful!</title>
      </Head>

      <NavBar />

      <PageContainer centerContent>
        <Text mt={10} fontWeight="bold" textAlign="center">
          You have succesfully registered. Please check your inbox to verify
          your email.
        </Text>
        <Link href="/" passHref>
          <Button mt={4}>Back to home</Button>
        </Link>
      </PageContainer>
    </>
  );
}
