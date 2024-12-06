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
  changePage(page) {
    this.state.currentPage = page;
    history.pushState({ page }, "", `/${page}`);
    this.render();
  }

  handlePopState(event) {
    const page = event.state ? event.state.page : "login";
    this.state.currentPage = page;
    this.render();
  }

  initializePage() {
    const path = window.location.pathname.slice(1);
    const validPages = [
      "login",
      "register",
      "notFound",
      "error",
      "userSettings",
      "chats",
    ];
    this.state.currentPage = validPages.includes(path) ? path : "login";
    this.render();
  }

  constructor() {
    this.state = {
      currentPage: "login",
      anyArray: [],
    };
    this.appElement = document.getElementById("app");
    window.addEventListener("popstate", this.handlePopState.bind(this));
    this.initializePage();
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
    this.attachEventListeners();
  }

  attachEventListeners() {
    const links = document.querySelectorAll(".navLink");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    });
  }
}
