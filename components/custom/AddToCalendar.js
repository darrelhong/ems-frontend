import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';
import { createEvent } from 'ics';
import { useEffect, useRef } from 'react';

export default function AddToCalendar({ event }) {
  const cal = useRef();
  useEffect(() => {
    const startDate = parseISO(event.eventStartDate);
    const start = [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
    ];
    const endDate = parseISO(event.eventEndDate);
    const end = [
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate(),
      endDate.getHours(),
      endDate.getMinutes(),
    ];
    createEvent(
      {
        start,
        end,
        title: event.name,
        location: event.address,
      },
      (err, val) => {
        if (err) {
          console.log(err);
        } else {
          cal.current = val;
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <a
      className="text-primary font-weight-bold"
      href={'data:text/plain;charset=utf-8,' + cal.current}
      download="calendar.ics"
    >
      Add to calendar
    </a>
  );
}

AddToCalendar.propTypes = {
  event: PropTypes.object,
};
