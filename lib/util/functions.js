//Converts from YYYY-MM-DDTHH:MM to DD-MM-YYYY HH:MM:SS
export function dateConverter(dateObject) {
  let datePart = dateObject.slice(0, 10).split('-').reverse().join('-');
  let timePart = dateObject.slice(-5);
  let output = datePart + ' ' + timePart + ':00';
  return output;
}

// //Converts from 
// export function isoDateConverter(dateObject) {
//   let datePart = dateObject.slice(0, 10).split('-').reverse().join('-');
//   let timePart = dateObject.slice(-8);
//   let output = datePart + ' ' + timePart;
//   return output;
// }