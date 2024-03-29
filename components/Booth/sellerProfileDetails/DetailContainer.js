import { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { IoMdCreate } from 'react-icons/io';
import IconButton from '@material-ui/core/IconButton';
import EditDescriptionModal from './EditDescriptionModal';

const DetailContainer = ({
  sellerProfile,
  booths,
  createToast,
  setSellerProfile,
  isPartner,
}) => {
  const [showEditDescriptionModal, setShowEditDescriptionModal] = useState(
    false
  );

  const getBoothNumbers = () => {
        let boothNumberString = '';
        booths.map((booth) => boothNumberString += (booth.boothNumber + ', '));
        if (boothNumberString == '') return (
            <p>Not allocated yet</p>
        )
        return boothNumberString.slice(0, -2);
};

  return (
    <Container>
      <EditDescriptionModal
        sellerProfile={sellerProfile}
        showEditDescriptionModal={showEditDescriptionModal}
        closeEditDescriptionModal={() => setShowEditDescriptionModal(false)}
        createToast={createToast}
        setSellerProfile={setSellerProfile}
      />
      <Row
      style={{marginTop:'4%'}}>
        <Col md={4}>
          {sellerProfile?.businessPartner?.profilePic ? (
            <Image
              className="profile-image"
              src={sellerProfile?.businessPartner?.profilePic}
              thumbnail
            />
          ) : (
            <Image
              src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
              className="profile-image"
              thumbnail
            />
          )}
        </Col>
        <Col className="detailContainer">
          <Row className="nameBoothRow">
              <h2>{sellerProfile?.businessPartner?.name ?? 'Name'}</h2>
            {/* <Col>
              <h2>{sellerProfile?.businessPartner?.name ?? 'Name'}</h2>
            </Col> */}
          </Row>
          <Row
          style={{marginTop:'3%'}}
          >
            <h5>Booth Numbers:</h5>
          </Row>
          <Row>{getBoothNumbers()}</Row>
          <Row
            style={{
              marginTop: '10%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h5>Profile Description:</h5>
            {isPartner && (
              <IconButton
                color="secondary"
                onClick={() => setShowEditDescriptionModal(true)}
                // onClick={()=> console.log('lets change the description')}
              >
                <IoMdCreate />
              </IconButton>
            )}
          </Row>
          <Row>{sellerProfile?.description ?? 'There is no description'}</Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailContainer;
