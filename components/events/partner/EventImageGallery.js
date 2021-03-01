import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';
import Swiper from 'react-id-swiper';

export default function EventImageGallery({ images }) {
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

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: 'fade',
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    loop: true,
    slideToClickedSlide: true,
  };

  if (!images) {
    images = Array(4).fill('/assets/images/img-placeholder.jpg');
  }

  return (
    <>
      <div className="product-large-image-wrapper">
        <LightgalleryProvider>
          <Swiper {...gallerySwiperParams}>
            {images.map((image, key) => {
              return (
                <div key={key}>
                  <LightgalleryItem group="any" src={image}>
                    <button className="enlarge-icon">
                      <i className="icon-magnifier-add" />
                    </button>
                  </LightgalleryItem>
                  <div className="single-image">
                    <img src={image} className="img-fluid" alt="" />
                  </div>
                </div>
              );
            })}
          </Swiper>
        </LightgalleryProvider>
      </div>

      <div className="product-small-image-wrapper">
        <Swiper {...thumbnailSwiperParams}>
          {images.map((image, i) => {
            return (
              <div key={i}>
                <div className="single-image">
                  <img src={image} className="img-fluid" alt="" />
                </div>
              </div>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

EventImageGallery.propTypes = {
  images: PropTypes.array,
};
