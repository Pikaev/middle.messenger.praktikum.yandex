//@ts-nocheck
import Block from '../../framework/Block'

export class Input extends Block {
  constructor(props: any) {
    super({
      ...props,
      events: {
        click: (e) => props.onClick(e),
      },
    })
  }

  render() {
    return `
    <div class="auth__formItem">
      <label for="{{id}}" class="auth__formItemLabel">{{label}}</label>
      <input type="{{type}}" name="{{name}}" placeholder="{{placeholder}}" class="{{class}}" id="{{id}}" value="{{value}}" />
    </div>
    `
  }
}
