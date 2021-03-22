import Head from 'next/head';
import Link from 'next/link';
import { useQuery, useQueryClient } from 'react-query';
import MaterialTable from '../../lib/MaterialTable';
import { Card, Col, Container, Row, Modal, Button } from 'react-bootstrap';
import {
  CheckCircleOutline,
  RemoveCircleOutline,
  InfoOutlined,
} from '@material-ui/icons';

import api from '../../lib/ApiClient';

import { FooterOne } from '../../components/Footer';
import AdminHeaderTop from '../../components/Header/AdminHeaderTop';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import withProtectRoute from '../../components/ProtectRouteWrapper';
import { useRouter } from 'next/router';
import useUser from '../../lib/query/useUser';
import {
  getAllVipsByOrganiser,
  deleteSelectedVip,
} from '../../lib/query/useVip';
import React, { useState, useEffect } from 'react';
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';
// const getEventOrganisers = async () => {
//   const { data } = await api.get('/api/organiser/all');
//   return data;
// };

function ViewAllVipPartnersNew() {
  const [vips, setVips] = useState([]);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedRow, setSelectedRow] = useState(null);

  //   const queryClient = useQueryClient();
  //   const { data, isLoading } = useQuery('eventOrganisers', getEventOrganisers);
  const { data: user } = useUser(localStorage.getItem('userId'));

  useEffect(() => {
    if (user != null) {
      const getVips = async () => {
        const data = await getAllVipsByOrganiser();
        setVips(data);
      };
      getVips();
    }
  }, [user]);

  const markDelete = (currVip) => {
    setShow(true);
    setSelectedRow(currVip);
  };

  const confirmDeleteVip = async () => {
    console.log('selected Row');
    console.log(selectedRow);
    await deleteSelectedVip(selectedRow.id);
    setShow(false);
    const getVips = async () => {
      const data = await getAllVipsByOrganiser();
      setVips(data);
    };
    getVips();
  };

  const columns = [
    {
      field: 'profilePic',
      title: 'Partner',
      filtering: false,
      search: false,
      render: (row) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60px',
          }}
        >
          {row.profilePic != null && (
            <img
              style={{ maxHeight: '80px', maxWidth: '130px' }}
              alt="my image"
              src={row.profilePic}
            />
          )}
          {row.profilePic == null && (
            <img
              style={{ maxHeight: '80px', maxWidth: '130px' }}
              alt="my image"
              src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
            />
          )}
        </div>
      ),
    },
    { field: 'name', title: 'Name' },
    { field: 'businessCategory', title: 'Category' },
    { field: 'email', title: 'Email' },
  ];

  return (
    <>
      <OrganiserWrapper title="VIP Business Partners">
        <Head>
          <title>VIP Business Partners</title>
        </Head>

        <BreadcrumbOne pageTitle="VIP Business Partners">
          <ol className="breadcrumb justify-content-md-end">
            <li className="breadcrumb-item">
              <Link href="/organiser/home">
                <a>Home</a>
              </Link>
            </li>
            <li className="breadcrumb-item active">VIP Business Partners</li>
          </ol>
        </BreadcrumbOne>

        <Container className="space-pt--30 space-pb--30">
          {/* {isLoading && (
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )} */}
          {/* {data && ( */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the VIP?</Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-fill-out btn-sm"
                onClick={confirmDeleteVip}
              >
                Yes
              </button>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="btn-sm"
              >
                No
              </Button>
            </Modal.Footer>
          </Modal>
          <Row>
            <Col>
              <MaterialTable
                title="VIP Business Partners"
                columns={columns}
                data={vips}
                options={{
                  filtering: true,
                  actionsColumnIndex: -1,
                }}
                actions={[
                  //   (rowData) => ({
                  //     icon: RemoveCircleOutline,
                  //     tooltip: 'Delete VIP',
                  //     onClick: (event, rowData) => {
                  //       api
                  //         .post(`/api/organiser/reject/${rowData.id}`, {
                  //           message: 'Default message',
                  //         })
                  //         .then(() => {
                  //           // queryClient.invalidateQueries('eventOrganisers');
                  //         });
                  //     },
                  //   }),
                  (rowData) => ({
                    icon: RemoveCircleOutline,
                    tooltip: 'Delete VIP',
                    onClick: (event, rowData) => {
                      markDelete(rowData);
                    },
                  }),
                ]}
              />
            </Col>
          </Row>
          {/* )} */}
        </Container>
      </OrganiserWrapper>
    </>
  );
}

export default withProtectRoute(ViewAllVipPartnersNew, {
  redirectTo: '/organiser/login',
});
