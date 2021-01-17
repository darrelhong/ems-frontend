import Head from "next/head";
import {
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Heading,
  Flex,
  Spacer,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

export default function Home({
  launchesPast,
}: {
  launchesPast: Array<Object>;
}) {
  console.log(launchesPast);

  const boxBg = useColorModeValue("gray.50", "gray.700");

  return (
    <>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* nav */}
      <Flex w="100%" p={2} borderBottom="1px" borderColor="gray.200">
        <Spacer />
        <ColorModeSwitcher />
      </Flex>

      {/* responsive container */}
      <Container
        w="100%"
        maxW={["100%", "100%", "60em", "60em", "72em"]}
        minH="100vh"
        p={3}
      >
        <Heading textAlign="center" mb={3}>
          SpaceX Land
        </Heading>
        <Grid rowGap={2}>
          {launchesPast.map((launch, index) => (
            <Box bg={boxBg} borderRadius="md" key={index} p={2}>
              <Text color="pink.400">{launch.mission_name}</Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const { launchesPast } = await request(
    "https://api.spacex.land/graphql/",
    gql`
      {
        launchesPast(limit: 10) {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
          }
          rocket {
            rocket_name
            first_stage {
              cores {
                flight
                core {
                  reuse_count
                  status
                }
              }
            }
            second_stage {
              payloads {
                payload_type
                payload_mass_kg
                payload_mass_lbs
              }
            }
          }
          ships {
            name
            home_port
            image
          }
        }
      }
    `
  );
  return {
    props: { launchesPast },
  };
}
