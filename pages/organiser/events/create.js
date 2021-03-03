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
import LocationPane from '../../../components/createEvent/tabPanes/LocationPane';
import PublishingPane from '../../../components/createEvent/tabPanes/PublishingPane';
import ImagesPane from '../../../components/createEvent/tabPanes/ImagesPane';
import { steps } from '../../../components/createEvent/steps';
import useUser from '../../../lib/query/useUser';
import { createEvent, getEventDetails, updateEvent, uploadEventImage } from '../../../lib/query/eventApi';
import { htmlDateToDb, formatDates } from '../../../lib/util/functions';
import Modal from 'react-bootstrap/Modal';
import { getHiddenStatus, processHideOptionsSave } from '../../../lib/functions/eventOrganiser/eventFunctions';
import { useToasts } from 'react-toast-notifications';

const CreateEvent = () => {
  const { addToast, removeToast } = useToasts();

  const { control, register, handleSubmit, watch, setValue, errors, getValues, formState } = useForm();
  const { data: user } = useUser(localStorage.getItem('userId'));
  const [activeStep, setActiveStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState(Object);
  const [vip, setVip] = useState();
  const [physical, setPhysical] = useState();
  const [hideOptions, setHideOptions] = useState('');
  const [wantsTickets, setWantsTickets] = useState(true);
  const [freeTickets, setFreeTickets] = useState(false);

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
      vip,
      physical } = eventData;

    setValue("name", name);
    setValue("descriptions", descriptions);
    setValue("address", address);
    console.log('printing out dates to fix setValue');
    console.log(eventStartDate);
    console.log(eventEndDate);
    setValue("eventStartDate", eventStartDate);
    // setValue("eventStartDate","10-10-2010 11:11:00");
    setValue("eventEndDate", eventEndDate);
    setValue("boothCapacity", boothCapacity);
    setValue("ticketPrice", ticketPrice);
    setValue("ticketCapacity", ticketCapacity);
    setValue("saleStartDate", saleStartDate);
    setValue("salesEndDate", salesEndDate);
    setVip(vip);
    setPhysical(physical);
    setHideOptions(getHiddenStatus(eventData));
  };

  const createToast = (message, appearanceStyle) => {
    const toastId = addToast(message, { appearance: appearanceStyle });
    setTimeout(() => removeToast(toastId), 3000);
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
    let updatedData;
    const eventOrganiserId = user.id;
    let eventStatus = "CREATED";

    console.log('submitting');
    if (eid) {
      //concat data first, already have EID inside and all
      //have to update to upcoming now, instead of draft
      //const dateProcessedData = formatDates(getValues()); //update method no need format
      const formattedData = processHideOptionsSave(data);

      updatedData = { ...eventData, ...formattedData, eventOrganiserId, eventStatus };
      console.log('updated data to update the db?:');
      console.log(updatedData);
      const response = await updateEvent(updatedData);
      console.log('saved an existing event');
      console.log(response);
      createToast('Event edited successfully', 'success');
      router.push(`/organiser/events/${eid}`);
    } else {
      //new event, we need to add in the EO ID.
      const dateProcessedData = formatDates(getValues());
      const formattedData = processHideOptionsSave(dateProcessedData);

      updatedData = { ...formattedData, eventOrganiserId, eventStatus };
      const response = await createEvent(updatedData);
      console.log('finished creating brand new event:');
      console.log(response);
      createToast('Event created successfully', 'success');
      const eventId = response.eid;
      router.push(`/organiser/events/${eventId}`);
    }
  };

  const saveDraft = async () => {
    const data = getValues();
    const eventStatus = "DRAFT";
    let eventId;
    if (eid) {
      // const dateProcessedData = formatDates(data); //update no need format
      const formData = processHideOptionsSave(data);

      //concat data first
      let updatedData = { ...eventData, ...formData, eventStatus };
      console.log('printing concat data');
      console.log(updatedData);

      //update existing event
      let updatedEvent = await updateEvent(updatedData);
      // await saveImages(updatedEvent.eid);
      console.log('printing updated event:');
      console.log(updatedEvent);
      eventId = updatedEvent.eid;
    }
    else {
      const dateProcessedData = formatDates(data);
      const formData = processHideOptionsSave(dateProcessedData);

      //create new event without validation
      console.log('data before submitting');
      let eventOrganiserId = user.id;
      let updatedData = { ...formData, eventOrganiserId, eventStatus }
      // console.log(formData);
      const response = await createEvent(updatedData);
      eventId = response.eid;
      // await saveImages(response.eid);

    }

    // let message = '';
    // updatedEvent.published ? message = "Saved Successfully" : message = "Event unpublished";
    createToast('Saved as Draft successfully', 'success');
    router.push(`/organiser/events/${eventId}`);
  };

  const saveImages = async (eventId) => {
    const uploadedImages = getValues("files");
    const length = uploadedImages.length ?? 0;
    let i;
    console.log('length found: ' + length);
    console.log(uploadedImages.item(0));
    for (i = 0; i < length; i++) {
      let inputData = new FormData();
      inputData.append('file', uploadedImages.item(i));
      inputData.append('eid', eventId); //temp event ID
      console.log('checking input data');
      console.log(inputData);

      // setImages(images.push(URL.createObjectURL(data[0].file)));
      // setImages(URL.createObjectURL(data[0].file));
      const response = await uploadEventImage(inputData);
      console.log('response:');
      console.log(response);
    }
  }

  // const processHideOptionsSave = (formData) => {
  //   let published; //publish is for attendee
  //   let hidden; //hide is for BP
  //   if (formData.hideOptions == 'hideBoth') {
  //     published = false;
  //     hidden = true;
  //   } else if (formData.hideOptions == 'hideFromAttendee') {
  //     //hide from attendee but show to BP
  //     published = false;
  //     hidden = false;
  //   } else if (formData.hideOptions == 'showBoth') {
  //     published = true;
  //     hidden = false;
  //   } else {
  //     published = null;
  //     hidden = null;
  //   }
  //   return { ...formData, published, hidden }
  // };

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
              ref={register()}
              onClick={() => console.log('hello finished')}
            >
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
        <BreadcrumbOne pageTitle={eid ? `Updating ${eventData.name}` : 'Create New Event'}>
          <ol className="breadcrumb justify-content-md-end">
            <li className="breadcrumb-item">
              <Link href="/organiser/home">
                <a>Home</a>
              </Link>
            </li>
            <li className="breadcrumb-item active">{eid ? `Updating ${eventData.name}` : 'Create New Event'}</li>
          </ol>
          {/* {eventData?.eventStatus != 'CREATED' && (
            <ol>
              <button
                type="button"
                name="saveDraft"
                className="btn btn-border-fill btn-sm"
                // className="btn btn-border-fill-out"
                onClick={saveDraft}
              >
                Save as Draft
             </button>
            </ol>
          )}
          <ol>
            <button
              type="submit"
              className="btn btn-fill-out btn-sm"
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
          </ol> */}
        </BreadcrumbOne>

        <div className="my-account-content space-pt--r100 space-pb--r100">
          <Container>
            <Tab.Container defaultActiveKey="eventDetails">
              <Row>
                <VerticalLineStepper
                  steps={steps}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  errors={errors}
                  wantsTickets={wantsTickets}
                  freeTickets={freeTickets}
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
                      <TicketingPane freeTickets={freeTickets} setFreeTickets={setFreeTickets} setValue={setValue} formState={formState} wantsTickets={wantsTickets} getValues={getValues} setWantsTickets={setWantsTickets} register={register} errors={errors} watch={watch} eventData={eventData} setValue={setValue} errors={errors} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="booths">
                      <BoothPane register={register} errors={errors} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="location">
                      <LocationPane register={register} errors={errors} watch={watch} physical={physical} setPhysical={setPhysical} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="publishingOptions">
                      <PublishingPane eventStatus={eventData.eventStatus} handleSubmit={handleSubmit} saveDraft={saveDraft} onSubmit={onSubmit} vip={vip} hideOptions={hideOptions} setHideOptions={setHideOptions} errors={errors} setVip={setVip} register={register} watch={watch} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="images">
                      <ImagesPane register={register} />
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
