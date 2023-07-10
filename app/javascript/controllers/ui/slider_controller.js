import { Controller } from "@hotwired/stimulus";

export default class UIProgressController extends Controller {
  static targets = ["slider", "progress"];

  connect() {
    console.log("hello");
    if (this.hasSliderTarget) {
      this.sliderTarget.addEventListener("mousedown", this.dragStart.bind(this));
      document.addEventListener("mousemove", this.dragMove.bind(this));
      this.sliderTarget.addEventListener("mouseup", this.dragEnd.bind(this));
    }
  }

  dragStart(event) {
    event.preventDefault();
    this.dragging = true;
    const containerWidth = this.sliderTarget.parentElement.offsetWidth;
    const containerLeft = this.sliderTarget.parentElement.getBoundingClientRect().left;
    const sliderLeft = this.sliderTarget.getBoundingClientRect().left;
    this.startX = event.clientX;
    this.startPercentage = (sliderLeft - containerLeft) / containerWidth;
    this.sliderTarget.style.transition = "none"; // Disable transition during dragging
    document.addEventListener("mousemove", this.dragMove.bind(this));
    document.addEventListener("mouseup", this.dragEnd.bind(this));
  }

  dragMove(event) {
    let sliderOffset,
      filledInOffset = 0;
    if (this.dragging) {
      const containerWidth = this.sliderTarget.parentElement.offsetWidth;
      const sliderWidth = this.sliderTarget.offsetWidth;
      const containerLeft = this.sliderTarget.parentElement.getBoundingClientRect().left;
      const offsetX = event.clientX - containerLeft - sliderWidth / 2;
      const clampedOffsetX = Math.max(0, Math.min(containerWidth - sliderWidth, offsetX));
      let positionPercentage = (clampedOffsetX / (containerWidth - sliderWidth)) * 100;
      const filledInPercentage = 100 - positionPercentage;
      if (positionPercentage < 4) {
        positionPercentage = 4;
        filledInOffset = sliderOffset - 4;
      } else {
        sliderOffset = -2.1;
        filledInOffset = sliderOffset + 4;
      }

      this.sliderTarget.style.left = `${positionPercentage + sliderOffset}%`;
      this.progressTarget.style.transform = `translateX(-${filledInPercentage + filledInOffset}%)`;
    }
  }

  dragEnd() {
    this.dragging = false;
    this.sliderTarget.style.transition = ""; // Re-enable transition after dragging
    document.removeEventListener("mousemove", this.dragMove.bind(this));
    document.removeEventListener("mouseup", this.dragEnd.bind(this));
  }
}
