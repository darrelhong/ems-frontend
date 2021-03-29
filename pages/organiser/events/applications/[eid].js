import useUser from '../../../../lib/query/useUser';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BreadcrumbOne } from 'components/Breadcrumb';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import { useState, useEffect } from 'react';
import { getAllApplicationsForEvent } from "../../../../lib/query/eventApi"


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



        </PartnerWrapper>
    )
}