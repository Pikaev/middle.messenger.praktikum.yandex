import Block from '../../framework/Block'
import { Input, IInput } from '@components/atoms/Input'
import { Label, ILabel } from '@components/atoms/Label'

export interface IInputAuth extends IInput, ILabel {}

export class InputAuth extends Block {
  constructor(props: IInputAuth) {
    super({
      InputCreate: new Input({
        class: 'auth__formItemInput',
        id: props.id,
        name: props.name,
        placeholder: props.placeholder,
        type: props.type,
        onClick: (event: Event) => props.onClick(event),
      }),
      LabelCreate: new Label({
        class: 'auth__formItemLabel',
        id: props.id,
        label: props.label,
      }),
    })
  }

  render() {
    return `
      <div class="auth__formItem">
        {{{ LabelCreate }}}
        {{{ InputCreate }}}
      </div>
    `
  }
}
