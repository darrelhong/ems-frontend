import Head from 'next/head';
import { Heading, Button, Stack, Text, Grid } from '@chakra-ui/react';

import NavBar from '../components/NavBar/NavBar';
import PageContainer from '../components/PageContainer';
import Card from '../components/Card';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <PageContainer fullHeight={false}>
        <Heading textAlign="center" mb={10} mt={2}>
          Event Management System
        </Heading>
        <Grid
          gridAutoFlow={['row', 'row', 'column']}
          gap={4}
          justifyContent="center"
        >
          <Card w="xs">
            <Heading as="h3" size="md" mb={2}>
              For Event Organisers ➜
            </Heading>
            <Text mb={3}>Create/host events and exhibitions</Text>
            <Stack direction="row">
              <Link href="/organiser/login" passHref>
                <Button>Login</Button>
              </Link>
              <Button variant="outline">Sign up</Button>
            </Stack>
          </Card>
          <Card>
            <Heading as="h3" size="md" mb={2}>
              For Business Partners ➜
            </Heading>
            <Text mb={3}>Register for events</Text>
            <Stack direction="row">
              <Button>Login</Button>
              <Button variant="outline">Sign up</Button>
            </Stack>
          </Card>
        </Grid>
      </PageContainer>
    </>
  );
}
