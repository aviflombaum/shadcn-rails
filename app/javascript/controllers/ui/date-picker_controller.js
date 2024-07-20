import { Controller } from '@hotwired/stimulus'
import IsoDate from '../../utils/iso_date'
import { useClickOutside } from "https://ga.jspm.io/npm:stimulus-use@0.51.3/dist/index.js";

// All dates are local, not UTC.
export default class UIDatePickerController extends Controller {

  static targets = ['input', 'hidden', 'toggle', 'calendar',
    'month', 'year', 'prevMonth', 'today', 'nextMonth', 'days']

  static values = {
    date:           String,
    month:          String,
    year:           String,
    min:            String,
    max:            String,
    isCalendarOpen: {type: Boolean, default: false},
    isSelectOpen:   {type: Boolean, default: false},
    format:         {type: String, default: '%Y-%m-%d'},
    firstDayOfWeek: {type: Number, default: 1},
    dayNameLength:  {type: Number, default: 2},
    allowWeekends:  {type: Boolean, default: true},
    monthJump:      {type: String, default: 'dayOfMonth'},
    disallow:       Array,
    text:           Object,
    locales:        {type: Array, default: ['default']}
  }

  static defaultTextValue = {
    underflow:     '',
    overflow:      '',
    previousMonth: 'Previous month',
    nextMonth:     'Next month',
    today:         'Today',
    chooseDate:    'Choose Date',
    changeDate:    'Change Date'
  }

  text(key) {
    return {...this.constructor.defaultTextValue, ...this.textValue}[key]
  }

  connect() {
    useClickOutside(this);
    if (!this.hasHiddenTarget) this.addHiddenInput()
    this.addInputAction()
    this.addToggleAction()
    this.setToggleAriaLabel()
    this.dateValue = this.validate(this.inputTarget.textContent) ?  '' : this.inputTarget.textContent
  }

  disconnect() {
    this.isCalendarOpenValue = false
  }

  dateValueChanged(value, previousValue) {
    if (!this.hasHiddenTarget) return
    const dispatchChangeEvent = value != this.hiddenTarget.value;
    this.hiddenTarget.value = value
    // this.inputTarget.value = this.format(value)
    this.inputTarget.textContent = value || 'Pick a date'
    // Trigger change event on input when user selects date from picker.
    // http://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
    if (dispatchChangeEvent) this.inputTarget.dispatchEvent(new Event('change'))
    this.validate(value)
  }

  validate(dateStr) {
    this.validationMessage(dateStr)
  }

  validationMessage(dateStr) {
    if (!dateStr) return ''
    const isoDate = new IsoDate(dateStr)
    return this.rangeUnderflow(isoDate) ? this.underflowMessage()
          : this.rangeOverflow(isoDate)  ? this.overflowMessage()
          : ''
  }

  underflowMessage() {
    return this.text('underflow').replace('%s', this.format(this.minValue))
  }

  overflowMessage() {
    return this.text('overflow').replace('%s', this.format(this.maxValue))
  }

  addHiddenInput() {
    this.inputTarget.insertAdjacentHTML('afterend', `
      <input type="hidden"
            name="${this.inputTarget.getAttribute('name')}"
            value="${this.inputTarget.textContent}"
            data-ui--date-picker-target="hidden"/>
    `)
  }

  addInputAction() {
    this.addAction(this.inputTarget, 'ui--date-picker#update')
  }

  addToggleAction() {
    if (!this.hasToggleTarget) return

    let action = 'click->ui--date-picker#toggle'
    if (!(this.toggleTarget instanceof HTMLButtonElement)) action += ' keydown->ui--date-picker#toggle'

    this.addAction(this.toggleTarget, action)
  }

  addAction(element, action) {
    if (('action') in element.dataset) {
      element.dataset.action += ` ${action}`
    } else {
      element.dataset.action = action
    }
  }

  setToggleAriaLabel(value = this.text('chooseDate')) {
    if (!this.hasToggleTarget) return
    this.toggleTarget.setAttribute('aria-label', value);
  }

