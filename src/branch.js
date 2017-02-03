import sha1 from './lib/sha1-min'

class Branch {
  constructor (parent) {
    this.parent = parent

    this.tagName = null

    this.children = []
    this.html = null
    this.element = null
  }

  fill (element) {
    if (!element) {
      return null
    }

    const tagName = element.tagName
    if (tagName) {
      this.tagName = tagName
    } else {
      this.tagName = 'text'
    }
    this.html = element.innerHTML
    this.element = element

    for (let child of element.childNodes) {
      let childBranch = new Branch(this)
      childBranch.fill(child)

      this.children.push(childBranch)
    }
  }

  getSubTreeHash () {
    const subTreeHashObject = this.children
      .reduce((accumulator, child) => accumulator.concat(child.tagName), [])

    return sha1(subTreeHashObject.join())
  }

  contains (fn) {
    let contains = false

    Branch.forEach(child => {
      if (fn(child)) {
        contains = true
      }
    }, this)

    return contains
  }
}

Branch.forEach = function forEach (fn, node) {
  fn(node)

  node.children.forEach(child => forEach(fn, child))
}

export default Branch
