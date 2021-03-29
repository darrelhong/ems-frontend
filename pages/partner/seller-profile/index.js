import useUser from '../../../lib/query/useUser';
import Link from 'next/link';
import { BreadcrumbOne } from 'components/Breadcrumb';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import { useState, useEffect } from 'react';
import { getAllSellerProfilesByPartner } from "../../../lib/query/boothApi"

export default function AllSellerProfiles() {

    const { data: user } = useUser(localStorage.getItem('userId'));
    const [sellerProfiles, setSellerProfiles] = useState([]);

    console.log(user)

    useEffect(() => {
        if (user) {
            const getSPs = async () => {
                const data = await getAllSellerProfilesByPartner(user.id);
                setSellerProfiles(data);
            }
            getSPs()
        }
    }, [user]);

    console.log(sellerProfiles)

    return (
        <PartnerWrapper title="Seller Profiles">
            <BreadcrumbOne pageTitle="View All Seller Profiles">
                <ol className="breadcrumb justify-content-md-end">
                    <li className="breadcrumb-item">
                        <Link href="/partner/home">
                            <a>Partner Home</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">Seller Profiles</li>
                </ol>
            </BreadcrumbOne>



        </PartnerWrapper>
    )
}