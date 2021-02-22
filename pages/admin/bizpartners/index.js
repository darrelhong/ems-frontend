import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { InfoOutlined } from '@material-ui/icons';
import { Col, Container, Row } from 'react-bootstrap';

import api from '../../../lib/ApiClient';

import withProtectRoute from '../../../components/ProtectRouteWrapper';
import AdminHeaderTop from '../../../components/Header/AdminHeaderTop';
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import MaterialTable from '../../../lib/MaterialTable';
import { FooterOne } from '../../../components/Footer';

const getBusinessPartners = async () => {
  const { data } = await api.get('/api/partner/all');
  return data;
};

function AdminBusinessParters() {
  const router = useRouter();

  const { data, isLoading } = useQuery('businessPartners', getBusinessPartners);

  const columns = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'enabled', title: 'Enabled', type: 'boolean' },
  ];

  return (
    <>
      <Head>
        <title>Business Partners</title>
      </Head>

      <AdminHeaderTop />

      <BreadcrumbOne pageTitle="Event Organisers">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/admin/home">
              <a>Admin Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Business partners</li>
        </ol>
      </BreadcrumbOne>

      <Container className="space-pt--r70 space-pb--r70">
        {isLoading && (
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {data && (
          <Row>
            <Col>
              <MaterialTable
                title="Business Partners"
                columns={columns}
                data={data}
                options={{
                  filtering: true,
                  actionsColumnIndex: -1,
                }}
                actions={[
                  {
                    icon: InfoOutlined,
                    tooltip: 'View business partner',
                    onClick: (event, rowData) => {
                      router.push(`bizpartners/${rowData.id}`);
                    },
                  },
                ]}
              />
            </Col>
          </Row>
        )}
      </Container>

      <FooterOne />
    </>
  );
}

export default withProtectRoute(AdminBusinessParters, {
  redirectTo: '/admin/login',
});
