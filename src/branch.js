import sha1 from './lib/sha1-min'

const InputTypes = ['input', 'textarea', 'select']

function _getTextFromElementParent(element) {
  let text = ''

  let root = element,
    iter = document.createNodeIterator(root, NodeFilter.SHOW_TEXT),
    textnode

  while (textnode = iter.nextNode()) {
    text = (textnode.wholeText !== '') ? textnode.wholeText : text
  }

  return text
}

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

  getInputFromPattern () {
    let inputList = InputTypes.map(tag => { // tagName
      return (this.element.getElementsByTagName(tag).length === 1) ? this.element.getElementsByTagName(tag)[0] : null
    }).filter((input) => input)

    let parent = inputList[0].parent
    let text = _getTextFromElementParent(parent)
    if (text === '' && this.element === parent.parent) {
      return _getTextFromElementParent(this.element)
    } else {

    }
    return _getTextFromElementParent(inputList)
  }
}

Branch.forEach = function forEach (fn, node) {
  fn(node)

  node.children.forEach(child => forEach(fn, child))
}

export default Branch
