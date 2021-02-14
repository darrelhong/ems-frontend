import Head from 'next/head';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';

import withProtectRoute from '../../components/ProtectRouteWrapper';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { FooterOne } from '../../components/Footer';
import OrganiserHeader from '../../components/Header/OrganiserHeader';

function OrganiserHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <>
      <Head>
        <title>Organiser Home</title>
      </Head>

      <OrganiserHeader />

      <BreadcrumbOne pageTitle="Organiser Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/home">
              <a>Organiser Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container>
        {isLoading && <div className="spinner-grow" role="status" />}
        {isSuccess && (
          <>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
          </>
        )}
      </Container>

      <FooterOne />
    </>
    // <ChakraWrapper>
    //   <OrganiserPageWrapper title="Organiser Dashboard">
    //     <Heading>Organiser Home</Heading>
    //     {isLoading && <Skeleton height="40px" />}
    //     {isSuccess && (
    //       <>
    //         <Text>Name: {user?.name}</Text>
    //         <Text>User ID: {user?.id}</Text>
    //       </>
    //     )}
    //   </OrganiserPageWrapper>
    // </ChakraWrapper>
  );
}

export default withProtectRoute(OrganiserHome, {
  redirectTo: '/organiser/login',
});
