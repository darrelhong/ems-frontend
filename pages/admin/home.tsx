import { Heading } from '@chakra-ui/react';
import Head from 'next/head';
import LoadingScreen from '../../components/LoadingScreen';
import NavBar from '../../components/NavBar';
import PageContainer from '../../components/PageContainer';
import useCheckToken from '../../lib/useCheckToken';

export default function AdminHome(): JSX.Element {
  const [isLoggedIn] = useCheckToken({
    redirectTo: '/admin/login',
  });

  if (!isLoggedIn) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Head>
        <title>Next App</title>
      </Head>

      <NavBar />

      <PageContainer>
        <Heading>Admin Home</Heading>
      </PageContainer>
    </>
  );
}
