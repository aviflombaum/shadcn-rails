import { Controller } from "@hotwired/stimulus";
import { useTransition } from "https://ga.jspm.io/npm:stimulus-use@0.51.3/dist/index.js";

export default class extends Controller {
  connect() {
    useTransition(this);
  }
}
