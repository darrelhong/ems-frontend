import { Fragment, useState } from 'react';
import Link from 'next/link';
import EventModal from './elements/EventModalEoProfile';
import { ProductRating } from '../Product';
import Badge from 'react-bootstrap/Badge';

const EventGridFiveEOProfile = ({ event, bottomSpace, sliderClass, eventUser }) => {
  const [modalShow, setModalShow] = useState(false);
  const [colorImage, setColorImage] = useState('');
  return (
    <Fragment>
      <div
        className={`${sliderClass ? sliderClass : ''} ${
          bottomSpace ? bottomSpace : ''
        }`}
      >
        <div className="product-grid product-grid--style-three">
          <div className="product-grid__image">
            {/* <Link
            // href={`/shop/product-basic/[slug]?slug=${product.slug}`}
            // as={"/shop/product-basic/" + product.slug}
            > */}
            <a>
              <img
                //event images is here
                // src={colorImage ? colorImage : product.images[0]}
                src={colorImage ? colorImage : event.images[0]}
                alt="event_img0"
              />

              {event.images.length > 1 && (
                <img
                  className="product-hover-image view-profile-event-image"
                  src={colorImage ? colorImage : event.images[1]}
                  // src={colorImage ? colorImage : product.images[1]}
                  alt="product_img1"
                />
              )}
            </a>
          </div>
          <div className="product-grid__info">
            <h6 className="product-title">
              {/* <Link
                // href={`/shop/product-basic/[slug]?slug=${product.slug}`}
                // as={'/shop/product-basic/' + product.slug}
              > */}
              {eventUser == "guest" && (<Link href={`/public/events/${event?.eid}`}>{event.name}</Link>)}
              {eventUser == "organiser" && (<Link href={`/organiser/events/${event?.eid}`}>{event.name}</Link>)}
              {eventUser == "partner" && (<Link href={`/partner/events/${event?.eid}`}>{event.name}</Link>)}

              {/* </Link> */}
            </h6>
            <div className="product-price">
              {/* {product.ticketPrice ? (
                <Fragment>
                  <span className="price">${discountedPrice}</span>
                  <del>${productPrice}</del> */}
              {/* {/* <span className="on-sale">{product.discount}% Off</span> */}
              {/* </Fragment>
              ) : (
                <span className="price">{product.ticketPrice}</span>
              )}*/}
            </div>
            <div className="rating-wrap">
              <ProductRating ratingValue={event.rating} />
              <span className="rating-num">({event.rating})</span>
              <span>
                {' '}
                {event.vip == true && <Badge variant="warning">VIP</Badge>}{' '}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      {/* <EventModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={event}
      /> */}
    </Fragment>
  );
};

export default EventGridFiveEOProfile;
