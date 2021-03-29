import useUser from '../../../../lib/query/useUser';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BreadcrumbOne } from 'components/Breadcrumb';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import { useState, useEffect } from 'react';
import { getAllApplicationsForEvent } from "../../../../lib/query/eventApi"
import ApplicationCard from "../../../../components/events/registration/ApplicationCard"
import { Container, Row, Col } from 'react-bootstrap';

export default function Applications() {

    // const { data: user } = useUser(localStorage.getItem('userId'));
    const [applications, setApplications] = useState([]);
    const router = useRouter();
    const { eid } = router.query;

    useEffect(() => {
        const getApplications = async () => {
            const data = await getAllApplicationsForEvent(eid);
            setApplications(data);
        }
        getApplications();
    }, []);

    console.log(applications);
    return (
        <PartnerWrapper title="Event Applications">
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

            <div className="shop-content space-pt--r100 space-pb--r100">
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
            </div>


        </PartnerWrapper>
    )
}