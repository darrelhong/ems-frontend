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
    <OrganiserWrapper title="Home">
      <BreadcrumbOne pageTitle="Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/home">
              <a>Home</a>
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
        <div>
        {isLoading && <div className="spinner-grow" role="status" />}
        {isSuccess && (
          <>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
          </>
        )}

<Link href="/organiser/events">
          <button className="btn btn-fill-out btn-sm">View events</button>
        </Link>
        &nbsp;
        <Link href="/organiser/view/partners">
          <button className="btn btn-fill-out btn-sm">View Partners</button>
        </Link>
        &nbsp;
        <Link href="/organiser/view/organisers">
          <button className="btn btn-fill-out btn-sm">View Organisers</button>
        </Link>
        </div>
      </Container>
    </OrganiserWrapper>
    
  );
}
