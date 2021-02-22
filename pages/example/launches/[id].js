import PropTypes from 'prop-types';
import Head from 'next/head';
import { request, gql } from 'graphql-request';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Box, Grid, Heading, Img, Text } from '@chakra-ui/react';
import PageContainer from '../../../components/PageContainer';
import NavBar from '../../../components/NavBar/NavBar';
import ChakraWrapper from '../../../components/ChakraWrapper';

// export const getStaticPaths = async () => {
//   const { launchesPast } = await request(
//     'https://api.spacex.land/graphql/',
//     gql`
//       {
//         launchesPast(limit: 10) {
//           id
//         }
//       }
//     `
//   );
//   const paths = launchesPast.map(({ id }) => ({
//     params: { id },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

const getLaunch = async (id) => {
  const { launch } = await request(
    'https://api.spacex.land/graphql/',
    gql`
    {
      launch(id: ${id}) {
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

  return launch;
};

export const getServerSideProps = async ({ query }) => {
  const id = query.id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['launch', id], () => getLaunch(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
};

export default function Launch({ id }) {
  const { data } = useQuery(['launch', id], getLaunch, {
    staleTime: 60000,
  });

  return (
    <ChakraWrapper>
      <Head>
        <title>{data.mission_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <PageContainer>
        <Grid justifyItems="center">
          <Heading mb={8}>{data.mission_name}</Heading>
          <Img
            src={data.links.mission_patch_small}
            alt="mission_patch"
            mb={8}
          />
          <Box>
            <Text fontSize="xl">{`Rocket: ${data.rocket.rocket_name}`}</Text>
            <Text>{`Type: ${data.rocket.rocket_type}`}</Text>
          </Box>
        </Grid>
      </PageContainer>
    </ChakraWrapper>
  );
}

Launch.propTypes = {
  id: PropTypes.string,
};
