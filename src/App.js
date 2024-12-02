import Handlebars from "handlebars";
import * as Pages from "./pages";

export default class App {
  constructor() {
    this.state = {
      currentPage: "home",
      anyArray: [],
    };
    this.appElement = document.getElementById("app");
  }

  render() {
    console.log("App is rendering");
  }
}
