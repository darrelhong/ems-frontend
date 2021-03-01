import { format, parseISO } from 'date-fns';

// export function formatDate(dateString) {
//     console.log(dateString);
//     console.log(parseISO(dateString));
//     var options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString([], options);
// }

export function formatDate(dateString, dateFormat = "d MMM yy hh:mmbbb") {
    if (!dateString) {
        return null;
    }
    return format(parseISO(dateString), dateFormat, new Date());
}