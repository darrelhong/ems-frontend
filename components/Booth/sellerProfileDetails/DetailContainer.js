import { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Image
} from 'react-bootstrap';
import { IoMdCreate } from 'react-icons/io';
import IconButton from '@material-ui/core/IconButton';
import EditDescriptionModal from './EditDescriptionModal';


const DetailContainer = ({ sellerProfile, booths, createToast, setSellerProfile, isPartner }) => {
    const [showEditDescriptionModal, setShowEditDescriptionModal] = useState(false);

    return (
        <Container>
            <EditDescriptionModal
                sellerProfile={sellerProfile}
                showEditDescriptionModal={showEditDescriptionModal}
                closeEditDescriptionModal={() => setShowEditDescriptionModal(false)}
                createToast={createToast}
                setSellerProfile={setSellerProfile}
            />
            <Row>
                <Col md={4}>
                    {sellerProfile?.businessPartner?.profilePic ? (
                        <Image
                            className="profile-image"
                            src={partner?.profilePic}
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
                        <Col>
                            <h2>{sellerProfile?.businessPartner?.name ?? 'Name'}</h2>
                        </Col>
                        <Col>
                            <Row>
                                <h5>BOOTH NUMBERS:</h5>
                            </Row>
                            {booths.map((booth) => (
                                <ul>
                                    {/* <Row> */}
                                    <li>{booth.boothNumber}</li>
                                    {/* </Row> */}
                                </ul>
                            ))}
                        </Col>
                    </Row>
                    <Row
                        style={{
                            marginTop: '10%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <h5>Booth Description:</h5>
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
                    <Row>
                        {sellerProfile?.description ?? 'Empty Description still'}
                    </Row>

                </Col>
            </Row>
        </Container>
    )
}

export default DetailContainer;