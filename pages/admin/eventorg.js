import Head from 'next/head';
import Link from 'next/link';
import { useQuery, useQueryClient } from 'react-query';
import MaterialTable from '../../lib/MaterialTable';
import { Container } from 'react-bootstrap';
import { CheckCircleOutline, RemoveCircleOutline } from '@material-ui/icons';

import api from '../../lib/ApiClient';

import { FooterOne } from '../../components/Footer';
import AdminHeaderTop from '../../components/Header/AdminHeaderTop';
import { BreadcrumbOne } from '../../components/Breadcrumb';

const getEventOrganisers = async () => {
  const { data } = await api.get('/api/organiser/all');
  return data;
};

export default function AdminEventOrg() {
  const queryClient = useQueryClient();
  const { data } = useQuery('eventOrganisers', getEventOrganisers);

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

      <Container>
        {data && (
          <div className="table space-pt--30 space-pb--30">
            <MaterialTable
              title="Event Organisers"
              columns={columns}
              data={data}
              options={{
                filtering: true,
                actionsColumnIndex: -1,
              }}
              actions={[
                (rowData) => ({
                  icon: CheckCircleOutline,
                  tooltip: 'Approve organiser',
                  onClick: (event, rowData) => {
                    api
                      .post(`/api/organiser/approve/${rowData.id}`)
                      .then(() => {
                        queryClient.invalidateQueries('eventOrganisers');
                      });
                  },
                  disabled: rowData.approved,
                }),
                (rowData) => ({
                  icon: RemoveCircleOutline,
                  tooltip: 'Reject organiser',
                  onClick: (event, rowData) => {
                    api
                      .post(`/api/organiser/reject/${rowData.id}`, {
                        message: 'Default message',
                      })
                      .then(() => {
                        queryClient.invalidateQueries('eventOrganisers');
                      });
                  },
                  disabled: !rowData.approved,
                }),
              ]}
            />
          </div>
        )}
      </Container>

      <FooterOne />
    </>
  );
}
