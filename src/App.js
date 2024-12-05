import Handlebars from "handlebars";
import * as Pages from "./pages";

// Register partials
import Button from "./components/Button.js";
import Input from "./components/Input.js";
import Link from "./components/Link.js";

Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Link", Link);

export default class App {
  constructor() {
    this.state = {
      currentPage: "auth",
      anyArray: [],
    };
    this.appElement = document.getElementById("app");
  }

  render() {
    let template;
    if (this.state.currentPage === "auth") {
      template = Handlebars.compile(Pages.AuthPage);
      this.appElement.innerHTML = template();
    } else if (this.state.currentPage === "notFound") {
      template = Handlebars.compile(Pages.NotFoundPage);
      this.appElement.innerHTML = template();
    } else if (this.state.currentPage === "error") {
      template = Handlebars.compile(Pages.ErrorPage);
      this.appElement.innerHTML = template();
    }
  }
}
