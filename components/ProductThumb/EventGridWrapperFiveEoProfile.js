import { Fragment } from 'react';
import { useToasts } from 'react-toast-notifications';
import EventGridFive from './EventGridFiveEoProfile';

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
  const { addToast } = useToasts();
  return (
    <Fragment>
      {events &&
        events.map((event) => {
          const eid = event.eid;
          console.log('print eid in eventgridwrapperfiveeo profile');
          console.log(eid);

          return <EventGridFive key={event.eid} event={event} />;
        })}
    </Fragment>
  );
};

export default EventGridWrapperFiveEoProfile;
