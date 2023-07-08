import { Controller } from "@hotwired/stimulus";
import { useTransition } from "stimulus-use";

export default class extends Controller {
  connect() {
    useTransition(this);
  }
}
