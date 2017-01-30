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

    let i = 0
    let child = element.childNodes[i]
    while (child) {
      let childBranch = new Branch(this)
      childBranch.fill(child)

      this.children.push(childBranch)

      i++
      child = element.childNodes[i]
    }
  }

  // print () {
  //   console.log('Branch:', this.tagName, this.parent, this.html)
  //
  //   for (let i = 0; i < this.children.length; i++) {
  //     this.children[i].print()
  //   }
  // }
}

export default Branch
