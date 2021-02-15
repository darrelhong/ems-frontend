import Head from 'next/head';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';

import withProtectRoute from '../../components/ProtectRouteWrapper';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { FooterOne } from '../../components/Footer';
import AdminHeaderTop from '../../components/Header/AdminHeaderTop';

function AdminHome() {
  const { data: user, isSuccess, isLoading } = useUser(
    localStorage.getItem('userId')
  );

  return (
    <>
      <Head>
        <title>Admin Dasboard</title>
      </Head>

      <AdminHeaderTop />

      <BreadcrumbOne pageTitle="Admin Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/admin/home">
              <a>Admin Home</a>
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
    //   <Head>
    //     <title>Admin Dasboard</title>
    //   </Head>
    //   <AdminNavBar />

    //   <PageContainer>
    //     <Heading>Admin Home</Heading>
    //     {isLoading && <Skeleton height="40px" />}
    //     {isSuccess && (
    //       <>
    //         <Text>{user?.name}</Text>
    //         <Text>User ID: {user?.id}</Text>
    //       </>
    //     )}
    //   </PageContainer>
    // </ChakraWrapper>
  );
}

export default withProtectRoute(AdminHome, { redirectTo: '/admin/login' });
