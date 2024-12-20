import Block from '../../framework/Block'

interface ITitle {
  class?: string
  title: string
}

export class Title extends Block {
  constructor(props: ITitle) {
    super({
      ...props,
    })
  }

  render() {
    return `
      <h1 class="{{class}}">{{title}}</h1>
    `
  }
}
