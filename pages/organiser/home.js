import Link from 'next/link';
import { Card, Col, Container, Row } from 'react-bootstrap';
import OrgBoothDashboard from '../../components/OrgBoothDashboard';

import useUser from '../../lib/query/useUser';

import { BreadcrumbOne } from '../../components/Breadcrumb';
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';

export default function OrganiserHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <OrganiserWrapper title="Home">
      <BreadcrumbOne pageTitle="Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/home">
              <a> Home</a>
            </Link>
          </li>
        </ol>

        {/* <ol>
          <li>
            <Link href="/organiser/events">
              <a>View Events</a>
            </Link>
          </li>

          <li>
            <Link href="/organiser/events/create">
              <a>Create Event</a>
            </Link>
          </li>
        </ol> */}
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

  );
}
