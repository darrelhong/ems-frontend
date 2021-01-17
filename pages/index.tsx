import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Text,
  Link,
  Grid,
  Heading,
  Flex,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { request, gql } from "graphql-request";
import { FaExternalLinkAlt } from "react-icons/fa";

import NavBar from "../components/NavBar";
import PageContainer from "../components/PageContainer";

export default function Home({
  launchesPast,
}: {
  launchesPast: Array<Object>;
}) {
  const boxBg = useColorModeValue("gray.50", "gray.700");

  return (
    <>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* nav */}
      <NavBar />

      {/* responsive container */}
      <PageContainer fullWidth={false}>
        <Heading textAlign="center" mb={3}>
          SpaceX Land
        </Heading>
        <Grid rowGap={2}>
          {launchesPast.map((launch, index) => (
            <Box bg={boxBg} borderRadius="md" key={index} p={2}>
              <Text color="pink.400">{launch.mission_name}</Text>
              <NextLink href={`/launches/${launch.id}`}>
                <Link color="blue.400">Info</Link>
              </NextLink>
              <br />
              <Link color="blue.400" href={launch.links.wikipedia} isExternal>
                <Flex alignItems="center">
                  Wiki <Icon as={FaExternalLinkAlt} w={3} mx={2} />
                </Flex>
              </Link>
            </Box>
          ))}
        </Grid>
      </PageContainer>
    </>
  );
}

export async function getStaticProps() {
  const { launchesPast } = await request(
    "https://api.spacex.land/graphql/",
    gql`
      {
        launchesPast(limit: 10) {
          id
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            wikipedia
            video_link
          }
        }
      }
    `
  );
  return {
    props: { launchesPast },
  };
}
