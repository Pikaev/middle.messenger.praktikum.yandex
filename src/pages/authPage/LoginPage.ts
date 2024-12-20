import Block from '../../framework/Block'

import { LoginTemplate } from '@components/templates/LoginTemplate'

export class Login extends Block {
  constructor() {
    super({
      LoginTemplate: new LoginTemplate(),
    })
  }

  render() {
    return `
      {{{ LoginTemplate }}}
    `
  }
}
