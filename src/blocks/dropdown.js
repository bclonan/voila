import Block from './block'

class Dropdown extends Block {
  constructor(field, label) {
    super(field, label)
    this.type = 'dropdown'

    const htmlElement = field.element
    const choices = []

    for (const choiceKey in htmlElement.children) {
        const label = htmlElement.children[choiceKey].innerText
        if (label !== undefined) {
            choices.push({label: label})
        }
    }
    this.properties.choices = choices
    this.properties.alphabetical_order = false
  }
}

export default Dropdown
