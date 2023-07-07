import { Controller } from "@hotwired/stimulus";
import hljs from "highlight.js";

export default class extends Controller {
  connect() {
    console.log("hi");
    hljs.highlightAll();
  }
}
