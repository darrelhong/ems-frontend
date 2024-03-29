import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { InfoOutlined } from '@material-ui/icons';
import { Card, Col, Container, Row } from 'react-bootstrap';

import api from 'lib/ApiClient';

import { BreadcrumbOne } from 'components/Breadcrumb';
import MaterialTable from 'lib/MaterialTable';
import CenterSpinner from 'components/custom/CenterSpinner';
import AdminWrapper from 'components/wrapper/AdminWrapper';

const getBusinessPartners = async () => {
  const { data } = await api.get('/api/partner/all');
  return data;
};

export default function AdminBusinessParters() {
  const router = useRouter();

  const { data, isLoading } = useQuery('businessPartners', getBusinessPartners);

  const columns = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'enabled', title: 'Enabled', type: 'boolean' },
  ];

  return (
    <AdminWrapper title="Business Partners">
      <BreadcrumbOne pageTitle="Business Partners">
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
        {isLoading && <CenterSpinner />}

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

        <Row className="mt-4">
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Text>Create business partner</Card.Text>
                <Link href="/admin/bizpartners/create">
                  <button className="btn btn-fill-out btn-sm">Create</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWrapper>
  );
}
