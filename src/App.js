import Handlebars from "handlebars";
import * as Pages from "./pages";

// Register partials
import Input from "./components/Input.js";

Handlebars.registerPartial("Input", Input);
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
    }
  }
}
