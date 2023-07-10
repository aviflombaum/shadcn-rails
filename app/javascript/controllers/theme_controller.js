// https://github.com/excid3/tailwindcss-stimulus-components/blob/master/src/tabs.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  toggle() {
    document.documentElement.classList.toggle("dark");
  }
}
