import { Fragment, useState } from 'react';
import Link from 'next/link';
import EventModal from './elements/EventModalEoProfile';
import { ProductRating } from '../Product';

const EventGridFiveEOProfile = ({ event, bottomSpace, sliderClass }) => {
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
                src="https://www.creativiva.com/wp-content/uploads/2016/05/decor-blog-1.jpg"
                alt="product_img1"
              />
              <img
                className="product-hover-image"
                src="https://i.pinimg.com/originals/b4/c3/8a/b4c38aad1728a7d6bb4bff0b3f88187d.jpg"
                // src={colorImage ? colorImage : product.images[1]}
                alt="product_img1"
              />
            </a>
            {/* </Link> */}
            <div className="product-grid__badge-wrapper">
              {/* {product.new ? <span className="pr-flash">NEW</span> : ""}
              {product.featured ? (
                <span className="pr-flash bg-danger">HOT</span>
              ) : (
                ""
              )}
              {product.discount ? (
                <span className="pr-flash bg-success">SALE</span>
              ) : (
                ""
              )} */}
            </div>
          </div>
          <div className="product-grid__info">
            <h6 className="product-title">
              {/* <Link
                // href={`/shop/product-basic/[slug]?slug=${product.slug}`}
                // as={'/shop/product-basic/' + product.slug}
              > */}
              <a>{event.name}</a>
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
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <EventModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={event}
      />
    </Fragment>
  );
};

export default EventGridFiveEOProfile;