  update() {
    const dateStr = this.parse(this.inputTarget.value)
    if (dateStr != '') this.dateValue = dateStr
  }

  toggle(event) {
    event.preventDefault()
    event.stopPropagation()
    if (event.type == 'keydown' && ![' ', 'Enter'].includes(event.key)) return
    this.hasCalendarTarget ? this.close(true) : this.open(true)
  }

  close(animate) {
    if (animate) {
      this.calendarTarget.classList.add('fade-out')
      if (this.hasCssAnimation(this.calendarTarget)) {
        this.calendarTarget.onanimationend = e => e.target.remove()
      } else {
        this.calendarTarget.remove()
      }
    } else {
      this.calendarTarget.remove()
    }
    this.isCalendarOpenValue = false
    this.toggleTarget.focus()
  }

  open(animate, isoDate = this.initialIsoDate()) {
    this.isCalendarOpenValue = true
    this.render(isoDate, animate)
    this.focusDate(isoDate)
  }

  // Returns the date to focus on initially.  This is `dateValue` if given
  // or today.  Whichever is used, it is clamped to `minValue` and/or `maxValue`
  // dates if given.
  initialIsoDate() {
    return this.clamp(new IsoDate(this.dateValue))
  }

  clamp(isoDate) {
    return this.rangeUnderflow(isoDate) ? new IsoDate(this.minValue)
          : this.rangeOverflow(isoDate)  ? new IsoDate(this.maxValue)
          : isoDate
  }

  rangeUnderflow(isoDate) {
    return this.hasMinValue && isoDate.before(new IsoDate(this.minValue))
  }

  rangeOverflow(isoDate) {
    return this.hasMaxValue && isoDate.after(new IsoDate(this.maxValue))
  }

  isOutOfRange(isoDate) {
    return this.rangeUnderflow(isoDate) || this.rangeOverflow(isoDate)
  }

  clickOutside(event) {
    event.preventDefault()
    event.stopPropagation()
    if (!this.isCalendarOpenValue) return
    if (event.target.closest('[data-ui--date-picker-target="calendar"]')) return
    if (this.isSelectOpenValue) return
    this.close(true)
  }

  // To track option is clicked
  clickOption() {
    this.isSelectOpenValue = true
  }

  monthSelect(event) {
    this.monthValue = event.target.textContent
    this.redraw()
    setTimeout(()=>{
      this.isSelectOpenValue = false
    }, 500)
  }

  yearSelect(event) {
    this.yearValue = event.target.textContent
    this.redraw()
    setTimeout(()=>{
      this.isSelectOpenValue = false
    }, 500)
  }

  redraw() {
    const isoDate = this.dateFromMonthYearSelectsAndDayGrid()
    this.close(false)
    this.open(false, isoDate)
  }

  gotoPrevMonth() {
    const isoDate = this.dateFromMonthYearSelectsAndDayGrid()
    const previousMonthDate = isoDate.previousMonth(this.monthJumpValue == 'dayOfMonth')
    this.monthValue = previousMonthDate.mm
    this.yearValue  = previousMonthDate.yyyy
    this.close(false)
    this.open(false, previousMonthDate)
    this.prevMonthTarget.focus()
  }

  gotoNextMonth() {
    const isoDate = this.dateFromMonthYearSelectsAndDayGrid()
    const nextMonthDate = isoDate.nextMonth(this.monthJumpValue == 'dayOfMonth')
    this.monthValue = nextMonthDate.mm
    this.yearValue  = nextMonthDate.yyyy
    this.close(false)
    this.open(false, nextMonthDate)
    this.nextMonthTarget.focus()
  }

  gotoToday() {
    this.close(false)
    this.open(false, new IsoDate())
    this.todayTarget.focus()
  }

