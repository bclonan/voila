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

  calculateHashes () {
    Branch.forEach(b => {
      b.hash = b.getSubTreeHash()
    }, this.root)
  }

  walkThroughLevels (fn, levelfn) {
    const stack = this.root.children
    const levelStack = []

    while (stack.length > 0) {
      levelfn(stack)

      while (stack.length > 0) {
        const stackElement = stack.shift()
        fn(stackElement)

        stackElement.children.forEach(x => levelStack.push(x))
      }
      //stack = []

      while (levelStack.length > 0) {
        stack.push(levelStack.shift())
      }
    }
  }

  getPatterns () {
    const patterns = []

    const getMostRepeatedHash = (level) => {
      const passedHashes = []

      level.forEach(branch => {
        if (branch.children.length > 0 && branch.containsField())
        {
          const hash = branch.hash

          if (passedHashes.findIndex(x => x.hash === hash) < 0) {
            const duplicated = level.filter(x => x.hash === hash)
            passedHashes.push({
              hash: hash,
              count: duplicated.length,
              elements: duplicated
            })
          }
        }
      })

      passedHashes.sort((x, y) => y.count - x.count)
      return passedHashes[0]
    }

    this.walkThroughLevels(_ => {}, level => {
      const mostRepeatedLevelHash = getMostRepeatedHash(level)
      patterns.push(mostRepeatedLevelHash)
    })

    for (let pattern of patterns) {
      if (pattern.count > 1) {
        return pattern.elements
      }
    }

    return null
  }
}

export default Tree
