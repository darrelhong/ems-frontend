export const isFavouriteEvent = (favouriteEvents, eventId) =>
  favouriteEvents.map(({ eid }) => eid).includes(eventId);
