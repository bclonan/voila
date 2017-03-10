import Block from './block'

class LongText extends Block {
  constructor(field, label) {
    super(field, label)
    this.type = 'long_text'
  }
}

export default LongText
