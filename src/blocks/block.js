class Block {
  constructor(field, label) {
    this.title = label
    this.type = ''
    this.properties = {}
    this.validations = {
      required: false
    }
  }

  addProperty (objectProperty) {
    Object.assign(this.properties, objectProperty)
  }

  //TODO: static checkType
}

export default Block
