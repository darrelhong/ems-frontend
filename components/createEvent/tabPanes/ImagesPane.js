import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const ImagesPane = ({ register }) => {

    const [profilepicUrl, setProfilepicUrl] = useState(
        '../../../public/assets/images/defaultprofilepic.png'
    );

    return (
        <Card className="my-account-content__content">
            <Card.Header>
                <h3>Event Images</h3>
            </Card.Header>
            <Card.Body>
                <div className="account-details-form">
                    {/* <Row>
                        <Col className="form-group" md={12}>
                            <label>Booth Capacity - How many at your event?
              <span className="required">*</span>
                            </label>
                            <input
                                className="form-control"
                                name="boothCapacity"
                                type="number"
                                ref={register({ required: true })}
                            />
                        </Col>
                    </Row> */}

                    <Row>
                        <Col className="form-group" xs={10} md={6}>
                            <Image
                                className="profile-image"
                                src={profilepicUrl}
                                // thumbnail
                            />
                        </Col>
                    </Row>

                </div>
            </Card.Body>
        </Card>
    );
};

ImagesPane.propTypes = {
    register: PropTypes.func,
};

export default ImagesPane;
