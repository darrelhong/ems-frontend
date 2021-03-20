import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSellerProfile, getBoothsBySellerProfile } from 'lib/query/boothApi';
import ProductScrollView from 'components/Booth/sellerProfileDetails/ProductScrollView';
import BoothProductComponent from 'components/Booth/sellerProfileDetails/BoothProductComponent';
import DetailContainer from 'components/Booth/sellerProfileDetails/DetailContainer';
import { BreadcrumbOne } from 'components/Breadcrumb';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';

const SellerProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [sellerProfile, setSellerProfile] = useState(Object);
    const [booths, setBooths] = useState([]);
    const [bpProducts,setBpProducts] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const sellerProfileData = await getSellerProfile(id);
            setSellerProfile(sellerProfileData);
            const boothData = await getBoothsBySellerProfile(id);
            setBooths(boothData);
            const products = sellerProfileData?.businessPartner.products;
            setBpProducts(products);
        }
        loadData();
    }, []);

    return (
        <PartnerWrapper title={sellerProfile ? `Profile for ${sellerProfile?.event?.name}` : 'Booth Profile'} >
            <BreadcrumbOne pageTitle="Seller Profile">
                <ol className="breadcrumb justify-content-md-end">
                    <li className="breadcrumb-item">
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">{sellerProfile ? `Profile for ${sellerProfile?.event?.name}` : 'Booth Profile'}</li>
                </ol>
            </BreadcrumbOne>
            {booths && sellerProfile && (
                <DetailContainer
                    booths={booths}
                    sellerProfile={sellerProfile}
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

export default SellerProfile;