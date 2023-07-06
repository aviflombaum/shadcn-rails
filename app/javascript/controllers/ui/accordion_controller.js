// Inspired by https://github.com/kanety/stimulus-accordion
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  get togglers() {
    return this.context.bindingObserver.bindings
      .filter((binding) => binding.action.methodName == "toggle")
      .map((binding) => binding.action.element);
  }

  get openedTogglers() {
    return this.togglers.filter((toggler) => this.isOpened(toggler));
  }

  get contents() {
    return this.scope.findAllElements("[data-accordion-id]");
  }

  connect() {
    this.init();
  }

  init() {
    this.togglers.forEach((toggler) => {
      let content = this.findContent(toggler);
      if (this.isOpened(toggler)) {
        this.show(toggler, content, false);
      } else {
        this.hide(toggler, content, false);
      }
    });
  }

  toggle(e) {
    this.togglers.forEach((toggler) => {
      if (toggler.contains(e.target)) {
        if (this.isOpened(toggler)) {
          this.close(toggler);
        } else {
          this.open(toggler);
        }
      } else if (this.isOpened(toggler)) {
        this.close(toggler);
      }
    });

    e.preventDefault();
  }

  open(toggler) {
    let content = this.findContent(toggler);
    this.show(toggler, content);
    this.dispatch("opened", { detail: { toggler: toggler, content: content } });
  }

  close(toggler) {
    let content = this.findContent(toggler);
    this.hide(toggler, content);
    this.dispatch("closed", { detail: { toggler: toggler, content: content } });
  }

  show(toggler, content, transition = true) {
    if (transition) {
      content.style.height = "0px";
      content.removeEventListener("transitionend", this.transitionEnd);
      content.addEventListener("transitionend", this.transitionEnd);
      setTimeout(() => {
        content.style.height = content.scrollHeight + "px";
      });
    }

    this.toggleClass(toggler, content, true);
    this.toggleText(toggler, true);
  }

  hide(toggler, content, transition = true) {
    if (transition) {
      content.style.height = content.scrollHeight + "px";
      content.removeEventListener("transitionend", this.transitionEnd);
      content.addEventListener("transitionend", this.transitionEnd);
      setTimeout(() => {
        content.style.height = "0px";
      });
    }

    this.toggleClass(toggler, content, false);
    this.toggleText(toggler, false);
  }

  transitionEnd(e) {
    e.target.style.height = "";
  }

  toggleClass(toggler, content, opened) {
    if (opened) {
      toggler.classList.add("st-accordion__icon--opened");
      content.classList.add("st-accordion__content--visible");
      toggler.dataset.state = "open";
    } else {
      toggler.classList.remove("st-accordion__icon--opened");
      content.classList.remove("st-accordion__content--visible");
      toggler.dataset.state = "closed";
    }
  }

  toggleText(toggler, opened) {
    let text;
    if (opened) {
      text = toggler.getAttribute("data-accordion-opened-text-param");
    } else {
      text = toggler.getAttribute("data-accordion-closed-text-param");
    }
    if (text) toggler.innerHTML = text;
  }

  isOpened(toggler) {
    return toggler.matches(".st-accordion__icon--opened");
  }

  findContent(toggler) {
    let id = this.getID(toggler);
    return this.scope.findElement(`[data-accordion-id="${id}"]`);
  }

  getID(toggler) {
    return toggler.getAttribute("href").replace(/^#/, "");
  }
}
