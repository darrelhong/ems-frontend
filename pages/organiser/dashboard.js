import Link from 'next/link';
import { Container } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';

import { BreadcrumbOne } from '../../components/Breadcrumb';
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';
import OrgBoothDashboard from '../../components/OrgBoothDashboard';

import getAllPendingBoothApplication from '../../lib/query/analytics';
export default function OrganiserDashboard() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    // whats the difference between dashboard and home
    <OrganiserWrapper title="Dashboard">
      <BreadcrumbOne pageTitle={'Welcome ' + user?.name}>
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/dashboard">
              <a>Organiser Dashboard</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container>
        {isLoading && <div className="spinner-grow" role="status" />}
        {isSuccess && (
          <>
            <br></br>
            <h4>Booth Application Dashboard</h4>
            <br></br>
            <OrgBoothDashboard></OrgBoothDashboard>
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
