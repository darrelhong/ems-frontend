import { useState } from 'react';
import { Container, Button, Col, Image } from 'react-bootstrap';
import AddBrochureModal from './AddBrochureModal';

const BrochureComponent = ({ sellerProfile }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <Container>
            <AddBrochureModal
                sellerProfileId={sellerProfile.id}
                showModal={showModal}
                closeModal={() => setShowModal(false)}
            />
            <Col
            // xs={10} md={12}
            style={{
                display:'flex',
                flexDirection:'row-reverse',
                alignContent:'flex-end',
                marginBottom:'2%'
            }}
            >
                <Button
                    variant="danger"
                    onClick={() => setShowModal(true)}
                    >
                    Add a new Brochure
                </Button>
            </Col>
            <Col className="form-group" 
            xs={10} md={12}
                style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
            >
                {sellerProfile.brochureImages && sellerProfile.brochureImages.map((image) => (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginRight: '5%'
                        }}
                    >
                        <Image
                            // className="close"
                            // className="profile-image"
                            style={{ height: "230px", width: "250px" }}
                            thumbnail
                            src={image}
                        />
                    </div>
                ))}
            </Col>
        </Container>
    );
};

export default BrochureComponent;