import Head from "next/head";
import { Box, Text, Link, VStack, Code, Grid, Heading } from "@chakra-ui/react";

import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Heading></Heading>
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
    </>
  );
}
