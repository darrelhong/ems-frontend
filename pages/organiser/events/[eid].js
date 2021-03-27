import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
// import { getDiscountPrice } from "../../../lib/product";
import { LayoutOne } from '../../../layouts';
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import EventDescription from '../../../components/events/viewEventDetails/EventDescription';
import ImageGalleryLeftThumb from '../../../components/events/viewEventDetails/ImageGalleryLeftThumb';
import EventDescriptionTabGroup from '../../../components/events/viewEventDetails/EventDescriptionTabGroup';
import OrganiserWrapper from '../../../components/wrapper/OrganiserWrapper';
// import { ProductSliderTwo } from "../../../components/ProductSlider";
import {
  getEventDetails,
  updateEvent,
  deleteEvent,
  getSellerProfilesFromEvent,
  returnNewSellerApplications
} from '../../../lib/query/eventApi';
import {
  publishToggle,
  hideToggle,
  vipToggle,
  handleCancel,
  handleDelete,
} from '../../../lib/functions/eventOrganiser/eventFunctions';
import { dbDateToPretty } from '../../../lib/util/functions';
import { format, parseISO, parseJSON } from 'date-fns';
import { useToasts } from 'react-toast-notifications';

const OrganiserViewEventDetails = () => {
  const [event, setEvent] = useState(Object);
  const [prettyStartDate, setPrettyStartDate] = useState('');
  const [prettyEndDate, setPrettyEndDate] = useState('');
  const [prettySaleStartDate, setPrettySaleStartDate] = useState('');
  const [prettySalesEndDate, setPrettySalesEndDate] = useState('');
  const [newSellerApplications,setNewSellerApplications] = useState([]);
  const [sellerProfiles,setSellerProfiles] = useState([]);
  const router = useRouter();
  const { eid } = router.query;
  const { addToast, removeToast } = useToasts();

  useEffect(() => {
    const loadEvent = async () => {
      try {
        let eventData = await getEventDetails(eid);
        if (eventData.eventEndDate)
          setPrettyEndDate(
            format(parseISO(eventData.eventEndDate), 'dd MMM yy hh:mmbbb')
          );
        if (eventData.eventStartDate)
          setPrettyStartDate(
            format(parseISO(eventData.eventStartDate), 'dd MMM yy hh:mmbbb')
          );
        if (eventData.saleStartDate)
          setPrettySaleStartDate(
            format(parseISO(eventData.saleStartDate), 'dd MMM yy hh:mmbbb')
          );
        if (eventData.salesEndDate)
          setPrettySalesEndDate(
            format(parseISO(eventData.salesEndDate), 'dd MMM yy hh:mmbbb')
          );
        setEvent(eventData);
        // let newApplications = await getNewApplicationsFromEvent(eid);
        let profiles = await getSellerProfilesFromEvent(eid);
        setSellerProfiles(profiles);
        if (eventData.sellerApplications) setNewSellerApplications(returnNewSellerApplications(eventData.sellerApplications));
      } catch (e) {
        router.push('/organiser/events/not-found');
      }
    };
    loadEvent();
  }, []);

  const createToast = (message, appearanceStyle) => {
    const toastId = addToast(message, { appearance: appearanceStyle });
    setTimeout(() => removeToast(toastId), 3000);
  };

  const publishToggleWithToast = async (event) => {
    const updatedEvent = await publishToggle(event);
    setEvent(updatedEvent);
    let message = '';
    updatedEvent.published
      ? (message = 'Published Successfully')
      : (message = 'Event unpublished');
    createToast(message, 'success');
  };

  const hideToggleWithToast = async (event) => {
    const updatedEvent = await hideToggle(event);
    setEvent(updatedEvent);
    let message = '';
    updatedEvent.hidden
      ? (message = 'Event Hidden')
      : (message = 'Event now visible to business partners!');
    createToast(message, 'success');
  };

  const vipToggleWithToast = async (event) => {
    const updatedEvent = await vipToggle(event);
    setEvent(updatedEvent);
    console.log(updatedEvent);
    let message = '';
    updatedEvent.vip
      ? (message = 'Event is exclusive to VIP members!')
      : (message = 'Event open for all!');
    createToast(message, 'success');
  };

  const handleCancelWithToast = async (event) => {
    const updatedEvent = await handleCancel(event);
    if (updatedEvent) {
      setEvent(updatedEvent);
      createToast('Event successfully cancelled', 'success');
      router.push('/organiser/events');
    } else {
      createToast('Error cancelling the event', 'error');
    }
  };

  const handleDeleteWithToast = async (event) => {
    const isDeleted = await handleDelete(event);
    if (isDeleted) {
      createToast('Event successfully deleted', 'success');
      router.push('/organiser/events');
      //navigate to somewhere else
    } else {
      createToast(
        'Error in deleting event, please contact our help center',
        'error'
      );
    }
  };

  return (
    <OrganiserWrapper title={event.name ? event.name : 'Draft'}>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle={event.name ? event.name : 'Draft'}>
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/home">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/organiser/events">
              <a>Events</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">
            {event.name ? event.name : 'Draft'}
          </li>
        </ol>
      </BreadcrumbOne>

      {/* product details */}
      <div className="product-details space-pt--r100 space-pb--r100">
        <Container>
          <Row>
            <Col lg={6} className="space-mb-mobile-only--40">
              {event.images && <ImageGalleryLeftThumb event={event} />}
            </Col>
            <Col lg={6}>
              {/* product description */}
              <EventDescription
                event={event}
                prettyStartDate={prettyStartDate}
                prettyEndDate={prettyEndDate}
                hideToggle={hideToggleWithToast}
                publishToggle={publishToggleWithToast}
                vipToggle={vipToggleWithToast}
                handleCancel={handleCancelWithToast}
                handleDelete={handleDeleteWithToast}
                createToast={createToast}
              />
            </Col>
          </Row>
          {/* product description tab */}
          <Row>
            <Col>
              {event && (
                <EventDescriptionTabGroup
                  event={event}
                  setEvent={setEvent}
                  prettySaleStartDate={prettySaleStartDate}
                  prettySalesEndDate={prettySalesEndDate}
                  createToast={createToast}
                  newSellerApplications={newSellerApplications}
                  sellerProfiles={sellerProfiles}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </OrganiserWrapper>
  );
};

export default OrganiserViewEventDetails;