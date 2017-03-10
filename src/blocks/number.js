import Block from './block'

class Number extends Block {
  constructor(field, label) {
    super(field, label)
    this.type = 'number'
  }
}

export default Number
