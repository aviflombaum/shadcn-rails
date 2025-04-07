import UIDialog from "controllers/ui/dialog_controller";
import "https://ga.jspm.io/npm:@kanety/stimulus-static-actions@1.0.1/dist/index.modern.js";

export default class extends UIDialog {
  /**
   * Handles a button triggering the sheet in a different controller instance
   * Uses the common toggleElements method from the parent class
   */
  toggleOutlet() {
    const sheetTarget = document.querySelector(this.element.dataset.UiSheetOutlet);
    const dialogTarget = sheetTarget.querySelector("[data-ui--sheet-target='dialog']");
    const modalTarget = sheetTarget.querySelector("[data-ui--sheet-target='modal']");
    const contentTarget = sheetTarget.querySelector("[data-ui--sheet-target='content']");
    
    // Determine current visibility state
    const visible = dialogTarget.dataset.state === "closed";
    
    // Use the shared toggle method with explicitly provided elements
    this.toggleElements(visible, {
      dialog: dialogTarget,
      modal: modalTarget,
      content: contentTarget,
      body: document.body
    });
  }
}