import sha1 from './lib/sha1-min'

const InputTypes = ['INPUT', 'TEXTAREA', 'SELECT']
const LabelTypes = ['LABEL', 'SPAN', 'B', 'STRONG', 'SMALL', 'P']

let flatten =
  (arr,depth = Infinity) =>
    arr.reduce(
      (list,v) =>
        list.concat(
          depth > 0 ?
            (depth > 1 && Array.isArray( v ) ?
                flatten( v, depth - 1 ) :
                v
            ) :
            [v]
        )
      , [] )

const SkipFieldChildren = ['OPTION']
const FIELD_CODE = 'FIELD'
const TEXT_CODE = 'TEXT'

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

function _getTextFromElement(element) {
  let parent = element.parentElement
  let text = _getTextFromElementParent(parent)
  if (text === '') {
    if (this.element !== parent) {
      text = _getTextFromElement.call(this, parent)
    }
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
      this.tagName = TEXT_CODE
    }
    this.html = element.innerHTML
    this.element = element

    this.tagCode = this.getTagCode(element)

    let childNodes = [].concat.apply([], element.childNodes)
    if (this.tagCode === FIELD_CODE) {
      childNodes = childNodes.filter(x => SkipFieldChildren.indexOf(x.tagName) < 0)
    }

    for (let child of childNodes) {
      let childBranch = new Branch(this)
      childBranch.fill(child)

      this.children.push(childBranch)
    }
  }

  getSubTreeHash () {
    // it is calculating only first layer of hash.. need to calculate all layers, need to think about it
    const subTreeHashObject = this.children
      .reduce((accumulator, child) => accumulator.concat(child.tagCode), [])

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
      return this.element.getElementsByTagName(tag)
    }).filter((input) => input.length !== 0).map(inputCollection => {
      let collection = []
      for (let el of inputCollection) {
        collection.push(el)
      }
      return collection
    })

    let inputObj = flatten(inputList).filter((input) => input.type !== 'hidden')[0]

    return {
      field: inputObj,
      question: _getTextFromElement.call(this, inputObj)
    }
  }

  isField () {
    return InputTypes.some(tag => tag === this.tagName)
  }

  containsField () {
    return this.contains(x => x.isField())
  }

  getTagCode (element) {
    const tagName = element.tagName
    const isField = this.isField()
    let tagCode = null

    if (isField) {
      tagCode = FIELD_CODE
    } else if (tagName) {
      tagCode = tagName
    } else {
      tagCode = TEXT_CODE
    }

    return tagCode
  }
}

Branch.forEach = function forEach (fn, node) {
  fn(node)

  node.children.forEach(child => forEach(fn, child))
}

export default Branch
