import Swiper from 'react-id-swiper';
import EventGridWrapperFiveEoProfile from '../ProductThumb/EventGridWrapperFiveEoProfile';
import { useState, useEffect, Fragment } from 'react';
import EventGridFive from '../ProductThumb/EventGridFiveEoProfile';
const EventEoProfileSliderTen = ({ events }) => {
  // const params = {
  //   loop: false,
  //   slidesPerView: 3,
  //   slidesPerGroup: 3,
  //   spaceBetween: 10,
  //   observer: true,
  //   observeParents: true,
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true,
  //   },
  //     navigation: {
  //      nextEl: '.swiper-button-next',
  //      prevEl: '.swiper-button-prev',
  //    },
  //   breakpoints: {
  //     1024: {
  //       slidesPerView: 3,
  //       slidesPerGroup: 3,
  //     },
  //     769: {
  //       slidesPerView: 2,
  //       slidesPerGroup: 2,
  //     },
  //     576: {
  //       slidesPerView: 2,
  //       slidesPerGroup: 2,
  //     },
  //     320: {
  //       slidesPerView: 1,
  //       slidesPerGroup: 1,
  //     },
  //   },
  // };

  const params = {
    slidesPerView: 3,
    spaceBetween: 10,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    observer: true,
    observeParents: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    //  navigation: {
    //    nextEl:'.swiper-button-next',
    //    prevEl: '.swiper-button-prev',
    //  },
  };
  const [eventlist, setEventlist] = useState([]);
  const [listHasItem, setListHasItem] = useState(false);
  useEffect(() => {
    if (events !== undefined) {
      setEventlist(events);
      setListHasItem(true);
    } else {
      setListHasItem(false);
    }
  }, [events]);
  if (eventlist.length !== 0) {
    return (
      <Fragment>
        <div className="product-slider-wrap product-slider-wrap--custom-bullet">
          <Swiper {...params}>
            {eventlist.map((event) => (
              <div key={event.eid}>
                {<EventGridFive key={event.eid} event={event} />}
              </div>
            ))}
          </Swiper>
        </div>
      </Fragment>
    );
  } else {
    return <div></div>;
  }
};

export default EventEoProfileSliderTen;
