//@ts-nocheck
import * as Pages from './pages/index.js'
import { userSettingsFields } from './mockData.js'
import { Login } from './pages/authPage/login.ts'

export default class App {
  changePage(page) {
    this.state.currentPage = page
    history.pushState({ page }, '', `/${page}`)
    this.render()
  }

  handlePopState(event) {
    const page = event.state ? event.state.page : 'login'
    this.state.currentPage = page
    this.render()
  }

  initializePage() {
    const path = window.location.pathname.slice(1)
    const validPages = [
      'login',
      'register',
      'notFound',
      'error',
      'userSettings',
      'chats',
    ]
    this.state.currentPage = validPages.includes(path) ? path : 'login'
    this.render()
  }

  constructor() {
    this.state = {
      currentPage: 'login',
      anyArray: [],
    }
    this.appElement = document.getElementById('app')
    window.addEventListener('popstate', this.handlePopState.bind(this))
    this.initializePage()
  }

  render() {
    // const pageTemplates = {
    //   login: Pages.LoginPage,
    //   register: Pages.RegisterPage,
    //   notFound: Pages.NotFoundPage,
    //   error: Pages.ErrorPage,
    //   userSettings: Pages.UserSettingsPage,
    //   chats: Pages.ChatsPage,
    // };
    // const templateElement =
    //   pageTemplates[this.state.currentPage] || Pages.NotFoundPage;
    // const template = Handlebars.compile(templateElement);
    // this.appElement.innerHTML = template({ userSettingsFields });
    // this.attachEventListeners();

    if (this.state.currentPage === 'login') {
      const loginPage = new Login()
      console.log('loginPage: ', loginPage.getContent())
      this.appElement.replaceWith(loginPage.getContent())
    }
  }

  attachEventListeners() {
    const links = document.querySelectorAll('.navLink')
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        this.changePage(e.target.dataset.page)
      })
    })
  }
}
