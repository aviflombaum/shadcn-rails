import { Controller } from "@hotwired/stimulus";

function formatPhoneNumber(phoneNumber, country) {
  return country + " " + phoneNumber;
}

const phoneCharactersRegex = /^(\ |\-|[0-9])*$/;

export default class UIPhoneNumberController extends Controller {
  static targets = ["input", "country", "phone"];

  userChangedInput(event) {
    const changedCharacter = event.data;

    if (!phoneCharactersRegex.test(changedCharacter)) {
      this.phoneTarget.value = this.phoneTarget.value.replace(changedCharacter, "");
      return;
    }

    this.inputTarget.value = formatPhoneNumber(this.phoneTarget.value, this.countryTarget.value);
  }
}
