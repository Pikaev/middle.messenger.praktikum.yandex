import { Login } from './pages/authPage/LoginPage'

interface IApp {
  currentPage: string
}

interface IAppElement extends HTMLElement {
  replaceWith(node: Node): void
}

export default class App {
  private state: IApp

  private appElement: IAppElement | null

  changePage(page: string) {
    this.state.currentPage = page
    history.pushState({ page }, '', `/${page}`)
    this.render()
  }

  handlePopState(event: PopStateEvent) {
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
    }
    this.appElement = document.getElementById('app') as IAppElement
    window.addEventListener('popstate', this.handlePopState.bind(this))
    this.initializePage()
  }

  render() {
    if (this.state.currentPage === 'login') {
      const loginPage = new Login()
      console.log('loginPage: ', loginPage.getContent())
      if (this.appElement) {
        this.appElement.replaceWith(loginPage.getContent())
      }
    }
  }
}
