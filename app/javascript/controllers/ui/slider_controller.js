import { Controller } from "@hotwired/stimulus";

export default class UISliderController extends Controller {
  updateRange() {
    const input = this.element;
    const min = input.min;
    const max = input.max;
    const val = input.value;

    const fillRatio = parseInt(((val - min) * 100) / (max - min));
    input.style = `background-size: ${fillRatio}% 100%`;
    input.setAttribute("value", fillRatio);
  }
}
