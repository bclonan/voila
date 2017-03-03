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
      return orphans
    }

    this.walkThroughLevels(_ => {}, level => {
      const mostRepeatedLevelHash = getMostRepeatedHash(level)
      const orphanLevelHashes = getOtherOrphanPatterns(level, mostRepeatedLevelHash)

      console.log('Level length:', level.length, 'Orphan length:', orphanLevelHashes.length)
      const orphanLevelPatterns = this.getSequencePattern(orphanLevelHashes)

      Array.prototype.push.apply(patterns, mostRepeatedLevelHash)
      Array.prototype.push.apply(patterns, orphanLevelPatterns)
    })

    return patterns
  }

  getSequencePattern (level) {
    console.log('Level:', level.map(x => x.tagCode))
    return this.findLongestHashSet(level, Branch.hashArray)
  }

  findLongestHashSet (array, getHashForArray) {
    const root = new LongestRepeatedSet(array)
    const longestPattern = root.get(getHashForArray, x => x.hash)
    return longestPattern
  }

  findAll (condition) {
    const found = []

    Branch.forEach(x => {
      if (condition(x)) {
        found.push(x)
      }
    }, this.root)

    return found
  }

  findBefore (condition, current) {
    const result = []

    let parent = current.parent
    let currentCheckBranch = current

    //console.log('Check element:', currentCheckBranch.tagCode)

    while (parent !== this.root && parent !== null) {
      const level = parent.children
      const stack = []

      const currentElementIndex = level.indexOf(currentCheckBranch)
      for (let i = currentElementIndex - 1; i >= 0; i--){
        const currentLevelElement = level[i]
        if (currentLevelElement === currentCheckBranch) {
          break;
        }

        //console.log('Loop:', currentLevelElement.tagCode)
        Branch.forEach(x => {
          if (condition(x)) {
            stack.push(x)
          }
        }, currentLevelElement)

        while (stack.length > 0) {
          let el = stack.pop()
          result.push(el)
        }
      }

      currentCheckBranch = parent
      parent = parent.parent

      if (result.length > 0) {
        return result
      }
    }

    return result
  }

  getFieldsWithLabels () {
    const result = []
    
    const fields = this.findAll(x => x.isField())
    fields.forEach(f => {
      const labels = this.findBefore(x => x.isLabel() && x.tagCode !== 'TEXT', f)
      const field = f

      //console.log('Labels found:', labels)
      const label = labels[0] && labels[0].tagCode === 'TEXT' ? labels[0].parent : labels[0]

      result.push({field, label})
    })

    return result
  }
}

export default Tree
