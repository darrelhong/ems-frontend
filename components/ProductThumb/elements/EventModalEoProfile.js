import Link from 'next/link';
import { useState, useEffect, Fragment } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { ProductRating } from '../../Product';

import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoGoogleplus,
  IoLogoYoutube,
  IoLogoInstagram,
} from 'react-icons/io';

const EventModalEoProfile = (props) => {
  const { event } = props;

  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  //swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    slidesPerView: 3,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: false,
    effect: 'fade',
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 3,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: false,
    slideToClickedSlide: true,
  };

  //  const params = {
  //    slidesPerView: 3,
  //    spaceBetween: 30,
  //    slidesPerGroup: 3,
  //    loop: true,
  //    loopFillGroupWithBlank: true,
  //    pagination: {
  //      el: '.swiper-pagination',
  //      clickable: true,
  //    },
  //    navigation: {
  //      nextEl: '.swiper-button-next',
  //      prevEl: '.swiper-button-prev',
  //    },
  //  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      className="product-quickview"
      centered
    >
      <Modal.Body>
        <Modal.Header closeButton></Modal.Header>
        <Row>
          <Col lg={6}>
            <Swiper {...gallerySwiperParams}>
              <div>
                {event.images &&
                  event.images.map((single, key) => {
                    return (
                      <div key={key}>
                        <div className="single-image">
                          <img src={single} className="img-fluid" alt="" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Swiper>
          </Col>
          <Col lg={6}>
            <div className="product-quickview__content">
              <h2 className="product-quickview__title space-mb--10">
                {event.name}
              </h2>
              <div className="product-quickview__price-rating-wrapper space-mb--10">
                {/* <div className="product-quickview__price d-flex-align-items-center">
                  {product.ticketPrice ? (
                    <Fragment>
                      <span className="price">${product.ticketPrice}</span>
                      <del>${product.ticketPrice}</del> */}
                {/* <span className="on-sale">{product.discount}% Off</span> */}
                {/* </Fragment>
                  ) : (
                    <span className="price">{product.ticketPrice}</span>
                  )}
                </div> */}
                {event.rating && event.rating > 0 ? (
                  <div className="product-quickview__rating-wrap">
                    <div className="product-quickview__rating">
                      <ProductRating ratingValue={event.rating} />
                      <span>({event.rating})</span>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className="product-quickview__product-share space-mt--15">
                <span>Share:</span>
                <ul className="social-icons">
                  <li>
                    <a href="#">
                      <IoLogoFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <IoLogoTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <IoLogoGoogleplus />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <IoLogoYoutube />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <IoLogoInstagram />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default EventModalEoProfile;
