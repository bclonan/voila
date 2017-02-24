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

    const getOtherOrphanPatterns = (level, mostRepeatedLevelHash) => {
      let orphans = level
      mostRepeatedLevelHash.forEach(repeated => {
        orphans = level.filter(branch => {
          return !(branch.hash === repeated.hash)
        })
      })
      return orphans.map(orphanBranch => {
        return {
          hash: orphanBranch.hash,
          elements: orphanBranch.element,
          count: 1
        }
      })
    }

    this.walkThroughLevels(_ => {}, level => {
      const mostRepeatedLevelHash = getMostRepeatedHash(level)
      const orphanLevelHashes = getOtherOrphanPatterns(level, mostRepeatedLevelHash)
           
      Array.prototype.push.apply(patterns, mostRepeatedLevelHash)
      if (orphanLevelHashes.length > 0) {
        Array.prototype.push.apply(patterns, orphanLevelHashes)
      }
    })

    return patterns
  }

  findLongestHashSet (array, getHashForArray) {
    const root = new LongestRepeatedSet(array)
    const longestPattern = root.get(getHashForArray)
    return longestPattern
  }
}

export default Tree