  // Returns a date where the month and year come from the dropdowns
  // and the day of the month from the grid.
  // @return [IsoDate]
  dateFromMonthYearSelectsAndDayGrid() {
    const isoDate     = this.initialIsoDate()
    this.yearValue  ||= isoDate.yyyy
    this.monthValue ||= isoDate.mm

    let day           = this.daysTarget.querySelector('button[tabindex="0"] time').textContent

    const daysInMonth = IsoDate.daysInMonth(+this.monthValue, +this.yearValue)
    if (day > daysInMonth) day = daysInMonth

    return new IsoDate(this.yearValue, this.monthValue, day)
  }

  // Generates the HTML for the calendar and inserts it into the DOM.
  //
  // Does not focus the given date.
  //
  // @param isoDate [IsoDate] the date of interest
  render(isoDate, animate){
    const cal = `<div class="absolute z-10 p-3 rounded-md border bg-white" data-ui--date-picker-target="calendar" data-action="keydown->ui--date-picker#key" role="dialog" aria-modal="true" aria-label="${this.text('chooseDate')}">
      <div class="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 overscroll-contain">
        <div class="space-y-4">
          <div class="flex justify-center relative items-center">
            <div class="flex items-center">
              <button data-ui--date-picker-target="prevMonth" data-action="ui--date-picker#gotoPrevMonth" title="${this.text('previousMonth')}" aria-label="${this.text('previousMonth')}"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left h-4 w-4"><path d="m15 18-6-6 6-6"></path></svg>
              </button>
            </div>
            <div class="flex">
              <div data-controller="ui--select" data-ui--select-target="wrapper" data-action="keydown->ui--select#key keydown.enter->ui--date-picker#clickOption click->ui--date-picker#clickOption change->ui--date-picker#monthSelect">
                <div class="relative">
                  <button data-action="ui--select#toggle" data-ui--date-picker-target="month" class="py-2 px-3 rounded-md flex items-center justify-between w-full text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <span data-ui--select-target="value">${isoDate.getMonthName()}</span>
                    <svg class="w-4 h-4 mt-1 stroke-slate-400" fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div data-ui--select-target="menu" data-action="click->ui--select#select"
                    class="absolute z-10 bg-white rounded-md shadow-lg mt-2 w-30 py-1 hidden overflow-auto overscroll-contain max-h-60">
                    ${this.monthOptions(+isoDate.mm)}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex">
              <div data-controller="ui--select" data-ui--select-target="wrapper" data-action="keydown->ui--select#key keydown.enter->ui--date-picker#clickOption click->ui--date-picker#clickOption change->ui--date-picker#yearSelect">
                <div class="relative">
                  <button data-action="ui--select#toggle" data-ui--date-picker-target="year" class="py-2 px-3 rounded-md flex items-center justify-between w-full text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <span data-ui--select-target="value">${isoDate.yyyy}</span>
                    <svg class="w-4 h-4 mt-1 stroke-slate-400" fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div data-ui--select-target="menu" data-action="click->ui--select#select"
                    class="absolute z-10 bg-white rounded-md shadow-lg mt-2 w-20 py-1 hidden overflow-auto overscroll-contain max-h-60 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded">
                    ${this.yearOptions(+isoDate.yyyy)}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center">
              <button data-ui--date-picker-target="nextMonth" data-action="ui--date-picker#gotoNextMonth" title="${this.text('nextMonth')}" aria-label="${this.text('nextMonth')}"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right h-4 w-4"><path d="m9 18 6-6-6-6"></path></svg>
              </button>
            </div>
          </div>
          <div class="sdp-days-of-week grid grid-cols-7 text-center">
            ${this.daysOfWeek()}
          </div>
          <div class="sdp-days grid grid-cols-7 text-center" role="grid" data-ui--date-picker-target="days" data-action="click->ui--date-picker#pick">
            ${this.days(isoDate)}
          </div>
          <div class="flex items-center justify-center">
            <button data-ui--date-picker-target="today" data-action="ui--date-picker#gotoToday"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground bg-transparent opacity-50 hover:opacity-100 py-1 px-2"
              title="${this.text('today')}" aria-label="${this.text('today')}">
              Today
            </button>
          </div>
        </div>
      </div>
    </div>`
    this.element.insertAdjacentHTML('beforeend', cal)
  }

