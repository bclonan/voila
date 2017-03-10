import Block from './block'

class Email extends Block {
  constructor(field, label) {
    super(field, label)
    this.type = 'email'
  }
}

export default Email
