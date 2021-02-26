//Converts from YYYY-MM-DDTHH:MM to DD-MM-YYYY HH:MM:SS
export function htmlDateToDb(dateObject) {
  let datePart = dateObject.slice(0, 10).split('-').reverse().join('-');
  let timePart = dateObject.slice(-5);
  return (datePart + ' ' + timePart + ':00');
}

//Converts from YYYY-MM-DDTHH:MM:SS to DD-MM-YYYY HH:MM
export function dbDateToPretty(dateObject) {
  let datePart = dateObject.slice(0, 10).split('-').reverse().join('-');
  let timePart = dateObject.slice(-8, -3); //taking out the seconds bcos nope
  return (datePart + ' ' + timePart);
}
