import Block from '../../framework/Block'

export interface ILabel {
  class?: string
  events?: {
    click: (e: Event) => void
  }
  id: string
  label?: string
}
export class Label extends Block {
  constructor(props: ILabel) {
    super({
      ...props,
    })
  }

  render() {
    return `
      <label for="{{id}}" class="{{class}}">{{label}}</label>
    `
  }
}
