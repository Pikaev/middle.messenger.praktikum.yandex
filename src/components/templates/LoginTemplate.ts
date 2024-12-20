import Block from '../../framework/Block'

import { LoginForm } from '@components/organisms/LoginForm'

export class LoginTemplate extends Block {
  constructor() {
    super({
      LoginForm: new LoginForm(),
    })
  }

  render() {
    return `
      <main class="app">
        <section class="auth">
          {{{ LoginForm }}}
        </section>
      </main>
    `
  }
}
