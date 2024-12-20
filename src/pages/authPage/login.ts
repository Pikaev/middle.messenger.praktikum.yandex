import Block from '../../framework/Block'

import { Button } from '@components/atoms/Button'
import { InputAuth, IInputAuth } from '@components/molecules/InputAuth'
import { Link } from '@components/atoms/Link'
import { Title } from '@components/atoms/Title'
interface InputConfig
  extends Omit<IInputAuth, 'events' | 'value' | 'onClick'> {}

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
          new InputAuth({
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
      Title: new Title({
        title: 'Вход',
        class: 'auth__title',
      }),
    })
  }

  render() {
    return `
      <main class="app">
        <section class="auth">
          <div class="auth__container">
            {{{ Title }}}
            <form class="auth__form" action="" method="get">
              <div class="auth__formItems">
                {{{ Inputs }}}
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
