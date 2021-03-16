import Link from 'next/link';
import { Container } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';

import { BreadcrumbOne } from '../../components/Breadcrumb';
import PartnerWrapper from '../../components/wrapper/PartnerWrapper';

export default function PartnerHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <PartnerWrapper title="Home">
      <BreadcrumbOne pageTitle="Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/partner/home">
              <a>Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4" style={{ zIndex: -1,
    position:"relative" }}>
        {isLoading && <div className="spinner-grow" role="status" />}
        {isSuccess && (
          <>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
          </>
        )}

        <Link href="/partner/events">
          <button className="btn btn-fill-out btn-sm">View events</button>
        </Link>
        &nbsp;
        <Link href="/partner/view/partners">
          <button className="btn btn-fill-out btn-sm">View Partners</button>
        </Link>
        &nbsp;
        <Link href="/partner/view/organisers">
          <button className="btn btn-fill-out btn-sm">View Organisers</button>
        </Link>
      </Container>
    </PartnerWrapper>
  );
}
