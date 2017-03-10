import Block from './block'

class Website extends Block {
  constructor(field, label) {
    super(field, label)
    this.type = 'website'
  }
}

export default Website
