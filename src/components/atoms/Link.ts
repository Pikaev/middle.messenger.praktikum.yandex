import Block from '../../framework/Block'

export interface ILink {
  class?: string
  dataPage?: string
  href: string
  text: string
  events?: {
    click: (e: Event) => void
  }
}
export class Link extends Block {
  constructor(props: any) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          props.onClick(e)
        },
      },
    })
  }

  override render() {
    return '<a href="{{href}}" class="{{class}}" data-page="{{dataPage}}">{{text}}</a>'
  }
}
