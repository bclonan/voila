import Block from './block'

class MultipleChoice extends Block {
  constructor(field, label) {
    super(field, label)
    this.type = 'multiple_choice'

    const htmlElement = field.element
    const choices = []

    for (const choiceKey in htmlElement.children) {
        const label = htmlElement.children[choiceKey].innerText
        if (label !== undefined) {
            choices.push({label: label})
        }
    }
    this.properties.choices = choices
    this.properties.allow_multiple_selection = false
    this.properties.randomize = false
    this.properties.vertical_alignment = false
    this.properties.allow_other_choice = false
  }
}

export default MultipleChoice
