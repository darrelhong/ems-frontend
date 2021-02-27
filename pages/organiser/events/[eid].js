import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Container, Row, Col } from "react-bootstrap";
// import { useToasts } from "react-toast-notifications";
// import { getDiscountPrice } from "../../../lib/product";
import { LayoutOne } from "../../../layouts";
import { BreadcrumbOne } from "../../../components/Breadcrumb";
import EventDescription from "../../../components/events/viewEventDetails/EventDescription";
import ImageGalleryLeftThumb from "../../../components/events/viewEventDetails/ImageGalleryLeftThumb";
import ProductDescriptionTab from "../../../components/events/viewEventDetails/ProductDescriptionTab";
// import { ProductSliderTwo } from "../../../components/ProductSlider";
import { getEventDetails, updateEvent } from '../../../lib/query/eventApi';
import { dbDateToPretty } from '../../../lib/util/functions';

const OrganiserViewEventDetails = () => {
  // const { addToast } = useToasts();
  const [event, setEvent] = useState(Object);
  const [prettyStartDate, setPrettyStartDate] = useState('');
  const [prettyEndDate, setPrettyEndDate] = useState('');
  const [prettySaleStartDate, setPrettySaleStartDate] = useState('');
  const [prettySalesEndDate, setPrettySalesEndDate] = useState('');
  const router = useRouter();
  const { eid } = router.query;
  console.log(router.query); //this should give me the id?

  useEffect(() => {
    const loadEvent = async () => {
      let eventData = await getEventDetails(eid);
      setEvent(eventData);
      setPrettyEndDate(dbDateToPretty(eventData.eventEndDate));
      setPrettyStartDate(dbDateToPretty(eventData.eventStartDate));
      setPrettySaleStartDate(dbDateToPretty(eventData.saleStartDate));
      setPrettySalesEndDate(dbDateToPretty(eventData.salesEndDate));
    };
    loadEvent();
  }, []);

  const publishToggle = async () => {
    let published = !event.published;
    let updatedEvent = await updateEvent({ ...event, published });
    setEvent(updatedEvent);
  };

  const hideToggle = async () => {
    let hidden = !event.hidden;
    let updatedEvent = await updateEvent({ ...event, hidden });
    setEvent(updatedEvent);
  };


  const vipToggle = async () => {
    let vip = !event.vip;
    let updatedEvent = await updateEvent({ ...event, vip });
    setEvent(updatedEvent);
  };

  return (
    <LayoutOne>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle={event.name}>
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
          <li className="breadcrumb-item active">{event.name}</li>
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
                hideToggle={hideToggle}
                publishToggle={publishToggle}
                vipToggle={vipToggle}
              />
            </Col>
          </Row>
          {/* product description tab */}
          <Row>
            <Col>
              <ProductDescriptionTab event={event} prettySaleStartDate={prettySaleStartDate} prettySalesEndDate={prettySalesEndDate} />
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
