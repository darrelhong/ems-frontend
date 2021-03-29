import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { formatter } from 'lib/util/currency';
import { format, parseISO } from 'date-fns';
import { createSellerApplication } from 'lib/query/eventApi';

const RegisterModal = ({
    event,
    businessPartner,
    showRegisterModal,
    closeRegisterModal,
    boothTotal
}) => {

    const [boothQuantity, setBoothQuantity] = useState(1);

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

                {/* <Row className="mb-4">
                      <Col>
                        <p>
                          Starts on:{' '}
                          {format(
                            parseISO(event?.eventStartDate),
                            'eee, dd MMM yy hh:mmbbb'
                          )}
                        </p>
                      </Col>
                    </Row> */}

                <Row className="mb-4">
                    <Col>
                        <p className="text-dark">
                            Thank you for your interest in this event. Kindly add some details in the application and
                            <strong>{' '}{event?.eventOrganiser?.name}{' '}</strong>
                            will get back to you on whether your application is successful.
                        </p>
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
                            // required
                            className="form-control"
                            name="description"
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
                                defaultValue={1}
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
                            ref={register()}
                            style={{
                                marginBottom: '5%'
                            }}
                        />
                    </Col>
                </Row>
                {/* 
                    
                <Col className="form-group" md={12}>
                    <label>
                        Description<span className="required">*</span>
                    </label>

                    <br />
                    <small>
                        A short description of what you will be offering in the event!
                </small>
                    <textarea
                        // required
                        className="form-control"
                        name="description"
                        ref={register({ required: true })}
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

                <Col className="form-group" md={12}>
                    <label>
                        How many booths would you like at the event?<span className="required">*</span>
                    </label>
                    <br />
                    {event?.boothPrice && event?.boothCapacity && (
                        <small
                            style={{
                                color: 'blue'
                            }}
                        >
                            Each booth is ${event?.boothPrice}
                            <br />
                            {event.boothCapacity - boothTotal} booths remaining!
                        </small>
                    )}
                    <input
                        className="form-control"
                        name="boothQuantity"
                        type="number"
                        defaultValue={boothQuantity}
                        onChange={(e) => setBoothQuantity(e.target.value)}
                        ref={register({
                            validate: (value) => value > 0 && value <= (event.boothCapacity - boothTotal)
                        })}
                    />
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

                <Col className="form-group" md={12}>
                    <label>
                        Any additional comments? <span className="required">*</span>
                    </label>
                    <br />
                    <small>
                        eg. you would like your booths next to each other (if more than one)
                </small>
                    <textarea
                        // required
                        className="form-control"
                        name="comments"
                        ref={register()}
                    />
                </Col> */}
            </form>
        </Modal.Body>
    );

    const closeButton = () => (
        <Button variant="secondary" onClick={() => {
            closeRegisterModal();
        }}>
            Cancel
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

    const handleRegister = (data) => {
        console.log('registering, printing erors and data');
        console.log(errors);
        console.log(data);
        console.log(event.eid);
        console.log(businessPartner.id);
        // const response = await createSellerApplication(data,event.eid,businessPartner.id);
    }

    const getCheckoutTotal = () => {
        // return getValues('boothQuantity');
        if (event?.boothPrice) {
            return event.boothPrice * boothQuantity;
        }
        else return 0;
        // return event.boothPrice * getValues('boothQuantity');
    }
    return (
        <Modal
            show={showRegisterModal}
            onHide={closeRegisterModal}
            size="xl"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Registering for {event?.name}</Modal.Title>
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
                    {/* Total Registration price: $79 */}
                </Col>
                {registerButton()}
            </Modal.Footer>
        </Modal>
    );
};

export default RegisterModal;