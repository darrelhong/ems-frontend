import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { formatter } from 'lib/util/currency';
import { format, parseISO } from 'date-fns';
import { createSellerApplication } from 'lib/query/sellerApplicationApi';
import { newApplicationNotif } from 'lib/query/notificationApi';

const RegisterModal = ({
    event,
    bpId,
    showRegisterModal,
    closeRegisterModal,
    boothTotal,
    createToast,
    setApplicationMade,
    applicationMade
}) => {

    const [boothQuantity, setBoothQuantity] = useState(applicationMade?.boothQuantity ?? 1);

    const {
        register,
        handleSubmit,
        errors,
        getValues,
    } = useForm();

    const maxBoothAllowable = event?.boothCapacity - boothTotal;

    const bodyComponent = () => (
        <Modal.Body>
            <form>
                <Row className="mb-4">
                    <Col>
                        {introComponent()}
                        {/* <br/> */}
                    </Col>
                </Row>


                <Row>
                    <Col xs={6} sm={8}>
                        <p className="text-dark">
                            <strong>Description:</strong><span className="required">*</span>
                        </p>
                        {/* <br/> */}
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <p>A short description of what you will be offering / selling in the event!</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <textarea
                            className="form-control"
                            name="description"
                            disabled={applicationMade}
                            defaultValue={applicationMade?.description}
                            ref={register({ required: true })}
                            style={{
                                marginBottom: '5%'
                            }}
                        />
                        {errors.description && (
                            <div
                                className="alert alert-danger"
                                role="alert"
                                style={{
                                    marginTop: '3%'
                                }}
                            >
                                Please leave a short description
                            </div>
                        )}
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col xs={6} sm={8}>
                        <p className="text-dark">
                            <strong>Booth Price: </strong>
                            {formatter.format(event?.boothPrice)}
                        </p>
                    </Col>
                    <Col>
                        <div className="input-group input-group-sm">
                            <input
                                className="form-control"
                                name="boothQuantity"
                                type="number"
                                disabled={applicationMade}
                                defaultValue={applicationMade?.description}
                                defaultValue={applicationMade?.boothQuantity ?? 1}
                                min={1}
                                onChange={(e) => setBoothQuantity(e.target.value)}
                                ref={register({
                                    validate: (value) => value > 0 && value <= maxBoothAllowable
                                })}
                            // ref={register()}
                            />
                            <div className="input-group-append">
                                <label
                                    className="input-group-text"
                                    htmlFor="inputGroupSelect02"
                                >
                                    Qty
                            </label>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col xs={6} sm={8}>
                        <p>Each booth at the event costs {formatter.format(event?.boothPrice)}</p>
                    </Col>
                    <Col>
                        <p
                            style={{
                                textAlign: 'right'
                            }}>
                            {maxBoothAllowable} booths remaining!
                        </p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {errors.boothQuantity && getValues('boothQuantity') < 1 && (
                            <div
                                className="alert alert-danger"
                                role="alert"
                                style={{
                                    marginTop: '3%'
                                }}
                            >
                                Minimum of 1 booth!
                            </div>
                        )}

                        {errors.boothQuantity && getValues('boothQuantity') > maxBoothAllowable && (
                            <div
                                className="alert alert-danger"
                                role="alert"
                                style={{
                                    marginTop: '3%'
                                }}
                            >
                                Maximum of {maxBoothAllowable} allowed!
                            </div>
                        )}
                    </Col>
                </Row>

                <Row>
                    <Col xs={6} sm={8}>
                        <p className="text-dark">
                            <strong>Any additional comments?</strong>
                        </p>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <p> eg. you would like your booths next to each other (if more than one)</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <textarea
                            className="form-control"
                            name="comments"
                            disabled={applicationMade}
                            defaultValue={applicationMade?.comments}
                            ref={register()}
                            style={{
                                marginBottom: '5%'
                            }}
                        />
                    </Col>
                </Row>
            </form>
        </Modal.Body>
    );

    const introComponent = () => {
        if (applicationMade) {
            return (
                <p className="text-dark">
                    Thank you for your interest in this event.
                    <strong>{' '}{event?.eventOrganiser?.name}{' '}</strong>
                will get back to you shortly on whether your application is successful.
                </p>
            )
        } else {
            return (
                <p className="text-dark">
                    Thank you for your interest in this event. Kindly add some details in the application and
                    <strong>{' '}{event?.eventOrganiser?.name}{' '}</strong>
                will get back to you shortly on whether your application is successful.
                </p>
            )
        }
    }

    const closeButton = () => (
        <Button variant="danger" onClick={() => {
            closeRegisterModal();
        }}>
            Close
        </Button>
    );


    const registerButton = () => (
        <Button
            variant="danger"
            onClick={handleSubmit(handleRegister)}
        >
            Register
        </Button>
    );

    const handleRegister = async (data) => {
        try {
            const application = await createSellerApplication(data, event.eid, bpId);
            setApplicationMade(application);
            // await newApplicationNotif(bpId, event.eid);
            closeRegisterModal();
            createToast('Registered Successfully', 'success');
        } catch (e) {
            closeRegisterModal();
            createToast('Error, please try again later', 'error');
        }
    }

    const getCheckoutTotal = () => {
        // return getValues('boothQuantity');
        if (event?.boothPrice) {
            return event.boothPrice * boothQuantity;
        }
        else return 0;
        // return event.boothPrice * getValues('boothQuantity');
    }

    const getTitle = () => {
        if (applicationMade) {
            return `Applying for ${event?.name}`;
        } else {
            return `Registering for ${event?.name}`;
        }
    };

    return (
        <Modal
            show={showRegisterModal}
            onHide={closeRegisterModal}
            size="xl"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>{getTitle()}</Modal.Title>
            </Modal.Header>
            {bodyComponent()}
            <Modal.Footer>
                {/* {closeButton()} */}
                <Col
                    style={{
                        textAlign: 'right'
                    }}>
                    <text>Total:{' '}</text>
                    <text style={{ color: 'red' }}>{formatter.format(getCheckoutTotal())}</text>
                </Col>
                {applicationMade ? closeButton() : registerButton()}
            </Modal.Footer>
        </Modal>
    );
};

export default RegisterModal;