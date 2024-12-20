import Block from '../../framework/Block'

export interface IButton {
  class?: string
  events?: {
    click: (e: Event) => void
  }
  id: string
  onClick(e: Event): unknown
  text: string
  dataPage?: string
}
export class Button extends Block {
  constructor(props: IButton) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick(e),
      },
    })
  }

  render() {
    return `
      <button id="{{id}}" class="button {{class}}" data-page="{{dataPage}}"
      {{#if disabled}}
        disabled
      {{/if}}>{{text}}</button>
    `
  }
}
