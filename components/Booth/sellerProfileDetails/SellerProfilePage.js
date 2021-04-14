import { useState, useEffect } from 'react';
import { getSellerProfile, getBoothsBySellerProfile } from 'lib/query/boothApi';
import BoothProductComponent from 'components/Booth/sellerProfileDetails/BoothProductComponent';
import DetailContainer from 'components/Booth/sellerProfileDetails/DetailContainer';
import BrochureComponent from 'components/Booth/sellerProfileDetails/BrochureComponent';
import { BreadcrumbOne } from 'components/Breadcrumb';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import { Container, Tab, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';

const SellerProfilePage = ({ id, sellerProfile, setSellerProfile }) => {
  // const [sellerProfile, setSellerProfile] = useState(Object);
  const [booths, setBooths] = useState([]);
  const [bpProducts, setBpProducts] = useState([]);
  const userId = localStorage.getItem('userId');
  const { addToast, removeToast } = useToasts();

  useEffect(() => {
    const loadData = async () => {
      // const sellerProfileData = await getSellerProfile(id);
      // setSellerProfile(sellerProfileData);
      const boothData = await getBoothsBySellerProfile(id);
      setBooths(boothData);
      const products = sellerProfile?.businessPartner?.products;
      setBpProducts(products);
    };
    if (sellerProfile) loadData();
  }, []);

  const createToast = (message, appearanceStyle) => {
    const toastId = addToast(message, { appearance: appearanceStyle });
    setTimeout(() => removeToast(toastId), 3000);
  };

  return (
    <div>
      {/* <PartnerWrapper
      title={
        sellerProfile
          ? `Profile for ${sellerProfile?.event?.name}`
          : 'Booth Profile'
      }
    >
      <BreadcrumbOne pageTitle="Seller Profile">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">
            {sellerProfile
              ? `Profile for ${sellerProfile?.event?.name}`
              : 'Booth Profile'}
          </li>
        </ol>
      </BreadcrumbOne> */}
      {booths && sellerProfile && (
        <DetailContainer
          booths={booths}
          sellerProfile={sellerProfile}
          createToast={createToast}
          setSellerProfile={setSellerProfile}
          isPartner={userId == sellerProfile?.businessPartner?.id}
        />
      )}
      <Container
        style={{
          marginTop: '5%',
          marginBottom: '10%',
        }}
      >
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
                <Nav.Link eventKey="products">PRODUCTS SOLD </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="brochures">
                {sellerProfile ? (
                  <BrochureComponent
                    sellerProfile={sellerProfile}
                    isPartner={userId == sellerProfile?.businessPartner?.id}
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
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* <BoothProductComponent //for testing how a single one looks
                        booth={booths[1]}
                        createToast={createToast}
                        sellerProfile={sellerProfile}
                        setSellerProfile={setSellerProfile}
                        isPartner={userId == sellerProfile?.businessPartner?.id}
                      /> */}

                  {booths && booths.length > 0 ? (
                    booths.map((booth) => (
                      <BoothProductComponent
                        key={booth?.id}
                        booth={booth}
                        createToast={createToast}
                        sellerProfile={sellerProfile}
                        setSellerProfile={setSellerProfile}
                        isPartner={userId == sellerProfile?.businessPartner?.id}
                      />
                    ))
                  ) : (
                    <div
                      className="product-description-tab__details"
                      style={{ textAlign: 'center' }}
                    >
                      Booths have not been allocated yet! Unable to list
                      products
                    </div>
                  )}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </Container>
      {/* </PartnerWrapper> */}
    </div>
  );
};

export default SellerProfilePage;
