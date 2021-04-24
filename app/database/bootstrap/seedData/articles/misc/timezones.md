# Background

* Local times vary thoughout the globe in an complex way, as a result of complex geographic, social and political factors. However, both unix epoch time and UTC (Coordinate universal time) can be used for the delineation of absolute timestamps.
* UTC was formalised in the 1960's, and is based on Greenwich mean time.
* Presently, UTC is frequently adjusted by means of the injection of "leap seconds", to keep it close to mean solar time at Greenwich. Leap seconds are inserted into UTC every few years - typically once every two years.
* A true solar year is 365 days, 5 hours, 48 minutes, and 46 seconds. This is 365.2422 days.
* A leap year, wherein an extra day occurs, would happen every four years in Caesar's Julian calendar, without exception. However, this compensation was an over-compensation, as it assumed the standard year to be 365.25 years - which itself is innacurate by 0.0078 days per year. This culminates in an inaccuracy of 1.56 days for every 200 years.
* The Gregorian calendar, which was introduced by Pope Gregory in 1582, has a more advanced and accurate algorithim for the insertion of extra days. This algorithm measures a year to be 365.2425 days, which is only out by 0.0003 days per year. This culminates in an innacurracy of 0.6 days for every 2000 years.
* The Gregorian leap year algorithm is: Every year that is exactly divisible by four is a leap year, except for years that are exactly divisible by 100, but these centurial years are leap years if they are exactly divisible by 400. For example, the years 1700, 1800, and 1900 are not leap years, but the year 2000 is.
* UTC stands for both "coordinated universal time" and "temps universel coordonne." The abbreviation UTC was chosen because it does not favour either language.
* England runs on the local time zone GMT (which is equivalent to UTC+0) for half of the year, but between March and October, inclusive, it runs on BST (UTC+1).
* BST begins at 01:00 GMT on the last Sunday of March and ends at 01:00 GMT (02:00 BST) on the last Sunday of October.
* There are currently 37 different local time zones in use throughout the world. Most are offset from UTC by a positive or negative number of whole years. However, some are offset from UTC by 15, 30, or 45 minutes.

# Zoneinfo

* A collection of data known as the timezone database is frequently used in programming to convert a time expression from one zone to another.
* The timezone database is also sometimes known as zoneinfo, or the Olson database.
* This database matches time offset data to areas of the globe with strings, which typically take a format of `Continent/City`. Examples of time zones in use are: `Africa/Abidjan`, `America/New_York` and `Europe/London`.
* The zoneinfo database is leveraged by PHP, Linux, and SQL.

# Relationship to programming endeavours

* PHP gets it's date from the hosting web server
* Javasript gets it's date from the client system

Converting a UTC date to a local date is quite trivial with Javascript, and may be done as follows:
```
var utcString = '2015-08-27T00:00:00.000Z';
var localDate = new Date(utcString);
```

To convert a local date to a UTC date with Javascript:
```
function localToUtc(date) {
	var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
	date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
	return new Date(now_utc);
}
var localDate = new Date();
var utcDate = localToUtc(localDate);
```

# Programming date formats

```
// ISO and UTC dates
// ISO 8601 is the international standard for the representation of dates and times.
// The ISO 8601 syntax (YYYY-MM-DD) is also the preferred JavaScript date format:
var d = new Date("2015-03-25");
// ISO dates can be written without specifying the day (YYYY-MM):
var d = new Date("2015-03");
// ISO dates can be written without month and day (YYYY):
var d = new Date("2015");
// ISO dates can be written with added hours, minutes, and seconds (YYYY-MM-DDTHH:MM:SSZ):
// UTC time is defined with a capital letter Z.
var d = new Date("2015-03-25T12:00:00Z");
// If you want to modify the ISO time relative to UTC, remove the Z and add +HH:MM or -HH:MM instead:
var d = new Date("2015-03-25T12:00:00-06:30");

// JavaScript Short Dates.
// Short dates are written with an "MM/DD/YYYY" syntax like this:
var d = new Date("03/25/2015");
```