import useUser from 'lib/query/useUser';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BreadcrumbOne } from 'components/Breadcrumb';
import OrganiserWrapper from 'components/wrapper/OrganiserWrapper';
import { useState, useEffect } from 'react';
import { getSellerApplicationsForEO, approveRejectApplication, getEventByOrganiserId } from "lib/query/sellerApplicationApi"
import ApplicationCard from "components/events/organiser/applications/ApplicationCard"
import ApproveRejectModal from 'components/events/organiser/applications/ApproveRejectModal';
import { useToasts } from 'react-toast-notifications';
import ApplicationSideBar from 'components/events/organiser/applications/ApplicationSideBar'
import { approveBpNotif, rejectBpNotif } from 'lib/query/notificationApi';
import { Container, Row, Col } from 'react-bootstrap';

export default function Applications() {

    // const { data: user } = useUser(localStorage.getItem('userId'));
    const [applications, setApplications] = useState([]);
    // const [currData, setCurrData] = ([]);
    const { data: user } = useUser(localStorage.getItem('userId'))
    const router = useRouter();
    const { eid } = router.query
    // console.log(eid)
    const [showApproveRejectModal, setShowApproveRejectModal] = useState(false);
    const [action, setAction] = useState('approve');
    const [application, setApplication] = useState(Object);
    const { addToast, removeToast } = useToasts();
    const [filterValue, setFilterValue] = useState("PENDING");
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventFilter, setEventFilter] = useState("all");


    useEffect(() => {
        if (user != null) getApplications();
    }, [user, eid, filterValue, eventFilter]);
    // console.log(filterValue)
    console.log(applications)

    const getApplications = async () => {
        const data = await getSellerApplicationsForEO(user.id);
        const eventsData = await getEventByOrganiserId(user.id);
        setEvents(eventsData);
        if (eid != null) {
            const tempData = data.filter((d) => d.event.eid == eid)
            // console.log("temp", tempData)

            setApplications(tempData.filter((d) => d.sellerApplicationStatus == filterValue))

        }
        else {
            // console.log(eventFilter + "eventFilter");
            // console.log("data", data[0].sellerApplicationStatus)
            if (eventFilter != "all") {
                const filteredData = data.filter((d) => d.event.eid == eventFilter)
                setApplications(filteredData.filter((d) => d.sellerApplicationStatus == filterValue));

            } else {
                setApplications(data.filter((d) => d.sellerApplicationStatus == filterValue));

            }
        }
    };


    const handleSubmit = async () => {
        setLoading(true);
        try {
            await approveRejectApplication(application.id, action);
            if (action == 'approve') {
                await approveBpNotif(application?.businessPartner?.id, application?.event?.eid);
                createToast('Application successfully approved!', 'success');
            } else { //reject
                await rejectBpNotif(application?.businessPartner?.id, application?.event?.eid);
                createToast('Application successfully rejected', 'success');
            }
            await getApplications(); //to reload
        } catch (e) {
            createToast('Error, please try again later', 'error');
        }
        setLoading(false);
        setShowApproveRejectModal(false);
    }

    const approveAction = () => {
        setAction('approve');
        setShowApproveRejectModal(true);
    };

    const rejectAction = () => {
        setAction('reject');
        setShowApproveRejectModal(true);
    };

    const createToast = (message, appearanceStyle) => {
        const toastId = addToast(message, { appearance: appearanceStyle });
        setTimeout(() => removeToast(toastId), 3000);
    };


    return (
        <OrganiserWrapper title="Event Applications">
            <ApproveRejectModal
                showApproveRejectModal={showApproveRejectModal}
                closeApproveRejectModal={() => setShowApproveRejectModal(false)}
                action={action}
                handleSubmit={handleSubmit}
                application={application}
                loading={loading}
            />
            <BreadcrumbOne pageTitle="View All Event Applications">
                <ol className="breadcrumb justify-content-md-end">
                    <li className="breadcrumb-item">
                        <Link href="/organiser/home">
                            <a>Organiser Home</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">Event Applications</li>
                </ol>
            </BreadcrumbOne>
            <br></br>
            <div className="my-account-content space-pt--r60 space-pb--r60">
                <Container>
                    <Row>
                        <Col lg={2} className="order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
                            <ApplicationSideBar filterValue={filterValue} setFilterValue={setFilterValue} events={events} setEventFilter={setEventFilter} />
                        </Col>

                        {/* <div className="shop-products"
                style={{
                    marginTop: '10%'
                }}
            > */}
                        <Col lg={10} md={8} >
                            {applications.length != 0 ? (
                                applications.map((app) => {
                                    return (
                                        <ApplicationCard
                                            key={app.id}
                                            app={app}
                                            approveAction={approveAction}
                                            rejectAction={rejectAction}
                                            setApplication={setApplication}
                                            renderAppRejButton={true}
                                        />
                                    )
                                })
                            ) : (
                                <div
                                    className="product-description-tab__details"
                                    style={{ textAlign: 'center' }}
                                >
                                    <img src="https://cdn.dribbble.com/users/888330/screenshots/2653750/empty_data_set.png" alt="No Events Found" />
                                </div>
                            )}
                        </Col>
                        {/* </div> */}

                        {/* <div className="shop-content space-pt--r100 space-pb--r100">
                <Container>
                    <Row>
                        <Col lg={9}>
                            <div className="shop-products">
                                {applications.length != 0 ? (
                                    applications.map((app) => {
                                        return (
                                            <ApplicationCard key={app.id} app={app} />
                                        )
                                    })
                                ) : (
                                    <div
                                        className="product-description-tab__details"
                                        style={{ textAlign: 'center' }}
                                    >
                                        No Applications Found
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div> */}
                    </Row>
                </Container>
            </div>
        </OrganiserWrapper>
    )
}