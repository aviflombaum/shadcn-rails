import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["toggleButton"];

  connect() {
    this.loadThemePreference();
  }

  toggle() {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    this.saveThemePreference(isDarkMode);
  }

  loadThemePreference() {
    const isDarkMode = localStorage.getItem("themePreference") === "true";
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }

  saveThemePreference(isDarkMode) {
    localStorage.setItem("themePreference", isDarkMode);
  }
}
