import useUser from '../../lib/query/useUser';

import PartnerWrapper from '../../components/wrapper/PartnerWrapper';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

function PartnerHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <PartnerWrapper title="Partner Home">
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
    </PartnerWrapper>
  );
}

export default PartnerHome;
