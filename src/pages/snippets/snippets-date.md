---
layout: '../../layouts/BlogPost.astro'
title: 'Javascript date helpers'
description: 'Javascript date'
pubDate: 'Jan 7 2023'
---

##### dayOfYear

This snippet gets the day of the year from a Date object.

```javascript
const dayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)

dayOfYear(new Date()) // 272
```

##### Get Time From Date

This snippet can be used to get the time from a Date object as a string.

```javascript
const getColonTimeFromDate = (date) => date.toTimeString().slice(0, 8)

getColonTimeFromDate(new Date()) // "08:38:00"
```

##### Get Days Between Dates

This snippet can be used to find the difference in days between two dates.

```javascript
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24)
// or
const getDaysDiffBetweenDates = (date1, date2) =>
  Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24))

getDaysDiffBetweenDates(new Date('2019-01-13'), new Date('2019-01-15')) // 2
```

##### isAfterDate

This snippet can be used to check whether a date is after another date.

```javascript
const isAfterDate = (dateA, dateB) => dateA > dateB

isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)) // true
```

##### isBeforeDate

This snippet can be used to check whether a date is before another date.

```javascript
const isBeforeDate = (dateA, dateB) => dateA < dateB

isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21)) // true
```

##### isSameDate

This snippet can be used to check whether two dates are equal.

```javascript
const isSameDate = (dateA, dateB) => dateA.toISOString() === dateB.toISOString()

isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)) // true
```

##### maxDate

This snippet can be used to get the latest date.

```javascript
const maxDate = (...dates) => new Date(Math.max.apply(null, ...dates))

const array = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9),
]
maxDate(array) // 2018-03-11T22:00:00.000Z
```

##### minDate

This snippet can be used to get the earliest date.

```javascript
const minDate = (...dates) => new Date(Math.min.apply(null, ...dates))

const array = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9),
]
minDate(array) // 2016-01-08T22:00:00.000Z
```

##### tomorrow

This snippet can be used to get a string representation of tomorrow’s date.

```javascript
const tomorrow = () => {
  let t = new Date()
  t.setDate(t.getDate() + 1)
  return t.toISOString().split('T')[0]
}

tomorrow() // 2019-09-08 (if current date is 2018-09-08)
```
