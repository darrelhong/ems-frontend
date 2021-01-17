import Head from "next/head";
import NextLink from "next/link";
import { request, gql } from "graphql-request";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../components/ColorModeSwitcher";
import PageContainer from "../../components/PageContainer";

export async function getStaticPaths() {
  const { launchesPast } = await request(
    "https://api.spacex.land/graphql/",
    gql`
      {
        launchesPast(limit: 10) {
          id
        }
      }
    `
  );
  const paths = launchesPast.map(({ id }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { launch } = await request(
    "https://api.spacex.land/graphql/",
    gql`
    {
      launch(id: ${params.id}) {
        id
        mission_name
        rocket {
          rocket_name
          rocket_type
        }
        links {
          mission_patch_small
        }
      }
    }
    `
  );

  return {
    props: {
      launch,
    },
  };
}

export default function Launch({ launch }) {
  return (
    <>
      <Head>
        <title>{launch.mission_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        w="100%"
        p={2}
        borderBottom="1px"
        borderColor="gray.200"
        alignItems="center"
      >
        <Link as={NextLink} href="/">
          Home
        </Link>
        <Spacer />
        <ColorModeSwitcher />
      </Flex>

      <PageContainer
        w="100%"
        maxW={["100%", "100%", "60em", "60em", "72em"]}
        minH="100vh"
        p={3}
      >
        <Grid justifyItems="center">
          <Heading mb={8}>{launch.mission_name}</Heading>
          <Image
            src={launch.links.mission_patch_small}
            alt="mission_patch"
            mb={8}
          />
          <Box>
            <Text fontSize="xl">{`Rocket: ${launch.rocket.rocket_name}`}</Text>
            <Text>{`Type: ${launch.rocket.rocket_type}`}</Text>
          </Box>
        </Grid>
      </PageContainer>
    </>
  );
}
