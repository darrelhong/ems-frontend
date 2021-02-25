import { useState } from 'react';
import Link from 'next/link';
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
import { createEvent } from '../../../lib/query/eventApi';
import { dateConverter } from '../../../lib/util/functions';

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
  const { control, register, handleSubmit, watch } = useForm();
  const { data: user } = useUser(localStorage.getItem('userId'));
  const [activeStep, setActiveStep] = useState(0);

  const onSubmit = async (data) => {
    let eventStartDate = dateConverter(data.eventStartDate);
    let eventEndDate = dateConverter(data.eventEndDate);
    let inputData = { ...data, eventStartDate, eventEndDate };
    try {
      const response = await createEvent(inputData, user.id);
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
                      handleSubmit={handleSubmit}
                      watch={watch}
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
    </OrganiserWrapper>
  );
};

export default CreateEvent;
