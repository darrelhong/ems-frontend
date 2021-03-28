import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

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
                </Col>
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

    const handleRegister = () => {
        console.log('registering');
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
            // size="xl"
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
                    <text style={{ color: 'red' }}>${getCheckoutTotal()}</text>
                    {/* Total Registration price: $79 */}
                </Col>
                {registerButton()}
            </Modal.Footer>
        </Modal>
    );
};

export default RegisterModal;