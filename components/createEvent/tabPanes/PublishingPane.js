import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const PublishingPane = ({ register, watch }) => {
    return (
        <Card className="my-account-content__content">
            <Card.Header>
                <h3>Publishing Options</h3>
            </Card.Header>
            <Card.Body>
                <div className="account-details-form">
                    <Row>
                        <Col className="form-group" md={12}>
                            <label>List as VIP Event</label>
                            <div>
                                <label style={{ marginRight: '10%' }}>
                                    <input
                                        type="radio"
                                        name="vip"
                                        ref={register()}
                                        value={true}
                                        // checked={this.state.selectedOption === "Male"}
                                        // onChange={this.onValueChange}
                                        style={{ marginRight: 5 }}
                                    />
                                    Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        ref={register()}
                                        name="vip"
                                        value={false}
                                        // checked={this.state.selectedOption === "Female"}
                                        // onChange={this.onValueChange}
                                        style={{ marginRight: 5 }}
                                    />
                                    No
                                </label>
                            </div>
                        </Col>
                        <Col className="form-group" md={12}>
                            <label>Publishing Options:</label>
                            <div>
                                <label style={{ marginRight: '10%' }}>
                                    <input
                                        type="radio"
                                        name="hideOptions"
                                        ref={register()}
                                        value="hideBoth"
                                        style={{ marginRight: 5 }}
                                    />
                                    Hide from both Attendees and Business Partners
                                </label>
                                <label style={{ marginRight: '10%' }}>
                                    <input
                                        type="radio"
                                        name="hideOptions"
                                        ref={register()}
                                        value="hideFromAttendee"
                                        style={{ marginRight: 5 }}
                                    />
                                    Hide from Attendees but show Business Partners
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        ref={register()}
                                        name="hideOptions"
                                        value="showToBoth"
                                        // checked={this.state.selectedOption === "Female"}
                                        // onChange={this.onValueChange}
                                        style={{ marginRight: 5 }}
                                    />
                                    Show to both Attendees and Business Partners
                                </label>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card.Body>
        </Card>
    );
};

PublishingPane.propTypes = {
    register: PropTypes.func,
    watch: PropTypes.func,
};

export default PublishingPane;
