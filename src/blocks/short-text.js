import Block from './block'

class ShortText extends Block {
  constructor(field, label) {
    super(field, label)
    this.type = 'short_text'
  }
}

export default ShortText
