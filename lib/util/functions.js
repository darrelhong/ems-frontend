//Converts from YYYY-MM-DDTHH:MM to DD-MM-YYYY HH:MM:SS
export function htmlDateToDb(dateObject) {
  let datePart = dateObject.slice(0, 10).split('-').reverse().join('-');
  let timePart = dateObject.slice(11, 16);
  return (datePart + ' ' + timePart + ':00');
  // let timePart = dateObject.slice(11, dateObject.length);
  // if (dateObject.length > 16) {
  //   return (datePart + ' ' + timePart);
  // } else {
  //   return (datePart + ' ' + timePart + ':00');
  // }
}

//Converts from YYYY-MM-DDTHH:MM:SS to DD-MM-YYYY HH:MM
export function dbDateToPretty(dateObject) {
  let datePart = dateObject.slice(0, 10).split('-').reverse().join('-');
  let timePart = dateObject.slice(-8, -3); //taking out the seconds bcos nope
  return (datePart + ' ' + timePart);
}

//formatting dates for submitting
export function formatDates(data) {
  let eventStartDate = data.eventStartDate;
  let eventEndDate = data.eventEndDate;
  let saleStartDate = data.saleStartDate;
  let salesEndDate = data.salesEndDate;

  if (data.eventStartDate) eventStartDate = htmlDateToDb(data.eventStartDate);
  if (data.eventEndDate) eventEndDate = htmlDateToDb(data.eventEndDate);
  if (data.saleStartDate) saleStartDate = htmlDateToDb(data.saleStartDate);
  if (data.salesEndDate) salesEndDate = htmlDateToDb(data.salesEndDate);
  const inputData = {
    ...data,
    eventStartDate,
    eventEndDate,
    saleStartDate,
    salesEndDate,
  };
  return inputData;
}
