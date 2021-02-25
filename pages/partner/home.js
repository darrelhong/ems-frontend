import Link from 'next/link';
import { Container } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';

import PartnerWrapper from '../../components/wrapper/PartnerWrapper';
import { BreadcrumbOne } from '../../components/Breadcrumb';

function PartnerHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <PartnerWrapper title="Partner Home">
      <BreadcrumbOne pageTitle="Partner Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/partner/home">
              <a>Partner Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        {isLoading && <div className="spinner-grow" role="status" />}
        {isSuccess && (
          <>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
          </>
        )}

        <button className="btn btn-fill-out btn-sm">View events</button>
      </Container>
    </PartnerWrapper>
  );
}

export default PartnerHome;
