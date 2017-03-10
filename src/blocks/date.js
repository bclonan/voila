import Block from './block'

class Date extends Block {
  constructor(field, label) {
    super(field, label)
    this.type = 'date'
  }
}

export default Date
