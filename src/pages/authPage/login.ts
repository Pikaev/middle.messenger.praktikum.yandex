import Block from '../../framework/Block'

import { Button } from '@components/atoms/Button'
import { InputField, IInputField } from '@components/molecules/InputField'
import { Link } from '@components/atoms/Link'
interface InputConfig
  extends Omit<IInputField, 'events' | 'value' | 'onClick'> {}

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
          new InputField({
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
      Button: new Button({
        text: 'Войти',
        class: 'auth__button navLink',
        dataPage: 'chats',
        id: 'login',
        //TODO: добавить проверку на валидность данных
        // и вывод объекта с данными в консоль
        onClick: (event: Event) => {
          console.log('CLICK to button ', event)
          event.preventDefault()
          event.stopPropagation()
        },
      }),
      Link: new Link({
        text: 'Нет аккаунта?',
        href: '/register',
        dataPage: 'register',
        class: 'auth__link navLink',
        onClick: (event: Event) => {
          console.log('CLICK to link ', event)
          event.preventDefault()
          event.stopPropagation()
        },
      }),
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
              {{{ Button }}}
              {{{ Link }}}
            </form>
          </div>
        </section>
      </main>
    `
  }
}
