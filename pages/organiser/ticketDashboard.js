import Link from 'next/link';
import { Container } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';

import { BreadcrumbOne } from '../../components/Breadcrumb';
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';
import OrgTicketDashboard from '../../components/OrgTicketDashboard';
import PieBasicChart from '../../components/PieBasicChart';
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
            <h4>Event Ticket Dashboard</h4>
            <OrgTicketDashboard></OrgTicketDashboard>
            <PieBasicChart></PieBasicChart>
          </>
        )}
      </Container>
    </OrganiserWrapper>
  );
}
