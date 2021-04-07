import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { updateEvent } from '../../lib/query/eventApi';
// import LoadingScreen from '../../components/LoadingScreen';

const TicketingModal = ({ event, setEvent, showModal, setShowModal, createToast }) => {
    const [sellingTicket, setsellingTicket] = useState(false);
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        errors,
        getValues,
        formState,
        register
    } = useForm();

    // const { register } = useForm({
    //     defaultValues: event
    // });

    // const [deleteshowModal, setDeleteshowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);

    useEffect(() => {
        const setData = async () => {
            // console.log('setting my boolean');
            // console.log(event.sellingTicket);
            setsellingTicket(event.sellingTicket);
            // console.log('set value before');
            // console.log(event);
            // setValue('ticketCapacity', event.ticketCapacity);
            // setValue('ticketPrice', event.ticketPrice);
            // console.log('set value after');
        }
        setData();
    }, []);

    useEffect(() => {
        const {
            ticketPrice,
            ticketCapacity,
            saleStartDate,
            salesEndDate,
        } = event;
        if (sellingTicket) {
            setValue('ticketPrice', ticketPrice);
            setValue('ticketCapacity', ticketCapacity);
            setValue('saleStartDate', saleStartDate);
            setValue('salesEndDate', salesEndDate);
        } else {
            setValue('ticketPrice', null);
            setValue('ticketCapacity', null);
            setValue('saleStartDate', null);
            setValue('salesEndDate', null);
        }
    }, [sellingTicket]);


    const onSubmit = async (data) => {
        console.log(data);
        const concatData = { ...event, ...data };
        const updatedEvent = await updateEvent(concatData);
        setEvent(updatedEvent);
        createToast('Ticketing Details Updated!', 'success');
        closeModal();
    }

    return (
        <Modal show={showModal} onHide={closeModal} centered>
            {/* {loading && <LoadingScreen />} */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Event Ticketing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="account-details-form">
                        <Row>
                            <Col className="form-group" md={12}>
                                <input
                                    type="checkbox"
                                    id="sellingTicket"
                                    name="sellingTicket"
                                    value={sellingTicket}
                                    checked={sellingTicket}
                                    ref={register()}
                                    onChange={() => {
                                        console.log(!sellingTicket);
                                        //if go from sell to dont sell then make it false
                                        // if (sellingTicket) {
                                        //   setFreeTickets(false);
                                        //   // setValue("ticketPrice", 16);
                                        // }
                                        setsellingTicket(!sellingTicket);
                                    }}
                                    style={{ marginRight: 5 }}
                                />
                                <label htmlFor="sellingTicket">
                                    {' '}
                Are you selling tickets for your event?
              </label>
                            </Col>

                            {/* this is for error checking, still a bit buggy */}
                            {(sellingTicket || !sellingTicket) && ( 
                            // { sellingTicket && (
                                <div>
                                    <Col className="form-group" md={12}>
                                        <label>
                                            Ticket Price (SGD)
{sellingTicket && <span className="required">*</span>}
                                        </label>
                                        <input
                                            className="form-control"
                                            name="ticketPrice"
                                            type="number"
                                            step="0.1"
                                            disabled={!sellingTicket}
                                            defaultValue={event.ticketPrice}
                                            // disabled={!sellingTicket || freeTickets}
                                            // ref={register()}
                                            ref={register({ required: sellingTicket })}
                                        />
                                        {/* {(watch('ticketPrice') == 0 && formState.touched?.ticketPrice) && (
<span role="alert" style={{ color: 'blue' }}>
Are you sure you are selling for $0?
</span>
)
} */}
                                        {errors.ticketPrice && sellingTicket && (
                                            // {errors.ticketPrice && sellingTicket && !freeTickets && (
                                            <span role="alert" style={{ color: 'red' }}>
                                                This field is required
                                            </span>
                                        )}
                                    </Col>
                                    <Col className="form-group" md={12}>
                                        <label>
                                            Ticket Capacity - How many tickets do you want to sell? {sellingTicket && <span className="required">*</span>}
                                        </label>
                                        <input
                                            className="form-control"
                                            name="ticketCapacity"
                                            type="number"
                                            disabled={!sellingTicket}
                                            defaultValue={event.ticketCapacity}
                                            ref={register({ required: sellingTicket, min: 1 })}
                                        // ref={register()}
                                        />
                                        {errors.ticketCapacity && sellingTicket && (
                                            <span role="alert" style={{ color: 'red' }}>
                                                At least 1 ticket if you are selling!
                                            </span>
                                        )}
                                    </Col>
                                    <Col className="form-group" md={12}>
                                        <label>
                                            Ticket Sales Start Date {sellingTicket && <span className="required">*</span>}
                                        </label>
                                        <input
                                            className="form-control"
                                            name="saleStartDate"
                                            type="datetime-local"
                                            disabled={!sellingTicket}
                                            ref={register({ required: sellingTicket })}
                                            defaultValue={event.saleStartDate}
                                        // ref={register()}
                                        />
                                        {errors.saleStartDate && sellingTicket && (
                                            <span role="alert" style={{ color: 'red' }}>
                                                This field is required
                                            </span>
                                        )}
                                    </Col>

                                    <Col className="form-group" md={12}>
                                        <label>
                                            Ticket Sales End Date {sellingTicket && <span className="required">*</span>}
                                        </label>
                                        <input
                                            className="form-control"
                                            name="salesEndDate"
                                            type="datetime-local"
                                            disabled={!sellingTicket}
                                            defaultValue={event.salesEndDate}
                                            // ref={register({ required: sellingTicket })}
                                            // ref={register({ required: sellingTicket })}
                                            ref={register({ required: sellingTicket, validate: value => !sellingTicket || value > watch('saleStartDate') })}
                                        // ref={register()}
                                        />
                                        {errors.salesEndDate && sellingTicket && (
                                            <span role="alert" style={{ color: 'red' }}>
                                                This field is required, end date must also be later than
                                                start date!
                                            </span>
                                        )}
                                    </Col>
                                </div>
                            )}
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                    variant="secondary" name="closeButton" onClick={closeModal}>
                        Close
          </Button>
                    <Button
                    isLoading={formState.isSubmitting}
                        variant="primary"
                        name="submit"
                        ref={register()}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Proceed
          </Button>
                </Modal.Footer>
            </form>

        </Modal>
    );
};

export default TicketingModal;