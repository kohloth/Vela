# Native reference

```
// Javascript always accepts and returns epoch timestamps
// consisting of milliseconds, not seconds.

// Months are always zero indexed. i.e. 0 = Jan, 1 = Feb, 2 = Mar.

// #####################################################################
// Creating dates
// #####################################################################

// The date constructor works in accordance to local time, unless the contrary
// is specified in the constructor argument.

let date = new Date();
let date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
let date = new Date(1561816676902);
let date = new Date('Sat Jun 29 2019');
let date = new Date("March 21, 2012");
let date = new Date('Sat Jun 29 2019 14:57:56 GMT+0100 (British Summer Time)');
let date = new Date('2023-06-29T13:57:56.902Z');

// Accepts the same arguments as "new Date()", but returns epoch milliseconds,
// relative to UTC.
let milliseconds = let date = date.UTC(year, month, day, hours, minutes, seconds, milliseconds);

// Parses a string representation of a date, and returns epoch milliseconds.
// Usage is not recommended due to variance in parsing rules.
let milliseconds = Date.parse("March 21, 2012");

// #####################################################################
// Adjusting dates
// #####################################################################

// If values are given outside of a range, JS will update the
// value to the left. i.e. setMinutes(61) == setHours(1), setMinutes(1).

// Note that setMonth works by adding the current number of days
// (as per the return value of getDate()) to the 1st of the specified month.

date.setMilliseconds(milliseconds)
date.setSeconds(seconds, milliseconds)
date.setMinutes(minutes, seconds, milliseconds)
date.setHours(hours, minutes, seconds, milliseconds)
date.setDate(date)
date.setMonth(month, date)
date.setFullYear(year, month, date)
date.setTime(milliseconds)

// #####################################################################
// Adjusting dates as UTC
// #####################################################################

// All of these methods return part of the date, relative to UTC.
// Function signatures are identical to respective generic set counterparts.

date.setUTCMilliseconds(milliseconds)
date.setUTCSeconds(seconds, milliseconds)
date.setUTCMinutes(minutes, seconds, milliseconds)
date.setUTCHours(hours, minutes, seconds, milliseconds)
date.setUTCDate(date)
date.setUTCMonth(month, date)
date.setUTCFullYear(year, month, date)

// #####################################################################
// Getting date parts
// #####################################################################

// All of these methods return part of the date, relative
// to the timezone of the OS. i.e. getHours() returns GMT hours or somesuch.

date.getMilliseconds()
date.getSeconds()
date.getMinutes()
date.getHours()
date.getDate()
date.getMonth()
date.getFullYear()
date.getDay()
date.getTime() // Milliseconds since epoch

// #####################################################################
// Getting date parts as UTC
// #####################################################################

// All of these methods return part of the date, relative to UTC.

date.getUTCMilliseconds()
date.getUTCSeconds()
date.getUTCMinutes()
date.getUTCHours()
date.getUTCDate()
date.getUTCMonth()
date.getUTCFullYear()
date.getUTCDay()

// #####################################################################
// Converting date: Core
// #####################################################################

date.toString() // Sat Jun 29 2019 14:57:56 GMT+0100 (British Summer Time)
date.valueOf() // 1561816676902
date.toJSON() // 2019-06-29T13:57:56.902Z // Essentially an alias to toISOString()

// #####################################################################
// Converting date: Formats
// #####################################################################

date.toDateString() // Sat Jun 29 2019
date.toTimeString() // 14:57:56 GMT+0100 (British Summer Time)
date.toUTCString() // Sat, 29 Jun 2019 13:57:56 GMT
date.toISOString() // 2019-06-29T13:57:56.902Z // NB: Leading zeros will be present on milliseconds.

// #####################################################################
// Converting date: Locale
// #####################################################################

// These methods convert the javascript date object into
// a human readable string, using locale conventions.

// The arguemnts are optional, but can be used to override the
// locale that is automatically inferred.

date.toLocaleDateString(locale, options) // 29/06/2019
date.toLocaleTimeString(locale, options) // "14:57:56"
date.toLocaleString(locale, options) // "29/06/2019, 14:57:56"

// Examples

// British English uses day-month-year order and 24-hour time without AM/PM
console.log(event.toLocaleString('en-GB', { timeZone: 'UTC' }));
// expected output: 20/12/2012, 03:00:00

// Korean uses year-month-day order and 12-hour time with AM/PM
console.log(event.toLocaleString('ko-KR', { timeZone: 'UTC' }));
// expected output: 2012. 12. 20. 오전 3:00:00

// #####################################################################
// Other
// #####################################################################

// The number of minutes that the date object TIMEZONE
// is offset from UTC
date.getTimezoneOffset() // -60

// #####################################################################
// I/O Date format summary
// #####################################################################

// Epoch milliseconds
// 561816676902

// ISOString. ISOString appended with 'Z' is UTC.
// 2019-06-29T13:57:56.902Z

// ISO partial
// 2001
// 2013-11-29
// 2011-05

// UTC string
// Sat Jun 29 2019 14:57:56 GMT+0100 (British Summer Time)

// UTC partial
// Sat Jun 29 2019
// March 21, 2012

// Short date
// 21/01/2901
```

