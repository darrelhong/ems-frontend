import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import { useForm } from 'react-hook-form';
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import OrganiserWrapper from '../../../components/wrapper/OrganiserWrapper';
import VerticalLineStepper from '../../../components/createEvent/VerticalLineStepper';
import EventDetailsPane from '../../../components/createEvent/tabPanes/EventDetailsPane';
import BoothPane from '../../../components/createEvent/tabPanes/BoothPane';
import TicketingPane from '../../../components/createEvent/tabPanes/TicketingPane';
import OnlinePhysicalPane from '../../../components/createEvent/tabPanes/OnlinePhysicalPane';
import PublishingPane from '../../../components/createEvent/tabPanes/PublishingPane';
import { steps } from '../../../components/createEvent/steps';
import useUser from '../../../lib/query/useUser';
import { createEvent, getEventDetails, updateEvent } from '../../../lib/query/eventApi';
import { htmlDateToDb, formatDates } from '../../../lib/util/functions';
import Modal from 'react-bootstrap/Modal';

const CreateEvent = () => {
  const { control, register, handleSubmit, watch, setValue, errors, getValues } = useForm();
  const { data: user } = useUser(localStorage.getItem('userId'));
  const [activeStep, setActiveStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState(Object);
  const [vip,setVip] = useState(false);

  const router = useRouter();
  const { eid } = router.query;

  useEffect(() => {
    const loadData = async () => {
      let eventData = await getEventDetails(eid);
      setEventData(eventData);
      setAllValues(eventData);
    };
    if (eid) loadData();
  }, []);

  const setAllValues = (eventData) => {
    const {
      name,
      descriptions,
      address,
      eventStartDate,
      eventEndDate,
      boothCapacity,
      ticketPrice,
      ticketCapacity,
      saleStartDate,
      salesEndDate,
      vip } = eventData;

    setValue("name", name);
    setValue("descriptions", descriptions);
    setValue("address", address);
    setValue("eventStartDate", eventStartDate);
    setValue("eventEndDate", eventEndDate);
    setValue("boothCapacity", boothCapacity);
    setValue("ticketPrice", ticketPrice);
    setValue("ticketCapacity", ticketCapacity);
    setValue("saleStartDate", saleStartDate);
    setValue("salesEndDate", salesEndDate);
    setVip(vip);
    
  };

  const oldSubmit = async (data) => {
    //original method, doesnt work cos im forcing empty date strings
    // let eventStartDate = dateConverter(data?.eventStartDate);
    // let eventEndDate = dateConverter(data?.eventEndDate);
    // let saleStartDate = dateConverter(data?.saleStartDate);
    // let salesEndDate = dateConverter(data?.salesEndDate);

    let eventStartDate = data.eventStartDate;
    let eventEndDate = data.eventEndDate;
    let saleStartDate = data.saleStartDate;
    let salesEndDate = data.salesEndDate;
    const eventOrganiserId = user.id;

    let inputData;
    if (eid) {
      if (data.eventStartDate)
        eventStartDate = htmlDateToDb(data.eventStartDate);
      if (data.eventEndDate) eventEndDate = htmlDateToDb(data.eventEndDate);
      if (data.saleStartDate) saleStartDate = htmlDateToDb(data.saleStartDate);
      if (data.salesEndDate) salesEndDate = htmlDateToDb(data.salesEndDate);

      //doesn't work now, leaving out old data plus not saving to original
      //need to concat and use the updateUser method instead actually
      inputData = {
        ...data,
        eventOrganiserId,
        eid,
        eventStartDate,
        eventEndDate,
        saleStartDate,
        salesEndDate,
      };
    } else {
      const formattedData = formatDates(data);
      inputData = { ...formattedData, eventOrganiserId };
    }

    try {
      const response = await createEvent(inputData);
      console.log('created event details:');
      console.log(response);
      //probably show the created details on some page
    } catch (e) {
      //some popup probably
      console.log(e);
    }
  };

  const onSubmit = async (data) => {
    const formattedData = formatDates(data);
    let updatedData;
    console.log('submitting');
    if (eid) {
      //concat data first, already have EID inside and all
      //have to update to upcoming now, instead of draft
      const eventStatus = "UPCOMING";
      updatedData = { ...eventData, ...formattedData, eventStatus };
      console.log('created event from draft:');
    } else {
      //new event, we need to add in the EO ID.
      let eventOrganiserId = user.id;
      updatedData = { ...formattedData, eventOrganiserId };
      console.log('creating brand new event:');
    }
    const response = await createEvent(updatedData);
    console.log(response);
  };

  const saveDraft = async () => {
    const data = getValues();
    const dateProcessedData = formatDates(data);
    const formData = processHideOptionsSave(dateProcessedData);
    const eventStatus = "DRAFT";
    if (eid) {
      //concat data first
      let updatedData = { ...eventData, ...formData, eventStatus };
      console.log('printing concat data');
      console.log(updatedData);

      //update existing event
      let updatedEvent = await updateEvent(updatedData);
      console.log('printing updated event:');
      console.log(updatedEvent);
    }
    else {
      //create new event without validation
      let eventOrganiserId = user.id;
      let updatedData = { ...formData, eventOrganiserId, eventStatus}
      const response = await createEvent(updatedData);
      console.log(response);
    }
  };

  const processHideOptionsSave = (formData) => {
    let published; //publish is for attendee
    let hidden; //hide is for BP
    if (formData.hideOptions == 'hideBoth') {
      published = false;
      hidden = true;
    } else if (formData.hideOptions == 'hideFromAttendee') {
      //hide from attendee but show to BP
      published = false;
      hidden = false;
    } else if (formData.hideOptions == 'showBoth') {
      published = true;
      hidden = false;
    } else {
      published = null;
      hidden = null;
    }
    return { ...formData, published, hidden }
  };

  return (
    <OrganiserWrapper title={eid ? `Updating ${eventData.name}` : "Create New Event"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal show={showModal}
          onHide={(event) => {
            setShowModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to disable your account?</Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              className="btn btn-fill-out"
              name="submit"
              value="Submit"
              ref={register()}            >
              Finish
            </button>
            <button
              type="submit"
              className="btn btn-fill-out"
              name="submit"
              value="Submit"
              ref={register()}
              onClick={() => {
                console.log('pressing button?');
                console.log('errors: ');
                console.log(errors);
              }}
            >
              Finish
            </button>
          </Modal.Footer>
        </Modal>
        <BreadcrumbOne pageTitle="Create New Event">
          <ol className="breadcrumb justify-content-md-end">
            <li className="breadcrumb-item">
              <Link href="/organiser/home">
                <a>Home</a>
              </Link>
            </li>
            <li className="breadcrumb-item active">Create New Event</li>
          </ol>
          <ol>
            <button
              type="button"
              name="saveDraft"
              className="btn btn-fill-out"
              onClick={saveDraft}
            >
              Save as Draft
            </button>
          </ol>
          <ol>
            <button
              type="submit"
              className="btn btn-fill-out"
              name="submit"
              value="Submit"
              ref={register()}
              onClick={handleSubmit(onSubmit)}
            >
              Finish
            </button>
          </ol>
          <ol>
            <button
              type="button"
              className="btn btn-fill-out"
              onClick={() => {
                let data = getValues();
                console.log('printing data now');
                console.log(data);
              }}
            >
              Show modal
            </button>
          </ol>
        </BreadcrumbOne>

        <div className="my-account-content space-pt--r100 space-pb--r100">
          <Container>
            <Tab.Container defaultActiveKey="eventDetails">
              <Row>
                <VerticalLineStepper
                  steps={steps}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
                <Col lg={9} md={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey="eventDetails">
                      <EventDetailsPane
                        onSubmit={onSubmit}
                        control={control}
                        register={register}
                        watch={watch}
                        errors={errors}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="ticketing">
                      <TicketingPane register={register} watch={watch} eventData={eventData} setValue={setValue} errors={errors} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="booths">
                      <BoothPane register={register} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="onlinePhysical">
                      <OnlinePhysicalPane register={register} watch={watch} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="publishingOptions">
                      <PublishingPane vip={vip} setVip={setVip} register={register} watch={watch} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </div>
      </form>
    </OrganiserWrapper>
  );
};

export default CreateEvent;
