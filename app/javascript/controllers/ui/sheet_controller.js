import UIDialog from "controllers/ui/dialog_controller";
import "https://ga.jspm.io/npm:@kanety/stimulus-static-actions@1.0.1/dist/index.modern.js";

export default class extends UIDialog {
  // Handles a button triggering the sheet in a different
  // controller instance
  // REFACTOR: This is the toggle method in dialog_controller with dom elements
  // instead of targets. Update the method there to receive dom elements and this
  // can be refactored to use those methods instead of reimplementing.
  toggleOutlet() {
    const sheetTarget = document.querySelector(this.element.dataset.UiSheetOutlet);
    const dialogTarget = sheetTarget.querySelector("[data-ui--sheet-target='dialog']");
    const modalTarget = sheetTarget.querySelector("[data-ui--sheet-target='modal']");
    const contentTarget = sheetTarget.querySelector("[data-ui--sheet-target='content']");
    const visible = dialogTarget.dataset.state == "closed" ? false : true;
    const mainTarget = document.body;
    if (!visible) {
      document.body.classList.add("overflow-hidden");
      contentTarget.classList.add("overflow-y-scroll", "h-full");
      dialogTarget.classList.remove("hidden");
      dialogTarget.dataset.state = "open";
      modalTarget.classList.remove("hidden");
      modalTarget.dataset.state = "open";
    } else {
      document.body.classList.remove("overflow-hidden");
      contentTarget.classList.remove("overflow-y-scroll", "h-full");
      dialogTarget.classList.add("hidden");
      dialogTarget.dataset.state = "closed";
      modalTarget.classList.add("hidden");
      modalTarget.dataset.state = "closed";
    }
  }
}
