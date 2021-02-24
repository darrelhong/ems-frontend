import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import api from '../../../lib/ApiClient';

import { BreadcrumbOne } from '../../../components/Breadcrumb';
import { FooterOne } from '../../../components/Footer';
import AdminHeaderTop from '../../../components/Header/AdminHeaderTop';
import withProtectRoute from '../../../components/ProtectRouteWrapper';

const getBusinessPartner = async (id) => {
  const { data } = await api.get(`/api/partner/${id}`);
  return data;
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      ...query,
    },
  };
}

function BusinessPartnerDetails({ id }) {
  // data fetching
  const { data: bp, isLoading } = useQuery(['partner', id], () =>
    getBusinessPartner(id)
  );

  // onClick handlers
  const queryClient = useQueryClient();
  const useMutationInvalidate = (fn, options) =>
    useMutation(fn, {
      onSuccess: () => {
        queryClient.invalidateQueries(['partner', id]);
      },
      ...options,
    });

  const { mutate: enable } = useMutationInvalidate((id) =>
    api.post(`/api/user/enable/${id}`)
  );

  const { mutate: disable } = useMutationInvalidate((id) =>
    api.post(`/api/user/disable/${id}`)
  );

  return (
    <>
      <Head>
        <title>Business Partner details</title>
      </Head>

      <AdminHeaderTop />

      <BreadcrumbOne pageTitle="Event Organiser Details">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/admin/home">
              <a>Admin Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/admin/bizpartners">
              <a>Event Organisers</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Details</li>
        </ol>
      </BreadcrumbOne>

      <Container className="space-pt--r70 space-pb--r70">
        {isLoading && (
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {bp && (
          <>
            <dl className="row">
              <dt className="col-sm-3">ID</dt>
              <dd className="col-sm-9">{bp.id}</dd>

              <dt className="col-sm-3">Name</dt>
              <dd className="col-sm-9">{bp.name}</dd>

              <dt className="col-sm-3">Email</dt>
              <dd className="col-sm-9">{bp.email}</dd>

              <dt className="col-sm-3">Description</dt>
              <dd className="col-sm-9">{bp.description || '-'}</dd>

              <dt className="col-sm-3">Phone no.</dt>
              <dd className="col-sm-9">{bp.phoneNumber || '-'}</dd>

              <dt className="col-sm-3">Address</dt>
              <dd className="col-sm-9">{bp.address || '-'}</dd>

              <dt className="col-sm-3">Status</dt>
              <dd className="col-sm-9">
                {bp.enabled ? 'Enabled' : 'Disabled'}
              </dd>
            </dl>

            <Row>
              <Col>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  disabled={bp.enabled}
                  onClick={() => enable(id)}
                >
                  Enable
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  disabled={!bp.enabled}
                  onClick={() => disable(id)}
                >
                  Disable
                </button>
              </Col>
            </Row>
          </>
        )}
      </Container>

      <FooterOne />
    </>
  );
}

BusinessPartnerDetails.propTypes = {
  id: PropTypes.string,
};

export default withProtectRoute(BusinessPartnerDetails, {
  redirectTo: '/admin/login',
});
