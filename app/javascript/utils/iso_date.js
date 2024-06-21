// Imported from https://raw.githubusercontent.com/airblade/stimulus-datepicker/main/src/iso_date.js

export default class IsoDate {

  // new IsoDate()
  // new IsoDate('')
  //
  // new IsoDate(date)
  //
  // new IsoDate("2022-05-16")
  //
  // new IsoDate("2022", "05", "16")
  constructor(dateOrYear, month, day) {
    if (dateOrYear && month && day) {
      this.yyyy = dateOrYear.toString()
      this.mm   = this.zeroPad(month)
      this.dd   = this.zeroPad(day)
    } else if (dateOrYear instanceof Date) {
      this.yyyy = dateOrYear.getFullYear().toString()
      this.mm   = this.zeroPad(dateOrYear.getMonth() + 1)
      this.dd   = this.zeroPad(dateOrYear.getDate())
    } else if (dateOrYear) {
      [this.yyyy, this.mm, this.dd] = dateOrYear.split('-')
    } else {
      const today = new Date()
      this.yyyy = today.getFullYear().toString()
      this.mm   = this.zeroPad(today.getMonth() + 1)
      this.dd   = this.zeroPad(today.getDate())
    }
  }

  toString() {
    return [this.yyyy, this.mm, this.dd].join('-')
  }

  setDayOfMonth(dayOfMonth) {
    const date = this.toDate()
    date.setDate(dayOfMonth)
    return new IsoDate(date)
  }

  // @param [Number] first day of the week (Sunday is 0)
  firstDayOfWeek(weekStart) {
    const date = this.toDate()
    date.setDate(date.getDate() - (7 + date.getDay() - weekStart) % 7)
    return new IsoDate(date)
  }

  // @param [Number] first day of the week (Sunday is 0)
  lastDayOfWeek(weekStart) {
    const date = this.toDate()
    date.setDate(date.getDate() + (weekStart + 6 - date.getDay()) % 7)
    return new IsoDate(date)
  }

  previousYear() {
    return this.increment('yyyy', -1)
  }

  nextYear() {
    return this.increment('yyyy', 1)
  }

  // @param [Boolean] whether to return the same day in the previous month (true)
  //    or the same day of the week in the previous month (false).
  previousMonth(sameDayOfMonth = true) {
    if (sameDayOfMonth) {
      return this.increment('mm', -1)
    } else {
      const month = this.mm
      let isoDate = this.increment('dd', -28)
      if (isoDate.mm == month) isoDate = isoDate.increment('dd', -7)
      return isoDate
    }
  }

  // @param [Boolean] whether to return the same day in the next month (true)
  //    or the same day of the week in the next month (false).
  nextMonth(sameDayOfMonth = true) {
    if (sameDayOfMonth) {
      return this.increment('mm', 1)
    } else {
      const month = this.mm
      let isoDate = this.increment('dd', 28)
      if (isoDate.mm == month) isoDate = isoDate.increment('dd', 7)
      return isoDate
    }
  }

  previousWeek() {
    return this.increment('dd', -7)
  }

  nextWeek() {
    return this.increment('dd', 7)
  }

  previousDay() {
    return this.increment('dd', -1)
  }

  nextDay() {
    return this.increment('dd', 1)
  }

  isWeekend() {
    return [0, 6].includes(this.toDate().getDay())
  }

  isToday() {
    return this.equals(new IsoDate())
  }

  isFirstDayOfWeek(weekStart) {
    return this.toDate().getDay() == weekStart
  }

  isLastDayOfWeek(weekStart) {
    const days = {0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5}
    return this.toDate().getDay() == days[weekStart]
  }

  equals(isoDate) {
    return this.toString() == isoDate.toString()
  }

  before(isoDate) {
    return this.toString() < isoDate.toString()
  }

  after(isoDate) {
    return this.toString() > isoDate.toString()
  }

  // @param unit [String] 'dd' | 'mm' | 'yyyy'
  // @param count [Number]
  increment(unit, count) {
    let date
    if (unit == 'dd') {
      date = this.toDate()
      date.setDate(date.getDate() + count)
    } else {
      date = unit == 'yyyy'
           ? new Date(+this.yyyy + count, +this.mm - 1)
           : new Date(+this.yyyy, +this.mm - 1 + count)
      const endOfMonth = IsoDate.daysInMonth(date.getMonth() + 1, date.getYear())
      date.setDate(+this.dd > endOfMonth ? endOfMonth : +this.dd)
    }
    return new IsoDate(date)
  }

  static isValidStr(str) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return false
    return this.isValidDate(...str.split('-').map(s => +s))
  }

  // @param year [Number] four-digit year
  // @param month [Number] month number (January is 1)
  // @param day [Number] day in month
  static isValidDate(year, month, day) {
    if (year  < 1000 || year  > 9999) return false
    if (month <    1 || month >   12) return false
    if (day   <    1 || day   > this.daysInMonth(month, year)) return false
    return true
  }

  // Returns the number of days in the month.
  //
  // @param month [Number] the month (1 is January)
  // @param year [Number] the year (e.g. 2022)
  // @return [Number] the number of days
  static daysInMonth(month, year) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31
    if ([4, 6, 9, 11].includes(month)) return 30
    return this.isLeapYear(year) ? 29 : 28
  }

  static isLeapYear(year) {
    if ((year % 400) == 0) return true
    if ((year % 100) == 0) return false
    return year % 4 == 0
  }

  // Returns a two-digit zero-padded string.
  zeroPad(num) {
    return num.toString().padStart(2, '0')
  }

  toDate() {
    // Cannot use `new Date('YYYY-MM-DD')`: it is treated as UTC, not local.
    return new Date(+this.yyyy, +this.mm - 1, +this.dd)
  }

  getMonthName() {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    return month[this.toDate().getMonth()];
  }
}