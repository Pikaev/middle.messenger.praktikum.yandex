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
      currentPage: "chats",
      anyArray: [],
    };
    this.appElement = document.getElementById("app");
  }

  render() {
    let template;
    if (this.state.currentPage === "login") {
      template = Handlebars.compile(Pages.LoginPage);
      this.appElement.innerHTML = template();
    } else if (this.state.currentPage === "register") {
      template = Handlebars.compile(Pages.RegisterPage);
      this.appElement.innerHTML = template();
    } else if (this.state.currentPage === "notFound") {
      template = Handlebars.compile(Pages.NotFoundPage);
      this.appElement.innerHTML = template();
    } else if (this.state.currentPage === "error") {
      template = Handlebars.compile(Pages.ErrorPage);
      this.appElement.innerHTML = template();
    } else if (this.state.currentPage === "userSettings") {
      template = Handlebars.compile(Pages.UserSettingsPage);
      this.appElement.innerHTML = template();
    } else if (this.state.currentPage === "chats") {
      template = Handlebars.compile(Pages.ChatsPage);
      this.appElement.innerHTML = template();
    }
  }
}
