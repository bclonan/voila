import Branch from './branch'

class Tree {
  constructor () {
    this.root = null
  }

  fill (elements) {
    if (!elements) {
      return
    }

    this.root = new Branch(null)
    this.root.fill(elements)
  }
}

export default Tree
