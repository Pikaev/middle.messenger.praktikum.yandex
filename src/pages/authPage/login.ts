import Block from '../../framework/Block'
import { Input, IInput } from '@components/atoms/input'

interface InputConfig extends Omit<IInput, 'events' | 'value' | 'onClick'> {}

const inputsConfig: InputConfig[] = [
  {
    type: 'text',
    name: 'login',
    placeholder: 'Username',
    id: 'login',
    label: 'Логин',
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Password',
    id: 'password',
    label: 'Пароль',
  },
]
export class Login extends Block {
  constructor() {
    super({
      Inputs: inputsConfig.map(
        (item: InputConfig) =>
          new Input({
            label: item.label,
            class: 'auth__formItemInput',
            id: item.id,
            name: item.name,
            placeholder: item.placeholder,
            type: item.type,
            onClick: (event: Event) => {
              console.log('CLICK to input ', item.id)
              event.preventDefault()
              event.stopPropagation()
            },
          })
      ),
    })
  }

  render() {
    return `
      <main class="app">
        <section class="auth">
          <div class="auth__container">
            <h1 class="auth__title">Вход</h1>
            <form class="auth__form" action="" method="get">
              <div class="auth__formItems">
                <div class="auth__formItem">
                  {{{ Inputs }}}
                </div>
              </div>
              <button type="submit" class="auth__button navLink" data-page="chats">Войти</button>
              <a href="/register" class="auth__link navLink">Нет аккаунта?</a>
            </form>
          </div>
        </section>
      </main>
    `
  }
}
