import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';

import { useEventDetails } from 'lib/query/events';
import { getSellerApplicationsFromBpId } from 'lib/query/sellerApplicationApi';

import { BreadcrumbOne } from 'components/Breadcrumb';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import EventImageGallery from 'components/events/partner/EventImageGallery';
import AddToCalendar from 'components/custom/AddToCalendar';
import ShareButton from 'components/custom/ShareButton';
import CenterSpinner from 'components/custom/CenterSpinner';
import useUser from 'lib/query/useUser';
import BPPaymentModal from 'components/events/registration/BPPaymentModal';
import RegisterModal from 'components/events/registration/RegisterModal';
import WithdrawModal from 'components/events/registration/WithdrawModal';
import { getBoothTotalFromEvent } from 'lib/functions/boothFunctions';
import { useToasts } from 'react-toast-notifications';

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

export default function PartnerEventPage({ id }) {
  const { data, status } = useEventDetails(id);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [boothTotal, setBoothTotal] = useState(0);
  const { data: user } = useUser(localStorage.getItem('userId'));
  const bpId = localStorage.getItem('userId');
  const [applicationMade, setApplicationMade] = useState();
  const sellerProfile = user?.sellerProfiles.filter(sp => sp.event?.eid === data?.eid)[0]

  // const [needPay, setNeedPay] = useState(user?.sellerApplications.filter(sa => (sa.paymentStatus === "PENDING" && sa.sellerApplicationStatus === "APPROVED" && sa.boothQuantity > 0)).some(e => e.event.eid === data?.eid))
  console.log("application: ", applicationMade);
  console.log("User: ", user)
  // console.log("data: ", data)
  console.log("SP: ", sellerProfile)

  let paybtn;
  // if (sellerProfile?.booths.length > 0 & applicationMade?.paymentStatus === "PENDING") {
  if (applicationMade?.paymentStatus === "PENDING") {
    paybtn = <button
      className="btn btn-fill-out btn-sm mr-2"
      onClick={() => setShowPaymentModal(true)}>Pay</button>
  }
  else {
    paybtn = ""
  }

  useEffect(() => {
    const loadBoothTotal = async () => {
      const total = await getBoothTotalFromEvent(id);
      setBoothTotal(total);
    }
    const loadApplications = async () => {
      let applications = await getSellerApplicationsFromBpId(bpId);
      applications = applications.filter(function (application) {
        return application?.event?.eid == id;
        //added filtering done on the backend side 
        // return application?.event?.eid == id && application.sellerApplicationStatus != 'CANCELLED';
      });
      if (applications.length == 1) {
        setApplicationMade(applications[0]);
      }
    }
    loadBoothTotal();
    loadApplications();
  }, [user]);

  const { addToast, removeToast } = useToasts();

  const createToast = (message, appearanceStyle) => {
    const toastId = addToast(message, { appearance: appearanceStyle });
    setTimeout(() => removeToast(toastId), 3000);
  };

  return (
    <PartnerWrapper title={data?.name || 'Event page'}>
      <BPPaymentModal
        showPaymentModal={showPaymentModal}
        closePaymentModal={() => setShowPaymentModal(false)}
        sellerProfile={sellerProfile}
        event={data}
        partner={user} />
      <RegisterModal
        showRegisterModal={showRegisterModal}
        closeRegisterModal={() => setShowRegisterModal(false)}
        event={data}
        boothTotal={boothTotal}
        bpId={bpId}
        createToast={createToast}
        setApplicationMade={setApplicationMade}
        applicationMade={applicationMade}
      />
      <WithdrawModal
        showWithdrawModal={showWithdrawModal}
        closeWithdrawModal={() => setShowWithdrawModal(false)}
        createToast={createToast}
        applicationMade={applicationMade}
        setApplicationMade={setApplicationMade}
      />
      {status === 'loading' ? (
        <CenterSpinner />
      ) : status === 'error' ? (
        <Alert variant="danger">An error has occured</Alert>
      ) : (
        <>
          <BreadcrumbOne pageTitle="Event">
            <ol className="breadcrumb justify-content-md-end">
              <li className="breadcrumb-item">
                <Link href="/partner/home">
                  <a> Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/partner/events">
                  <a>Events</a>
                </Link>
              </li>
              <li className="breadcrumb-item active">{data.name}</li>
            </ol>
          </BreadcrumbOne>

          <Container className="space-pt--r100 space-pb--r100">
            <Row>
              <Col lg={6}>
                <EventImageGallery images={data.images} />
              </Col>
              <Col lg={6}>
                <div className="pt-3" >
                  <h3>{data.name}</h3>
                  {/* <strong className="product-description d-inline" >organised by: </strong> */}


                  <span>
                    Organised By: {" "}
                    <Link
                      href={{
                        pathname: '/organiser/organiser-profile',
                        query: {
                          paraId: JSON.stringify(data?.eventOrganiser?.id),
                        },
                      }}
                    >
                      {data?.eventOrganiser?.name}
                    </Link>{' '} </span>
                    <div>
                    <p>{data.descriptions}</p></div>
                    <br></br>
                  <span className="text-dark font-weight-bold d-inline">Location: {" "}</span>
                  <span className="d-inline"> {data.address}</span>

                 
                <br></br>

                  <span className="text-dark font-weight-bold d-inline">
                    Starts:{' '}
                  </span>
                  <span className="d-inline">
                    {format(
                      parseISO(data.eventStartDate),
                      'eee, dd MMM yy hh:mmbbb'
                    )}
                  </span>
                  <br></br>
                  <span className="text-dark font-weight-bold d-inline">Ends: </span>
                  <span className="d-inline">
                    {format(
                      parseISO(data.eventEndDate),
                      'eee, dd MMM yy hh:mmbbb'
                    )}
                  </span>

                  <br></br>

                  <AddToCalendar event={data} />

                  <br></br>
                  <br></br>

                  <span className="text-dark font-weight-bold d-inline">Sales period: </span>
                  <span className="d-inline">
                    {`${format(
                      parseISO(data.saleStartDate),
                      'dd MMM yy hh:mmbbb'
                    )} to ${format(
                      parseISO(data.salesEndDate),
                      'dd MMM yy hh:mmbbb'
                    )}`}
                  </span>

                  <br></br>
                  <br></br>
                  {boothTotal >= data.boothCapacity && !applicationMade && (
                      <p className="text-default font-weight-bold">Capacity of {data.boothCapacity} booths has been reached!</p>
                    )}
                  {boothTotal < data.boothCapacity && !applicationMade && (
                      <p className="text-default  ">{boothTotal} / {data.boothCapacity} booths already taken!</p>
                    )}
                  <div className="d-flex align-items-center"> 
                 
                    {applicationMade ? (
                      <button
                        // className="btn btn-fill-out mr-2"
                        className="btn btn-border-fill btn-sm mr-2"
                        onClick={() => setShowRegisterModal(true)}
                      // disabled
                      // disabled={!data.availableForSale}
                      >
                        View Submitted Application
                      </button>
                    ) : (
                      <button
                        // className="btn btn-fill-out mr-2"
                        className="btn btn-fill-out btn-sm mr-2"
                        disabled={boothTotal >= data.boothCapacity}
                        // disabled={!data.availableForSale}
                        onClick={() => setShowRegisterModal(true)}
                      >
                        Register Now
                      </button>
                    )}
                    {applicationMade && (
                      <button
                        className="btn btn-fill-out btn-sm mr-2"
                        // className="btn btn-fill-out mr-2"
                        // disabled={boothTotal >= data.boothCapacity}
                        onClick={() => setShowWithdrawModal(true)}
                      >
                        Withdraw Application
                      </button>
                    )}
                    {/* {(applicationMade.paymentStatus === "PENDING") && <button className="btn btn-fill-out btn-sm mr-2" onClick={() => setShowPaymentModal(true)}>Pay</button>} */}
                    {paybtn}
                    {/* <ShareButton
                  title={data.name}
                  url={`${process.env.HOSTNAME}/public/events/${id}`}
                /> */}
                   
                    
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="col-auto mt-3">
                <ShareButton
                  title={data.name}
                  url={`${process.env.HOSTNAME}/public/events/${id}`}
                />
              </Col>
            </Row>

            {/* <Row className="mt-3">
              <Col>
                <h5>About this event</h5>
                <p>{data.descriptions}</p>
              </Col>
            </Row> */}
          </Container>
        </>
      )
      }
    </PartnerWrapper >
  );
}

PartnerEventPage.propTypes = {
  id: PropTypes.string,
};
