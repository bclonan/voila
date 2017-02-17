import sha1 from './lib/sha1-min'

const InputTypes = ['INPUT', 'TEXTAREA', 'SELECT']
const LabelTypes = ['LABEL', 'SPAN', 'TEXT', 'B', 'STRONG', 'SMALL', 'P']
const SkipTypes = ['BR']
const LABEL_TAG = 'LABEL'

Array.prototype.flatten = function (depth = Infinity) {
  return this.reduce(
    (list,v) =>
      list.concat(
        depth > 0 ?
          (depth > 1 && Array.isArray( v ) ?
              v.flatten( depth - 1 ) :
              v
          ) :
          [v]
      )
    , [] )
}

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

const _isNotHidden = (input) => {
  return input.type !== 'hidden';
}

const _hasContent = (input) => {
  return input.length !== 0;
}

const _moveInputCollectionToArray = (inputCollection) => {
  let collection = []
  for (let el of inputCollection) {
    collection.push(el)
  }
  return collection
}

const _removeInvalidHtmlTags = (html) => {
  let regexInvalidHtmlTags = /<\/?(a|abbr|b|bdi|bdo|br|cite|code|data|dfn|em|i|kbd|mark|q|rp|rt|rtc|ruby|s|samp|small|span|strong|sub|sup|time|u|var|wbr|div...)\b[^<>]*>/g
  return html.replace(regexInvalidHtmlTags, '')
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
      if (SkipTypes.indexOf(child.tagName) < 0) {
        if (child.tagName === LABEL_TAG) {
          child.innerHTML = _removeInvalidHtmlTags(child.innerHTML)
        }
        let childBranch = new Branch(this)
        childBranch.fill(child)
        this.children.push(childBranch)
      }
    }
  }

  getSubTreeHash () {
    const subTreeHashObject = []

    Branch.forEach(branch => {
      if (branch !== this) {
        subTreeHashObject.push(branch.tagCode)
      }
    }, this)

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
    let inputObj = InputTypes
      .map(tag => {
        return this.element.getElementsByTagName(tag)
      })
      .filter(_hasContent)
      .map(_moveInputCollectionToArray)
      .flatten()
      .filter(_isNotHidden)
      .shift()

    return {
      field: inputObj,
      question: _getTextFromElement.call(this, inputObj)
    }
  }

  isField () {
    return InputTypes.some(tag => tag === this.tagName)
  }

  isLabel () {
    return LabelTypes.some(tag => tag === this.tagName)
  }

  containsField () {
    return this.contains(x => x.isField())
  }

  containsLabel () {
    return this.contains(x => x.isLabel())
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
