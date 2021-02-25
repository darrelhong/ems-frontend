import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Container, Row, Col } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
// import { getDiscountPrice } from "../../../lib/product";
import { LayoutOne } from "../../../layouts";
import { BreadcrumbOne } from "../../../components/Breadcrumb";
import { EventDescription } from "../../../components/events/viewEventDetails/EventDescription";

// import {
//   ImageGalleryLeftThumb,
//   ProductDescription,
//   ProductDescriptionTab
// } from "../../../components/ProductDetails";
// import { addToCart } from "../../../redux/actions/cartActions";
// import {
//   addToWishlist,
//   deleteFromWishlist
// } from "../../../redux/actions/wishlistActions";
// import {
//   addToCompare,
//   deleteFromCompare
// } from "../../../redux/actions/compareActions";
// import products from "../../../data/products.json";
import { ProductSliderTwo } from "../../../components/ProductSlider";
import { getEventDetails, getAllEvents } from '../../../lib/query/eventApi';
import { Events } from 'react-scroll';

const OrganiserViewEventDetails = () => {
  const { addToast } = useToasts();
  const [event, setEvent] = useState(Object);
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { eid } = router.query;
  console.log(router.query); //this should give me the id?

  useEffect(() => {
    const loadEvents = async () => {
      let eventData = await getEventDetails(1);
      console.log('got event data');
      console.log(eventData);
      setEvent(eventData);
      let allEvents = await getAllEvents();
      setEvents(allEvents);
    };
    loadEvents();
  });

  // const productPrice = product.price.toFixed(2);
  // const cartItem = cartItems.filter(
  //   (cartItem) => cartItem.id === product.id
  // )[0];
  // const wishlistItem = wishlistItems.filter(
  //   (wishlistItem) => wishlistItem.id === product.id
  // )[0];
  // const compareItem = compareItems.filter(
  //   (compareItem) => compareItem.id === product.id
  // )[0];

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
              <a>Shop</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">{event.name}</li>
        </ol>
      </BreadcrumbOne>

      {/* product details */}
      <div className="product-details space-pt--r100 space-pb--r100">
        <Container>
          <Row>
            {/* <Col lg={6} className="space-mb-mobile-only--40">
              <ImageGalleryLeftThumb product={product} />
            </Col> */}
            <Col lg={6}>
              {/* product description */}
              <EventDescription
                event={event}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* product description tab */}
              <ProductDescriptionTab product={product} />
            </Col>
          </Row>

          {/* related product slider */}
          <ProductSliderTwo
            title="Related Products"
            products={relatedProducts}
          />
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
