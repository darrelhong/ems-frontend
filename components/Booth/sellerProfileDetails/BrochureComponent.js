import { useState } from 'react';
import { Container, Button, Col, Image, Row, Modal } from 'react-bootstrap';
import AddBrochureModal from './AddBrochureModal';
import ViewBrochureModal from './ViewBrochureModal';
import { removeBrochureMethod } from 'lib/query/boothApi';

const BrochureComponent = ({ sellerProfile, isPartner,setSellerProfile, createToast }) => {
    const [showModal, setShowModal] = useState(false);
    const [viewBrochureModalShow, setViewBrochureModalShow] = useState(false);
    const [imageUrlToShow, setImageUrlToShow] = useState('');
    const [brochureIndex,setBrochureIndex] = useState(1);
    // for remove brochure modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [sellerProfileId,setSellerProfileId] = useState();
    const [removeImage, setRemoveImage] = useState();

    const handleShow = (sellerProfileId, image) => {
      setShow(true);
      setSellerProfileId(sellerProfileId);
      setRemoveImage(image);
    };
      const handleRemove = async () => {
        try {
          const updatedProfile = await removeBrochureMethod(
            sellerProfileId,
            removeImage
          );
          setSellerProfile(updatedProfile);

          createToast('Brochure successfully removed!', 'success');
          setShow(false);
        } catch (e) {
          createToast('Could not be removed, please try again later!', 'error');
        }
      };

    return (
      //delete brochure modal
      <Container>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete the brochure?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              className="btn-sm"
            >
              No
            </Button>
            <button className="btn btn-fill-out btn-sm" onClick={handleRemove}>
              Yes
            </button>
          </Modal.Footer>
        </Modal>

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
          xs={12}
          md={12}
          // style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
          {sellerProfile.brochureImages &&
            sellerProfile.brochureImages.map((image, index) => (
           
              <div
                style={{
                  flexDirection: 'row',
                  marginRight: '5%',
                  marginBottom:'1%'
                }}
              >
                {!isPartner && (
                  <Col md={12}>
                    <img src={image} style={{ position: 'relative' }} />
                  </Col>
                )}

                {isPartner && (
                  <Col md={12}>
                    <img src={image} style={{ position: 'relative' }} />
                    <button
                      type="button"
                      className="close"
                      style={{
                        right: '0px',
                        position: 'absolute',
                        zIndex: '1',
                      }}
                      onClick={() => handleShow(sellerProfile?.id, image)}
                    >
                      <span>&times;</span>
                    </button>
                  </Col>
                )}

                {/* <Image
                  // className="close"
                  // className="profile-image"
                  style={{ height: 'auto', width:'auto' }}
                  thumbnail
                  src={image}
                  onClick={() => {
                    setImageUrlToShow(image);
                    setBrochureIndex(index + 1);
                    setViewBrochureModalShow(true);
                  }}
                /> */}
              </div>
                
            ))}
        </Col>
      </Container>
    );
};

export default BrochureComponent;