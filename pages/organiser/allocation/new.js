import Link from 'next/link';

import { BreadcrumbOne } from 'components/Breadcrumb';
import OrganiserWrapper from 'components/wrapper/OrganiserWrapper';
import Allocation from 'components/Booth/new/Allocation';
import { Container } from 'react-bootstrap';

export default function OrganiserAllocation() {
  return (
    <OrganiserWrapper>
      <BreadcrumbOne pageTitle="Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/home">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Allocation</li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        <Allocation />
      </Container>
    </OrganiserWrapper>
  );
}
