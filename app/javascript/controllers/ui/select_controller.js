import { Controller } from "@hotwired/stimulus"
import { useClickOutside } from "https://ga.jspm.io/npm:stimulus-use@0.51.3/dist/index.js";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "../../utils/bodyScrollLock.js"

export default class UISelectController extends Controller {
  static targets = ["value", "menu", "wrapper"]
  static values = { value: String }

  connect() {
    useClickOutside(this);
    this.valueTarget.textContent = this.valueValue || this.valueTarget.textContent || "Select an option"
    this.selectedOption = null
  }

  disconnect() {
    clearAllBodyScrollLocks()
  }

  clickOutside(event) {
    this.menuTarget.classList.add("hidden")
  }

  toggle() {
    this.menuTarget.classList.toggle("hidden")
    this.wrapperTarget.querySelector("button").focus()

    const optionList = this.menuTarget.children
    const currentValue = this.valueTarget.textContent
    let childElement = null

    if (!this.menuTarget.classList.contains("hidden")) {
      this.adjustScrollPosition()
      disableBodyScroll(this.menuTarget)
    } else {
      enableBodyScroll(this.menuTarget)
    }

    Array.from(optionList).forEach(function(child){
      if(currentValue == child.textContent) {
        child.classList.add("bg-gray-200", "text-gray-900")
        childElement = child
      }
    })

    if(childElement) {
      this.selectedOption = childElement
      childElement.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'start' })
    }
  }

  adjustScrollPosition() {
    const menuHeight = this.menuTarget.offsetHeight
    const optionsHeight = this.menuTarget.scrollHeight
    if (optionsHeight > menuHeight) {
      this.menuTarget.style.maxHeight = `${menuHeight}px`
      this.menuTarget.style.overflowY = "scroll"
    } else {
      this.menuTarget.style.maxHeight = "auto"
      this.menuTarget.style.overflowY = "auto"
    }
  }

  select(event) {
    const option = event.target
    this.setSelectedOption(option)
    this.selectCurrentOption()
  }

  setValue(value) {
    this.valueValue = value
    this.valueTarget.textContent = value
  }

  key(event) {
    if(this.menuTarget.classList.contains("hidden")) return

    switch (event.key) {
      case "Escape":
        this.menuTarget.classList.add("hidden")
        break
      case "ArrowUp":
        this.selectPreviousOption(event)
        break
      case "ArrowDown":
        this.selectNextOption(event)
        break
      case "Enter":
        this.selectCurrentOption()
        break
    }
  }

  selectPreviousOption(event) {
    const selected = this.selectedOption //this.options.querySelector(".selected")
    const prevOption = selected ? selected.previousElementSibling : this.options.lastElementChild
    this.setSelectedOption(prevOption)
  }

  selectNextOption(event) {
    const selected = this.selectedOption //this.options.querySelector(".selected")
    const nextOption = selected ? selected.nextElementSibling : this.options.firstElementChild
    this.setSelectedOption(nextOption)
  }

  selectCurrentOption() {
    const selected = this.selectedOption
    if (selected) {
      this.valueTarget.textContent = selected.textContent
      this.menuTarget.classList.add("hidden")

      this.wrapperTarget.textContent = selected.getAttribute('value')
      this.wrapperTarget.dispatchEvent(new Event('change'))
    }
  }

  setSelectedOption(option) {
    if(!option) return

    // Reset the previously selected option
    if (this.selectedOption) {
      this.selectedOption.classList.remove("bg-gray-200", "text-gray-900")
    }

    // Set the new selected option
    option.classList.add("bg-gray-200", "text-gray-900")
    this.selectedOption = option
    option.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'start' })
  }
}