# date-fns reference

```
// Mutations, additive
var date = addMilliseconds(new Date(), 3)
var date = addSeconds(new Date(), 3)
var date = addMinutes(new Date(), 3)
var date = addHours(new Date(), 3)
var date = addDays(new Date(), 3)
var date = addMonths(new Date(), 3)
var date = addYears(new Date(), 3)

// Mutations, subtractive
var date = subMilliseconds(new Date(), 3)
var date = subSeconds(new Date(), 3)
var date = subMinutes(new Date(), 3)
var date = subHours(new Date(), 3)
var date = subDays(new Date(), 3)
var date = subMonths(new Date(), 3)
var date = subYears(new Date(), 3)

// last Friday at 7:26 p.m.
formatRelative(d1, d2)

// 3 days ago
formateDistance(d1, d2)

var result = distanceInWords(
new Date(2014, 6, 2),
new Date(2015, 0, 1)
)
//=> '6 months'

// Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
var dateToCompare = new Date(2015, 8, 6)
var result = closestTo(dateToCompare, [
new Date(2000, 0, 1),
new Date(2030, 0, 1)
])
//=> Tue Jan 01 2030 00:00:00

// Which date is closer to 6 September 2015?
var dateToCompare = new Date(2015, 8, 6)
var datesArray = [
new Date(2015, 0, 1),
new Date(2016, 0, 1),
new Date(2017, 0, 1)
]
var result = closestIndexTo(dateToCompare, datesArray)
//=> 1


// Sorting dates
var result = [
new Date(1995, 6, 2),
new Date(1987, 1, 11),
new Date(1989, 6, 10)
].sort(compareAsc) // Could also be compareDesc

//. isBefore, isAfter, isEqual
// Is 10 July 1989 after 11 February 1987?
var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
//=> true

// isFuture, isPast
var result = isFuture(date)

// max, min
// Which of these dates is the latest?
var result = max(
new Date(1989, 6, 10),
new Date(1987, 1, 11),
new Date(1995, 6, 2),
new Date(1990, 0, 1)
)
//=> Sun Jul 02 1995 00:00:00

// isSameSecond, isSameMinute, isSameHour, isSameDay,
// isSameWeek, isSameMonth, isSameQuarter, isSameYear
// isThisSecond, isThisMinute, isThisHour, isThisDay,
// isThisWeek, isThisMonth, isThisQuarter, isThisYear
// Are 2 September 2014 and 25 September 2014 in the same month?
var result = isSameMonth(
new Date(2014, 8, 2),
new Date(2014, 8, 25)
)
//=> true

// differenceInSeconds, differenceInMinutes, differenceInHours, differenceInWeeks
// differenceInCalendarWeeks, differenceInMonths, differenceInCalendarMonths,
// differenceInYears, differenceInCalendarYears
// How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
var result = differenceInMinutes(
new Date(2014, 6, 2, 12, 20, 0),
new Date(2014, 6, 2, 12, 7, 59)
)
//=> 12

// isToday, isTomorrow, isYesterday, isMonday, isTuesday...isSunday

// startOfMonth, endOfMonth ... minute, hour, day, week, month, year
```