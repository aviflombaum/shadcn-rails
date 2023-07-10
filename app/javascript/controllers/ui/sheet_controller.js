import Dropdown from "./sheet_dropdown_controller.js";

export default class extends Dropdown {
  static targets = ["menu", "overlay", "modal"];

  _show() {
    this.overlayTarget.classList.remove(this.toggleClass);
    this.menuTarget.dataset.state = "open";
    this.modalTarget.dataset.state = "open";
    this.modalTarget.classList.remove("hidden");
    super._show(
      (() => {
        this._activeClassList[1].forEach((klass) => this.overlayTarget.classList.add(klass));
        this._invisibleClassList[1].forEach((klass) => this.overlayTarget.classList.remove(klass));
        this._visibleClassList[1].forEach((klass) => this.overlayTarget.classList.add(klass));
        setTimeout(
          (() => {
            this._enteringClassList[1].forEach((klass) =>
              this.overlayTarget.classList.remove(klass),
            );
          }).bind(this),
          this.enterTimeout[1],
        );
      }).bind(this),
    );
  }

  _hide() {
    this._leavingClassList[1].forEach((klass) => this.overlayTarget.classList.add(klass));

    super._hide(
      (() => {
        setTimeout(
          (() => {
            this._visibleClassList[1].forEach((klass) =>
              this.overlayTarget.classList.remove(klass),
            );
            this._invisibleClassList[1].forEach((klass) => this.overlayTarget.classList.add(klass));
            this._activeClassList[1].forEach((klass) => this.overlayTarget.classList.remove(klass));
            this._leavingClassList[1].forEach((klass) =>
              this.overlayTarget.classList.remove(klass),
            );
            this.overlayTarget.classList.add(this.toggleClass);
          }).bind(this),
          this.leaveTimeout[1],
        );
      }).bind(this),
    );
  }
}
