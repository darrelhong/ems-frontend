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
import useUser from '../../../lib/query/useUser';
import { createEvent, getEventDetails } from '../../../lib/query/eventApi';
import { htmlDateToDb, dbDateToPretty } from '../../../lib/util/functions';

const steps = [
  {
    label: 'Event Details',
    eventKey: 'eventDetails',
    content: 'Important details about your event!',
  },
  {
    label: 'Online / Physical',
    eventKey: 'onlinePhysical',
    content: 'Differing details for an online or physically hosted event',
  },
  {
    label: 'Ticketing',
    eventKey: 'ticketing',
    content: 'Details for selling tickets to attendees!',
  },
  {
    label: 'Event Booths',
    eventKey: 'booths',
    content: 'Booths to be set up for your event!',
  },
  {
    label: 'Event Images',
    eventKey: 'images',
    content: 'Upload some nice images for your event!',
  },
];

const CreateEvent = () => {
  const { control, register, handleSubmit, watch, setValue } = useForm();
  const { data: user } = useUser(localStorage.getItem('userId'));
  const [activeStep, setActiveStep] = useState(0);
  const [isFinal, setIsFinal] = useState(true);
  // const [eventInProgress,setEventInProgress] = useState(Object);

  const router = useRouter();
  const { eid } = router.query;

  useEffect(() => {
    const loadData = async () => {
      let eventData = await getEventDetails(eid);
      setAllValues(eventData);
    };
    loadData();
  }, [])

  const setAllValues = (eventData) => {
    const {
      name,
      descriptions,
      address,
      website,
      eventStartDate,
      eventEndDate,
      boothCapacity,
      ticketPrice,
      ticketCapacity,
      saleStartDate,
      salesEndDate } = eventData;

    console.log('my ticket cap: ' + ticketCapacity);
    setValue("name", name);
    setValue("descriptions", descriptions);
    setValue("address", address);
    setValue("eventStartDate", eventStartDate);
    setValue("eventEndDate", eventEndDate);
    setValue("website", website);
    setValue("boothCapacity", boothCapacity);
    setValue("ticketPrice", ticketPrice);
    setValue("ticketCapacity", ticketCapacity);
    setValue("saleStartDate", saleStartDate);
    setValue("salesEndDate", salesEndDate);
  };

  const onSubmit = async (data) => {
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
      if (data.eventStartDate)
        eventStartDate = htmlDateToDb(data.eventStartDate);
      if (data.eventEndDate) eventEndDate = htmlDateToDb(data.eventEndDate);
      if (data.saleStartDate) saleStartDate = htmlDateToDb(data.saleStartDate);
      if (data.salesEndDate) salesEndDate = htmlDateToDb(data.salesEndDate);
      inputData = {
        ...data,
        eventOrganiserId,
        eventStartDate,
        eventEndDate,
        saleStartDate,
        salesEndDate,
      };
    }

    try {
      setIsFinal(true);
      const response = await createEvent(inputData);
      console.log('created event details:');
      console.log(response);
      //probably show the created details on some page
    } catch (e) {
      //some popup probably
      console.log(e);
    }
  };

  return (
    <OrganiserWrapper title="Create New Event">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              type="submit"
              className="btn btn-fill-out"
              name="submit"
              value="Submit"
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
            >
              Finish
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
                        isFinal={isFinal}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="ticketing">
                      <TicketingPane register={register} watch={watch} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="booths">
                      <BoothPane register={register} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="onlinePhysical">
                      <OnlinePhysicalPane register={register} watch={watch} />
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
