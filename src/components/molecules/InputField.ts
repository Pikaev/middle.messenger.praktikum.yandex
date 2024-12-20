import Block from '../../framework/Block'
import { Input, IInput } from '@components/atoms/Input'
import { Label, ILabel } from '@components/atoms/Label'

export interface IInputField extends IInput, ILabel {}

export class InputField extends Block {
  constructor(props: IInputField) {
    super({
      InputCreate: new Input({
        class: props.class,
        id: props.id,
        name: props.name,
        placeholder: props.placeholder,
        type: props.type,
        onClick: (event: Event) => props.onClick(event),
      }),
      LabelCreate: new Label({
        class: props.class,
        id: props.id,
        label: props.label,
      }),
    })
  }

  render() {
    return `
      <div class="input-field">
        {{{ LabelCreate }}}
        {{{ InputCreate }}}
      </div>
    `
  }
}
