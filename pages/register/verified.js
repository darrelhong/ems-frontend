import Head from 'next/head';
import Link from 'next/link';
import { Button, Grid, Text } from '@chakra-ui/react';

import NavBar from '../../components/NavBar/NavBar';
import PageContainer from '../../components/PageContainer';
import ChakraWrapper from '../../components/ChakraWrapper';

export default function RegisterVerified() {
  return (
    <ChakraWrapper>
      <Head>
        <title>Email verification succesful!</title>
      </Head>

      <NavBar />

      <PageContainer centerContent>
        <Text mt={10} fontWeight="bold" textAlign="center">
          Email succesfully verified. Please proceed to login.
        </Text>
        <Grid gridAutoFlow={{ sm: 'column' }} columnGap={2}>
          <Link href="/organiser/login" passHref>
            <Button mt={4}>Event Organiser Login</Button>
          </Link>
          <Link href="/partner/login" passHref>
            <Button mt={4}>Business Partner Login</Button>
          </Link>
        </Grid>
      </PageContainer>
    </ChakraWrapper>
  );
}



