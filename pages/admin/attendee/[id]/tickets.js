import PropTypes from 'prop-types';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { format, parseISO } from 'date-fns';
import { Alert, Container } from 'react-bootstrap';

import api from 'lib/ApiClient';
import MaterialTable from 'lib/MaterialTable';

import { BreadcrumbOne } from 'components/Breadcrumb';
import CenterSpinner from 'components/custom/CenterSpinner';
import AdminWrapper from 'components/wrapper/AdminWrapper';

const getAttendeeTickets = async (id) => {
  const { data } = await api.get(`/api/ticketing/attendee/${id}`);
  return data;
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      ...query,
    },
  };
}

const columns = [
  { field: 'id', title: 'Ticket Transaction ID' },
  { field: 'paymentStatus', title: 'Payment Status' },
  {
    field: 'dateTimeOrdered',
    title: 'Order Time',
    render: (row) =>
      format(parseISO(row.dateTimeOrdered), 'dd MMM yy hh:mmbbb'),
  },
  { field: 'eid', title: 'Event ID' },
  { field: 'name', title: 'Event Name' },
];

export default function AdminAttendeeTickets({ id }) {
  const { data, status } = useQuery(['attendee', id], () =>
    getAttendeeTickets(id)
  );

  return (
    <AdminWrapper title="Attendee Tickets">
      <BreadcrumbOne pageTitle="Attendee Details">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/admin/home">
              <a>Admin Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/admin/attendee">
              <a>Attendee</a>
            </Link>
          </li>
          <li className="breadcrumb-item ">
            <Link href={`/admin/attendee/${id}`}>
              <a>Details</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Tickets</li>
        </ol>
      </BreadcrumbOne>

      <Container className="my-4">
        {status == 'loading' ? (
          <CenterSpinner />
        ) : status == 'error' ? (
          <Alert variant="danger">An error has occured</Alert>
        ) : (
          <MaterialTable
            title="Ticket transactions"
            columns={columns}
            data={data.map((row) => ({
              ...row,
              ...row.event,
            }))}
            options={{
              filtering: true,
              sorting: true,
            }}
          />
        )}
      </Container>
    </AdminWrapper>
  );
}

AdminAttendeeTickets.propTypes = {
  id: PropTypes.string,
};
