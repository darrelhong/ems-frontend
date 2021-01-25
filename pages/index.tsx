import Head from 'next/head';
import {
  Box,
  Heading,
  Button,
  Stack,
  Text,
  useColorModeValue,
  Grid,
} from '@chakra-ui/react';

import NavBar from '../components/NavBar';
import PageContainer from '../components/PageContainer';

function Card({ children }): JSX.Element {
  return (
    <Box
      w="xs"
      borderRadius="lg"
      p={3}
      bg={useColorModeValue('white', 'gray.600')}
    >
      {children}
    </Box>
  );
}

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
          <Card>
            <Heading as="h3" size="md" mb={2}>
              For Event Organisers ➜
            </Heading>
            <Text mb={3}>Create/host events and exhibitions</Text>
            <Stack direction="row">
              <Button colorScheme="purple" size="sm">
                Login
              </Button>
              <Button colorScheme="purple" variant="outline" size="sm">
                Sign up
              </Button>
            </Stack>
          </Card>
          <Card>
            <Heading as="h3" size="md" mb={2}>
              For Business Partners ➜
            </Heading>
            <Text mb={3}>Register for events</Text>
            <Stack direction="row">
              <Button colorScheme="purple" size="sm">
                Login
              </Button>
              <Button colorScheme="purple" variant="outline" size="sm">
                Sign up
              </Button>
            </Stack>
          </Card>
        </Grid>
      </PageContainer>
    </>
  );
}
