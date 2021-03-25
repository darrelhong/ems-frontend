import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import MaterialTable from 'lib/MaterialTable';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { InfoOutlined } from '@material-ui/icons';

import api from 'lib/ApiClient';

import { FooterOne } from 'components/Footer';
import AdminHeaderTop from 'components/Header/AdminHeaderTop';
import { BreadcrumbOne } from 'components/Breadcrumb';
import withProtectRoute from 'components/ProtectRouteWrapper';
import CenterSpinner from 'components/custom/CenterSpinner';

const getEventOrganisers = async () => {
  const { data } = await api.get('/api/organiser/all');
  return data;
};

function AdminEventOrg() {
  const router = useRouter();

  const { data, isLoading } = useQuery('eventOrganisers', getEventOrganisers);

  const columns = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'enabled', title: 'Enabled', type: 'boolean' },
    { field: 'approved', title: 'Approved', type: 'boolean' },
  ];

  return (
    <>
      <Head>
        <title>Event Organisers</title>
      </Head>

      <AdminHeaderTop />

      <BreadcrumbOne pageTitle="Event Organisers">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/admin/home">
              <a>Admin Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Event organisers</li>
        </ol>
      </BreadcrumbOne>

      <Container className="space-pt--30 space-pb--30">
        {isLoading && <CenterSpinner />}
        {data && (
          <Row>
            <Col>
              <MaterialTable
                title="Event Organisers"
                columns={columns}
                data={data}
                options={{
                  filtering: true,
                  actionsColumnIndex: -1,
                }}
                actions={[
                  {
                    icon: InfoOutlined,
                    tooltip: 'View event organiser',
                    onClick: (event, rowData) => {
                      router.push(`eventorg/${rowData.id}`);
                    },
                  },
                ]}
              />
            </Col>
          </Row>
        )}

        <Row className="mt-4">
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Text>Create event organiser</Card.Text>
                <Link href="/admin/eventorg/create">
                  <button className="btn btn-fill-out btn-sm">Create</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <FooterOne />
    </>
  );
}

export default withProtectRoute(AdminEventOrg, {
  redirectTo: '/admin/login',
});
