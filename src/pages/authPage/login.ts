//@ts-nocheck
import Block from "../../framework/Block";
import { Input } from "../../components/input/input";

export class Login extends Block {
  constructor() {
    super({
      InputCreate: new Input({
        type: "text",
        name: "login",
        placeholder: "Username",
        class: "auth__formItemInput",
        id: "login",
        onClick: (event) => {
          console.log("CLICK to input");
          event.preventDefault();
          event.stopPropagation();
        },
      }),
    });
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
                  <label for="login" class="auth__formItemLabel">Логин</label>
                  {{{ InputCreate }}}
                </div>
                <div class="auth__formItem">
                  <label for="password" class="auth__formItemLabel">Пароль</label>
                  <input type="password" name="password" placeholder="Password" class="auth__formItemInput" id="password" />
                </div>
              </div>
              <button type="submit" class="auth__button navLink" data-page="chats">Войти</button>
              <a href="/register" class="auth__link navLink">Нет аккаунта?</a>
            </form>
          </div>
        </section>
      </main>
    `;
  }
}
