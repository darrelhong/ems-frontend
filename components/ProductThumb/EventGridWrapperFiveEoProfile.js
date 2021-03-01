import { Fragment } from 'react';
import { useToasts } from 'react-toast-notifications';
import EventGridFive from './EventGridFiveEoProfile';
import Swiper from 'react-id-swiper';
import { useState, useEffect } from 'react';

const EventGridWrapperFiveEoProfile = ({
  events,
  // bottomSpace,
  // addToCart,
  // addToWishlist,
  // deleteFromWishlist,
  // addToCompare,
  // deleteFromCompare,
  // cartItems,
  // wishlistItems,
  // compareItems,
  // sliderClass
}) => {
     const [eventlist, setEventlist] = useState([]);
      const params = {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
          const [listHasItem, setListHasItem] = useState(false);
          useEffect(() => {
              console.log("hello");
              console.log(events)
   
          //  if (events !== undefined) {
              setEventlist(events);
              //setListHasItem(true);
            //} else {
             // setListHasItem(false);
            //}
        
          }, [events]);
  //const { addToast } = useToasts();
     if (eventlist.length !== 0) {
           console.log('hello 2');
               console.log(eventlist);
        
  return (
    <Fragment>
      {eventlist.map((event) => (
        <div key={event.eid}>
          {
            // <Swiper {...params}>
              <EventGridFive key={event.eid} event={event} />
            // </Swiper>
          }
        </div>
      ))}

      {/* <Swiper {...params}> */}
      {/* <div>slide 1</div>
        <div>slide 2</div>
        <div>slide 3</div>
        <div>slide 4</div>
        <div>slide 5</div>
        <div>slide 6</div> */}

      {/* {eventlist.map((event) => (
          <div key={event.eid}>
            <div>Slide </div>
          </div>
        ))} */}
      {/* </Swiper> */}
      {/* {events &&
          events.map((event) => {
            const eid = event.eid;
            console.log('print eid in eventgridwrapperfiveeo profile');
            console.log(eid);

            return <EventGridFive key={event.eid} event={event} />;
          })} */}
    </Fragment>
  );
}else{
    return(<div></div>)
}
};

export default EventGridWrapperFiveEoProfile;
