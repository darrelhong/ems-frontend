import {
    Container,
    Row,
    Col,
    Image
} from 'react-bootstrap';

const DetailContainer = ({ sellerProfile, booths }) => {
    return (
        <Container>
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
                            marginTop: '10%'
                        }}>
                        <h5>Booth Description:</h5>
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