import Branch from './branch'
import LongestRepeatedSet from './longestRepeatedUniqueSet'

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
      //here stack variable always = []

      while (levelStack.length > 0) {
        stack.push(levelStack.shift())
      }
    }
  }

  getPatterns () {
    const patterns = []

    const getMostRepeatedHash = (level) => {
      const passedHashes = []
      const duplications = []

      const isInPassedHashes = (hash) => {
        return passedHashes.findIndex(x => x.hash === hash) >= 0
      }

      level.forEach(branch => {
        if (branch.children.length > 0 && branch.containsField() && branch.containsLabel())
        {
          const hash = branch.hash

          if (!isInPassedHashes(hash)) {
            passedHashes.push(branch)
          } else {
            if (duplications.findIndex(x => x.hash === hash) < 0) {
              const duplicated = level.filter(x => x.hash === hash)
              const count = duplicated.length

              duplications.push({
                hash: hash,
                elements: duplicated,
                count: count
              })
            }
          }
        }
      })

      return duplications
    }

    this.walkThroughLevels(_ => {}, level => {
      const mostRepeatedLevelHash = getMostRepeatedHash(level)
      Array.prototype.push.apply(patterns, mostRepeatedLevelHash)
    })

    return patterns
  }

  getSequencePattern (level) {
    return this.findLongestHashSet(level, Branch.hashArray)
  }

  findLongestHashSet (array, getHashForArray) {
    const root = new LongestRepeatedSet(array)
    const longestPattern = root.get(getHashForArray)
    return longestPattern
  }
}

export default Tree