  pick(event) {
    event.preventDefault()

    let button, time
    switch (event.target.constructor) {
      case HTMLTimeElement:
        time = event.target
        button = time.parentElement
        break
      case HTMLButtonElement:
        button = event.target
        time = button.children[0]
        break
      default:
        return
    }

    if (button.hasAttribute('aria-disabled')) return
    const dateStr = time.getAttribute('datetime')
    this.selectDate(new IsoDate(dateStr))
  }

  key(event) {
    // if(this.isSelectOpenValue){return}
    switch (event.key) {
      case 'Escape':
        this.close(true)
        return
      case 'Tab':
        if (event.shiftKey) {
          if (document.activeElement == this.firstTabStop()) {
            event.preventDefault()
            this.lastTabStop().focus()
          }
        } else {
          if (document.activeElement == this.lastTabStop()) {
            event.preventDefault()
            this.firstTabStop().focus()
          }
        }
        return
    }

    const button = event.target
    if (!this.daysTarget.contains(button)) return

    const dateStr = button.children[0].getAttribute('datetime')
    const isoDate = new IsoDate(dateStr)

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (!button.hasAttribute('aria-disabled')) this.selectDate(isoDate)
        break
      case 'ArrowUp':
      case 'k':
        this.focusDate(isoDate.previousWeek())
        break
      case 'ArrowDown':
      case 'j':
        this.focusDate(isoDate.nextWeek())
        break
      case 'ArrowLeft':
      case 'h':
        this.focusDate(isoDate.previousDay())
        break
      case 'ArrowRight':
      case 'l':
        this.focusDate(isoDate.nextDay())
        break
      case 'Home':
      case '0':
      case '^':
        this.focusDate(isoDate.firstDayOfWeek(this.firstDayOfWeekValue))
        break
      case 'End':
      case '$':
        this.focusDate(isoDate.lastDayOfWeek(this.firstDayOfWeekValue))
        break
      case 'PageUp':
        event.shiftKey
          ? this.focusDate(isoDate.previousYear())
          : this.focusDate(isoDate.previousMonth(this.monthJumpIsDayOfMonth()))
        break
      case 'PageDown':
        event.shiftKey
          ? this.focusDate(isoDate.nextYear())
          : this.focusDate(isoDate.nextMonth(this.monthJumpIsDayOfMonth()))
        break
      case 'b':
        this.focusDate(isoDate.previousMonth(this.monthJumpIsDayOfMonth()))
        break
      case 'B':
        this.focusDate(isoDate.previousYear())
        break
      case 'w':
        this.focusDate(isoDate.nextMonth(this.monthJumpIsDayOfMonth()))
        break
      case 'W':
        this.focusDate(isoDate.nextYear())
        break
    }
  }

  firstTabStop() {
    return this.prevMonthTarget
  }

  lastTabStop() {
    return this.todayTarget
  }

  monthJumpIsDayOfMonth() {
    return this.monthJumpValue == 'dayOfMonth'
  }


  // @param isoDate [isoDate] the date to select
  selectDate(isoDate) {
    if(this.isSelectOpenValue) return

    this.close(true)
    this.toggleTarget.focus()
    this.dateValue = isoDate.toString()
  }

  // Focuses the given date in the calendar.
  // If the date is not visible because it is in the hidden part of the previous or
  // next month, the calendar is updated to show the corresponding month.
  //
  // @param isoDate [IsoDate] the date to focus on in the calendar
  focusDate(isoDate) {
    const time = this.daysTarget.querySelectorAll(`time[datetime="${isoDate.toString()}"]`)[0]

    if (!time) {
      const leadingDatetime = this.daysTarget.querySelectorAll('time')[0].getAttribute('datetime')
      if (isoDate.before(new IsoDate(leadingDatetime))) {
        this.gotoPrevMonth()
      } else {
        this.gotoNextMonth()
      }
      this.focusDate(isoDate)
      return
    }

    const currentFocus = this.daysTarget.querySelectorAll('button[tabindex="0"]')[0]
    if (currentFocus) currentFocus.setAttribute('tabindex', -1)

    const button = time.parentElement
    button.setAttribute('tabindex', 0)
    button.focus()

    if (!button.hasAttribute('aria-disabled')) {
      this.setToggleAriaLabel(`${this.text('changeDate')}, ${this.format(isoDate.toString())}`)
    }
  }

  // @param selected [Number] the selected month (January is 1)
  monthOptions(selected) {
    const klass= 'hover:bg-gray-100 cursor-pointer py-2 px-4'
    return this.monthNames('long')
      .map((name, i) => `<div class="${klass}" value="${i + 1}" ${i + 1 == selected ? 'selected' : ''}>${name}</div>`)
      .join('')
  }

  // @param selected [Number] the selected year
  yearOptions(selected) {
    const years = []
    const extent = 10
    const klass= 'hover:bg-gray-100 cursor-pointer py-2 px-4'

    for (let y = selected - extent; y <= selected + extent; y++) years.push(y)
    return years
      .map(year => `<div class="${klass}" value=${year} ${year == selected ? 'selected' : ''}>${year}</div>`)
      .join('')
  }

  daysOfWeek() {
    return this.dayNames('long')
        .map(name => `<div scope="col" class="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]" aria-label="${name}">
            ${name.slice(0, this.dayNameLengthValue)} </div>`)
            .join('')
  }

  // Generates the day grid for the given date's month.
  // The end of the previous month and the start of the next month
  // are shown if there is space in the grid.
  //
  // Does not focus on the given date.
  //
  // @param isoDate [IsoDate] the month of interest
  // @return [String] HTML for the day grid
  days(isoDate) {
    let days = []
    const selected = new IsoDate(this.dateValue)
    let date = isoDate.setDayOfMonth(1).firstDayOfWeek(this.firstDayOfWeekValue)

    while (true) {
      const isPreviousMonth = date.mm != isoDate.mm && date.before(isoDate)
      const isNextMonth     = date.mm != isoDate.mm && date.after(isoDate)

      if (isNextMonth && date.isFirstDayOfWeek(this.firstDayOfWeekValue)) break

      const outsideMonthClass = "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30"
      const klass = this.classAttribute(
        "sdp-day inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-accent-foreground",
        isPreviousMonth       ? outsideMonthClass : 'text-accent-foreground',
        isNextMonth           ? outsideMonthClass : 'text-accent-foreground',
        date.isToday()        ? 'sdp-today bg-accent' : '',
        date.isWeekend()      ? 'sdp-weekend'    : '',
        date.equals(selected) ? "sdp-selected bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground" : ''
      )

      days.push(`
          <button type="button"
                  tabindex="-1"
                  ${klass}
                  ${date.equals(selected) ? 'aria-selected="true"' : ''}
                  ${this.isDisabled(date) ? 'aria-disabled="true"' : ''}
          >
            <time datetime="${date.toString()}">${+date.dd}</time>
          </button>
      `)
      date = date.nextDay()
    }

    return days.join('')
  }

  classAttribute(...classes) {
    const presentClasses = classes.filter(c => c)
    if (presentClasses.length == 0) return ''
    return `class="${presentClasses.join(' ')}"`
  }

  isDisabled(isoDate) {
    return this.isOutOfRange(isoDate)
        || (isoDate.isWeekend() && !this.allowWeekendsValue)
        || (this.disallowValue.includes(isoDate.toString()))
  }

  // Formats an ISO8601 date, using the `format` value, for display to the user.
  // Returns an empty string if `str` cannot be formatted.
  //
  // @param str [String] a date in YYYY-MM-DD format
  // @return [String] the date in a user-facing format, or an empty string if the
  //   given date cannot be formatted
  format(str) {
    if (!IsoDate.isValidStr(str)) return ''

    const [yyyy, mm, dd] = str.split('-')

    return this.formatValue
      .replace('%d',  dd)
      .replace('%-d', +dd)
      .replace('%m',  this.zeroPad(mm))
      .replace('%-m', +mm)
      .replace('%B',  this.localisedMonth(mm, 'long'))
      .replace('%b',  this.localisedMonth(mm, 'short'))
      .replace('%Y',  yyyy)
      .replace('%y',  +yyyy % 100)
  }

  // Returns a two-digit zero-padded string.
  zeroPad(num) {
    return num.toString().padStart(2, '0')
  }

  // Parses a date from the user, using the `format` value, into an ISO8601 date.
  // Returns an empty string if `str` cannot be parsed.
  //
  // @param str [String] a user-facing date, e.g. 19/03/2022
  // @return [String] the date in ISO8601 format, e.g. 2022-03-19; or an empty string
  //   if the given date cannot be parsed
  parse(str) {
    const directives = {
        'd': ['\\d{2}',   function(match) { this.day = +match }],
      '-d': ['\\d{1,2}', function(match) { this.day = +match }],
        'm': ['\\d{2}',   function(match) { this.month = +match }],
      '-m': ['\\d{1,2}', function(match) { this.month = +match }],
        'B': ['\\w+',     function(match, controller) { this.month = controller.monthNumber(match, 'long') }],
        'b': ['\\w{3}',   function(match, controller) { this.month = controller.monthNumber(match, 'short') }],
        'Y': ['\\d{4}',   function(match) { this.year = +match }],
        'y': ['\\d{2}',   function(match) { this.year = 2000 + +match }]
    }
    const funcs = []
    const re = new RegExp(
      this.formatValue.replace(/%(d|-d|m|-m|B|b|Y|y)/g, function(_, p) {
        const directive = directives[p]
        funcs.push(directive[1])
        return `(${directive[0]})`
      }))
    const matches = str.match(re)
    if (!matches) return ''

    const parts = {}
    for (let i = 0, len = funcs.length; i < len; i++) {
      funcs[i].call(parts, matches[i + 1], this)
    }

    if (!IsoDate.isValidDate(parts.year, parts.month, parts.day)) return ''
    return new IsoDate(parts.year, parts.month, parts.day).toString()
  }

  // Returns the name of the month in the configured locale.
  //
  // @param month [Number] the month number (January is 1)
  // @param monthFormat [String] "long" (January) | "short" (Jan)
  // @return [String] the localised month name
  localisedMonth(month, monthFormat) {
    // Use the middle of the month to avoid timezone edge cases
    return new Date(`2022-${month}-15`).toLocaleString(this.localesValue, {month: monthFormat})
  }

  // Returns the number of the month (January is 1).
  //
  // @param name [String] the name of the month in the current locale (e.g. January or Jan)
  // @param monthFormat [String] "long" (January) | "short" (Jan)
  // @return [Number] the number of the month, or 0 if name is not recognised
  monthNumber(name, monthFormat) {
    return this.monthNames(monthFormat).findIndex(m => name.includes(m)) + 1
  }

  // Returns the month names in the configured locale.
  //
  // @param format [String] "long" (January) | "short" (Jan)
  // @return [Array] localised month names
  monthNames(format) {
    const formatter = new Intl.DateTimeFormat(this.localesValue, {month: format})
    return ['01','02','03','04','05','06','07','08','09','10','11','12'].map(mm =>
      // Use the middle of the month to avoid timezone edge cases
      formatter.format(new Date(`2022-${mm}-15`))
    )
  }

  // Returns the day names in the configured locale, starting with the
  // firstDayOfTheWeekValue.
  //
  // @param format [String] "long" (Monday) | "short" (Mon) | "narrow" (M)
  // @return [Array] localised day names
  dayNames(format) {
    const formatter = new Intl.DateTimeFormat(this.localesValue, {weekday: format})
    const names = []
    // Ensure date in month is two digits. 2022-04-10 is a Sunday
    for (let i = this.firstDayOfWeekValue + 10, n = i + 7; i < n; i++) {
      names.push(formatter.format(new Date(`2022-04-${i}T00:00:00`)))
    }
    return names
  }

  hasCssAnimation(el) {
    return window.getComputedStyle(el).getPropertyValue('animation-name') !== 'none';
  }

}
