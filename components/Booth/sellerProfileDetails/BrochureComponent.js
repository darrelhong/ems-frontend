import { useState } from 'react';
import { Container, Button, Col, Image,Row } from 'react-bootstrap';
import AddBrochureModal from './AddBrochureModal';
import ViewBrochureModal from './ViewBrochureModal';

const BrochureComponent = ({ sellerProfile, isPartner,setSellerProfile, createToast }) => {
    const [showModal, setShowModal] = useState(false);
    const [viewBrochureModalShow, setViewBrochureModalShow] = useState(false);
    const [imageUrlToShow, setImageUrlToShow] = useState('');
    const [brochureIndex,setBrochureIndex] = useState(1);

    return (
      <Container>
        <AddBrochureModal
          sellerProfileId={sellerProfile.id}
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          image={imageUrlToShow}
          setSellerProfile={setSellerProfile}
          createToast={createToast}
        />

        <ViewBrochureModal
          image={imageUrlToShow}
          closeViewBrochureModal={() => setViewBrochureModalShow(false)}
          viewBrochureModalShow={viewBrochureModalShow}
          brochureIndex={brochureIndex}
          isPartner={isPartner}
          setSellerProfile={setSellerProfile}
          sellerProfileId={sellerProfile?.id}
          createToast={createToast}
        />
        <br></br>
        {isPartner && (
          <Col
            style={{
              display: 'flex',
              flexDirection: 'row',

              marginBottom: '2%',
            }}
          >
            <button
              className="btn btn-fill-out btn-sm"
              onClick={() => setShowModal(true)}
            >
              Add a new Brochure
            </button>
         
          </Col>
        )}

        <Col
          className="form-group"
          xs={8}
          md={8}
          //   style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
          {sellerProfile.brochureImages &&
            sellerProfile.brochureImages.map((image, index) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginRight: '5%',
                }}
              >
                {/* <Col md={3}>
                  <img src={image} style={{ position: 'relative' }} />
                  <button
                    type="button"
                    className="close"
                    style={{ right: '0px', position: 'absolute', zIndex: '1' }}
                    // onClick={() => deleteFile(index)}
                  >
                    <span>&times;</span>
                  </button>
                </Col> */}
                <Image
                  // className="close"
                  // className="profile-image"
                  style={{ height: 'auto', maxWidth: '700px' }}
                  thumbnail
                  src={image}
                  onClick={() => {
                    setImageUrlToShow(image);
                    setBrochureIndex(index + 1);
                    setViewBrochureModalShow(true);
                  }}
                />
              </div>
            ))}
        </Col>
      </Container>
    );
};

export default BrochureComponent;