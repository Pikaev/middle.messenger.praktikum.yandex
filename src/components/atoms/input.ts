import Block from '../../framework/Block'

export interface IInput {
  class?: string
  events?: {
    click: (e: Event) => void
  }
  id: string
  name: string
  onClick(e: Event): unknown
  placeholder?: string
  type: string
  value?: string
}
export class Input extends Block {
  constructor(props: IInput) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick(e),
      },
    })
  }

  render() {
    return `
      <input type="{{type}}" name="{{name}}" placeholder="{{placeholder}}" class="{{class}}" id="{{id}}" value="{{value}}" />
    `
  }
}
