import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSellerProfile, getBoothsBySellerProfile } from 'lib/query/boothApi';
import ProductScrollView from 'components/Booth/sellerProfileDetails/ProductScrollView';
import BoothProductComponent from 'components/Booth/sellerProfileDetails/BoothProductComponent';
import DetailContainer from 'components/Booth/sellerProfileDetails/DetailContainer';
import BrochureComponent from 'components/Booth/sellerProfileDetails/BrochureComponent';
import { BreadcrumbOne } from 'components/Breadcrumb';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

const SellerProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [sellerProfile, setSellerProfile] = useState(Object);
    const [booths, setBooths] = useState([]);
    const [bpProducts, setBpProducts] = useState([]);
    const bpid = localStorage.getItem('userId');
    const { addToast, removeToast } = useToasts();

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

    const createToast = (message, appearanceStyle) => {
        const toastId = addToast(message, { appearance: appearanceStyle });
        setTimeout(() => removeToast(toastId), 3000);
    };

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
                    createToast={createToast}
                    setSellerProfile={setSellerProfile}
                    isPartner={bpid == sellerProfile?.businessPartner?.id}
                />
            )}
            <Container
                style={{
                    marginTop: '5%',
                    marginBottom: '10%'
                }}>

                <div className="product-description-tab space-pt--r100 space-pb--50">
                    {/* event.name here is dumb but to make sure we load the event before rendering the ticket modal */}
                    <Tab.Container defaultActiveKey="brochures">
                        <Nav
                            variant="pills"
                            className="product-description-tab__navigation space-mb--50"
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="brochures">PROFILE BROCHURES</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="products">PRODUCTS SOLD {' '}
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="brochures">
                                {sellerProfile ? (
                                    <BrochureComponent
                                        sellerProfile={sellerProfile}
                                        isPartner={bpid == sellerProfile?.businessPartner?.id}
                                    // isPartner={true}
                                    />
                                ) : (
                                    // {sellerProfile ? renderBrochureComponent() : (
                                    <div
                                        className="product-description-tab__details"
                                        style={{ textAlign: 'center' }}
                                    >
                                        No brochures uploaded yet
                                    </div>
                                )}
                            </Tab.Pane>

                            <Tab.Pane eventKey="products">
                                {booths && booths.map((booth) => (
                                    <BoothProductComponent
                                        booth={booth}
                                        createToast={createToast}
                                        sellerProfile={sellerProfile}
                                        setSellerProfile={setSellerProfile}
                                        isPartner={bpid == sellerProfile?.businessPartner?.id}
                                    // isPartner={true}
                                    />
                                ))}
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>


                {/* <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Brochure Images
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {sellerProfile ? (
                                <BrochureComponent
                                sellerProfile={sellerProfile}/>
                                ) : (
                                // {sellerProfile ? renderBrochureComponent() : (
                                    <div
                                        className="product-description-tab__details"
                                        style={{ textAlign: 'center' }}
                                    >
                                        No brochures uploaded yet
                                    </div>
                                )}

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            View Booth Products
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                {booths && booths.map((booth) => (
                                    <BoothProductComponent
                                        booth={booth}
                                        createToast={createToast}
                                        sellerProfile={sellerProfile}
                                        setSellerProfile={setSellerProfile}
                                    />
                                ))}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion> */}
            </Container>

            {/* {sellerProfile && renderBrochureComponent()} */}

            {/* {booths && booths.map((booth) => (
                <BoothProductComponent
                    booth={booth}
                    createToast={createToast}
                    sellerProfile={sellerProfile}
                    setSellerProfile={setSellerProfile}
                />
            ))} */}
        </PartnerWrapper>
    )
}

export default SellerProfile;