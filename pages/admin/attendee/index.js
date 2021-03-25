import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { InfoOutlined } from '@material-ui/icons';
import { Col, Container, Row } from 'react-bootstrap';

import api from 'lib/ApiClient';

import withProtectRoute from 'components/ProtectRouteWrapper';
import AdminHeaderTop from 'components/Header/AdminHeaderTop';
import { BreadcrumbOne } from 'components/Breadcrumb';
import MaterialTable from 'lib/MaterialTable';
import { FooterOne } from 'components/Footer';
import CenterSpinner from 'components/custom/CenterSpinner';

const getAttendees = async () => {
  const { data } = await api.get('/api/attendee/all');
  return data;
};

function AdminAttendees() {
  const router = useRouter();

  const { data, isLoading } = useQuery('attendees', getAttendees);

  const columns = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'enabled', title: 'Enabled', type: 'boolean' },
  ];

  return (
    <>
      <Head>
        <title>Attendees</title>
      </Head>

      <AdminHeaderTop />

      <BreadcrumbOne pageTitle="Attendees">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/admin/home">
              <a>Admin Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Attendees</li>
        </ol>
      </BreadcrumbOne>

      <Container className="space-pt--r70 space-pb--r70">
        {isLoading && <CenterSpinner />}

        {data && (
          <Row>
            <Col>
              <MaterialTable
                title="Attendees"
                columns={columns}
                data={data}
                options={{
                  filtering: true,
                  actionsColumnIndex: -1,
                }}
                actions={[
                  {
                    icon: InfoOutlined,
                    tooltip: 'View attendee details',
                    onClick: (event, rowData) => {
                      router.push(`attendee/${rowData.id}`);
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

export default withProtectRoute(AdminAttendees, {
  redirectTo: '/admin/login',
});
