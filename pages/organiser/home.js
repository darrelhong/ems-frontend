import Link from 'next/link';
import { Container } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';

import { BreadcrumbOne } from '../../components/Breadcrumb';
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';

export default function OrganiserHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <OrganiserWrapper title="Organiser Home">
      <BreadcrumbOne pageTitle={"Welcome " + user?.name} >
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/home">
              <a>Home</a>
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
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
          </>
        )}
      </Container>
    </OrganiserWrapper>
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
