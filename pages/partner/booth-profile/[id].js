import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getBoothProfile, getBoothsByBoothProfile } from 'lib/query/boothApi';
import ProductScrollView from 'components/Booth/boothProfileDetails/ProductScrollView';
import BoothProductComponent from 'components/Booth/boothProfileDetails/BoothProductComponent';
import DetailContainer from 'components/Booth/boothProfileDetails/DetailContainer';
import { BreadcrumbOne } from 'components/Breadcrumb';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';

const BoothProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [boothProfile, setBoothProfile] = useState(Object);
    const [booths, setBooths] = useState([]);
    const [bpProducts,setBpProducts] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const boothProfileData = await getBoothProfile(id);
            setBoothProfile(boothProfileData);
            const boothData = await getBoothsByBoothProfile(id);
            setBooths(boothData);
            const products = boothProfileData?.businessPartner.products;
            setBpProducts(products);
        }
        loadData();
    }, []);

    return (
        <PartnerWrapper title={boothProfile ? `Profile for ${boothProfile?.event?.name}` : 'Booth Profile'} >
            <BreadcrumbOne pageTitle="Booth Profile">
                <ol className="breadcrumb justify-content-md-end">
                    <li className="breadcrumb-item">
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">{boothProfile ? `Profile for ${boothProfile?.event?.name}` : 'Booth Profile'}</li>
                </ol>
            </BreadcrumbOne>
            {booths && boothProfile && (
                <DetailContainer
                    booths={booths}
                    boothProfile={boothProfile}
                />
            )}

            <div>
                {/* {booths && booths.map((booth) => (
                <div>
                    <h6>Booth number: {booth?.boothNumber ?? 'lmaooo'}</h6>
                    {booth.products && booth.products.map((product) => (
                        <h6>Product name: {product?.name ?? 'lmaooo'}</h6>
                    ))
                    }
                </div>
            ))} */}
                {booths && booths.map((booth) => (
                    <BoothProductComponent booth={booth} />
                ))}
                {/* {booths && (<BoothProductComponent booth={booths[0]} />)} */}
                {/* <ProductScrollView /> */}
            </div>
        </PartnerWrapper>
    )
}

export default BoothProfile;