import Block from './block'

class OpinionScale extends Block {
  constructor(field, label) {
    super(field, label)
    this.type = 'opinion_scale'

    const htmlElement = field.element
    var max = parseInt(htmlElement.max)
    var min = parseInt(htmlElement.min)

    this.properties.steps = (max <= 11) ? max : 11
    this.properties.start_at_one = min === 1
  }
}

export default OpinionScale
