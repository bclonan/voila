class Block {
  constructor() {
    this.title = ''
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
