import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Container, Row, Col } from "react-bootstrap";
// import { getDiscountPrice } from "../../../lib/product";
import { LayoutOne } from "../../../layouts";
import { BreadcrumbOne } from "../../../components/Breadcrumb";
import EventDescription from "../../../components/events/viewEventDetails/EventDescription";
import ImageGalleryLeftThumb from "../../../components/events/viewEventDetails/ImageGalleryLeftThumb";
import EventDescriptionTab from "../../../components/events/viewEventDetails/EventDescriptionTab";
// import { ProductSliderTwo } from "../../../components/ProductSlider";
import { getEventDetails, updateEvent, deleteEvent } from '../../../lib/query/eventApi';
import { publishToggle, hideToggle, vipToggle, handleCancel, handleDelete } from '../../../lib/functions/eventOrganiser/eventFunctions';
import { dbDateToPretty } from '../../../lib/util/functions';
import { format, parseISO, parseJSON } from 'date-fns';
import { useToasts } from 'react-toast-notifications';

const OrganiserViewEventDetails = () => {
  const [event, setEvent] = useState(Object);
  const [prettyStartDate, setPrettyStartDate] = useState('');
  const [prettyEndDate, setPrettyEndDate] = useState('');
  const [prettySaleStartDate, setPrettySaleStartDate] = useState('');
  const [prettySalesEndDate, setPrettySalesEndDate] = useState('');
  const router = useRouter();
  const { eid } = router.query;
  const { addToast, removeToast } = useToasts();

  useEffect(() => {
    const loadEvent = async () => {
      try {
        let eventData = await getEventDetails(eid);
        if (eventData.eventEndDate) setPrettyEndDate(format(parseISO(eventData.eventEndDate), 'dd MMM yy hh:mmbbb'));
        if (eventData.eventStartDate) setPrettyStartDate(format(parseISO(eventData.eventStartDate), 'dd MMM yy hh:mmbbb'));
        if (eventData.saleStartDate) setPrettySaleStartDate(format(parseISO(eventData.saleStartDate), 'dd MMM yy hh:mmbbb'));
        if (eventData.salesEndDate) setPrettySalesEndDate(format(parseISO(eventData.salesEndDate), 'dd MMM yy hh:mmbbb'));
        setEvent(eventData);
      } catch (e) {
        router.push('/register/success');

      }


      // setPrettyEndDate(dbDateToPretty(eventData.eventEndDate));
      // setPrettyStartDate(dbDateToPretty(eventData.eventStartDate));
      // setPrettySaleStartDate(dbDateToPretty(eventData.saleStartDate));
      // setPrettySalesEndDate(dbDateToPretty(eventData.salesEndDate));
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
    updatedEvent.published ? message = "Published Successfully" : message = "Event unpublished";
    createToast(message, 'success');
  }

  const hideToggleWithToast = async (event) => {
    const updatedEvent = await hideToggle(event);
    setEvent(updatedEvent);
    let message = '';
    updatedEvent.hidden ? message = "Event Hidden" : message = "Event now visible to business partners!";
    createToast(message, 'success');
  };

  const vipToggleWithToast = async (event) => {
    const updatedEvent = await vipToggle(event);
    setEvent(updatedEvent);
    let message = '';
    updatedEvent.vip ? message = "Event is exclusive to VIP members!" : message = "Event open for all!";
    createToast(message, 'success');
  };

  const handleCancelWithToast = async (event) => {
    const updatedEvent = await handleCancel(event);
    if (updatedEvent) {
      setEvent(updatedEvent);
      createToast('Event successfully cancelled', 'success');
    } else {
      createToast('Error cancelling the event', 'error');
    }
  };

  const handleDeleteWithToast = async (event) => {
    const isDeleted = await handleDelete(event);
    if (isDeleted){
      createToast('Event successfully deleted', 'success');
      //navigate to somewhere else
    } else {
      createToast('Error in deleting event, please contact our help center', 'error');
    } 
  }

  // const publishToggle = async () => {
  //   const published = !event.published;
  //   const updatedEvent = await updateEvent({ ...event, published });
  //   setEvent(updatedEvent);
  //   let message = '';
  //   published ? message = "Published Successfully" : message = "Event unpublished";
  //   createToast(message, 'success');
  // };

  // const hideToggle = async () => {
  //   const hidden = !event.hidden;
  //   const updatedEvent = await updateEvent({ ...event, hidden });
  //   setEvent(updatedEvent);
  //   let message = '';
  //   hidden ? message = "Event Hidden" : message = "Event now visible to business partners!";
  //   createToast(message, 'success');
  // };


  // const vipToggle = async () => {
  //   const vip = !event.vip;
  //   const updatedEvent = await updateEvent({ ...event, vip });
  //   setEvent(updatedEvent);
  //   let message = '';
  //   vip ? message = "Event is exclusive to VIP members!" : message = "Event open for all!";
  //   createToast(message, 'success');
  // };

  // const handleCancel = async () => {
  //   try {
  //     const eventStatus = "CANCELLED";
  //     const updatedEvent = await updateEvent({ ...event, eventStatus });
  //     setEvent(updatedEvent);
  //     createToast('Event successfully cancelled', 'success');
  //   } catch (e) {
  //     createToast('Error cancelling the event', 'error');
  //   }
  // }

  // const handleDelete = async () => {
  //   try {
  //     await deleteEvent(event.eid);
  //     createToast('Event successfully deleted', 'success');
  //     //navigate to somewhere
  //   } catch (e) {
  //     createToast('Error in deleting event, please contact our help center', 'error');
  //   }
  // };

  return (
    <LayoutOne>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle={event.name ? event.name : 'Draft'}>
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/shop/grid-left-sidebar">
              <a>Events</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">{event.name ? event.name : 'Draft'}</li>
        </ol>
      </BreadcrumbOne>

      {/* product details */}
      <div className="product-details space-pt--r100 space-pb--r100">
        <Container>
          <Row>
            <Col lg={6} className="space-mb-mobile-only--40">
              <ImageGalleryLeftThumb event={event} />
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
              />
            </Col>
          </Row>
          {/* product description tab */}
          <Row>
            <Col>
              <EventDescriptionTab event={event} prettySaleStartDate={prettySaleStartDate} prettySalesEndDate={prettySalesEndDate} />
            </Col>
          </Row>

          {/* related product slider */}
          {/* <ProductSliderTwo
            title="Related Products"
            products={relatedProducts}
          /> */}
        </Container>
      </div>
    </LayoutOne>
  );
};

// const mapStateToProps = (state, ownProps) => {
//   const products = state.productData;
//   const category = ownProps.product.category[0];
//   return {
//     relatedProducts: getProducts(products, category, "popular", 8),
//     cartItems: state.cartData,
//     wishlistItems: state.wishlistData,
//     compareItems: state.compareData
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (
//       item,
//       addToast,
//       quantityCount,
//       selectedProductColor,
//       selectedProductSize
//     ) => {
//       dispatch(
//         addToCart(
//           item,
//           addToast,
//           quantityCount,
//           selectedProductColor,
//           selectedProductSize
//         )
//       );
//     },
//     addToWishlist: (item, addToast) => {
//       dispatch(addToWishlist(item, addToast));
//     },
//     deleteFromWishlist: (item, addToast) => {
//       dispatch(deleteFromWishlist(item, addToast));
//     },
//     addToCompare: (item, addToast) => {
//       dispatch(addToCompare(item, addToast));
//     },
//     deleteFromCompare: (item, addToast) => {
//       dispatch(deleteFromCompare(item, addToast));
//     }
//   };
// };

export default OrganiserViewEventDetails;

// export default connect(mapStateToProps, mapDispatchToProps)(ProductThumbLeft);

// export async function getStaticPaths() {
//   // get the paths we want to pre render based on products
//   const paths = events.map((event) => ({
//     params: { slug: event.eid }
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   // get product data based on slug
//   const event = events.filter((single) => event.eid === params.slug)[0];

//   return { props: { event } };
// }
