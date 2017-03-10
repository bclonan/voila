class LongestRepeatedUniqueSet {
  constructor (arr) {
    this.arr = arr
  }

  subSet (firstPos, lastPos, array) {
    return array.slice(firstPos, lastPos + 1)
  }

  containsSet (set, array) {
    let found = false
    for (let i = 0; i < array.length - set.length + 1; i++) {
      found = true

      for (let j = 0; j < set.length; j++) {
          if (array[i + j] !== set[j]) {
            found = false
          }
      }

      if (found) {
        return true
      }
    }

    return false
  }

  hasUniqueElement (set, getKey) {
    for (let i = 0; i < set.length; i++) {
      if (getKey(set[i]) !== getKey(set[0])) {
        return true
      }
    }

    return false
  }

  findSet (set, array) {
    const result = []

    for (let i = 0; i < array.length - set.length + 1; i++) {
      let found = true

      for (let j = 0; j < set.length; j++) {
          if (array[i + j] !== set[j]) {
            found = false
          }
      }

      if (found) {
        result.push(i)
        i = i + set.length - 1
      }
    }

    return result
  }

  hashAllCombinations (arr, getHashForArray, getKey) {
    const hashArray = []

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 1; j <= arr.length/2 - 1; j++) {

        if (i + j >= arr.length)
          continue

        const sub = this.subSet(i, i + j, arr)
        const hasUniqueElements = this.hasUniqueElement(sub, getKey)

        if (hasUniqueElements) {
          const setHash = getHashForArray(sub)
          
          hashArray.push({
            hash: setHash,
            set: sub
          })
        }
      }
    }

    return hashArray
  }

  countBy (hashArray, getKey, getObject) {
    const countByHash = {}
    for (let i = 0; i < hashArray.length; i++) {
      const hash = getKey(hashArray[i]) + ''
      const set = getObject(hashArray[i])

      if (countByHash[hash]) {
        countByHash[hash] = {
          count: countByHash[hash].count + 1,
          set: set
        }
      } else {
        countByHash[hash] = {
          count: 1,
          set: set
        }
      }
    }

    return countByHash
  }

  findMostOccuring (countByObject) {
    let result = null
    let maxCount = 0
    let maxHash = null

    for (let hash in countByObject) {
      const hashObj = countByObject[hash]
      if (hashObj.count > maxCount) {
        maxCount = hashObj.count
        maxHash = hash
        result = hashObj
      }
    }

    if (result && maxCount > 1) {
      return Object.assign(result, {hash: maxHash})
    }

    return {}
  }

  get (getHashForArray, getKey) {
    const hashArray = this.hashAllCombinations(this.arr, getHashForArray, getKey)
    const countByHash = this.countBy(hashArray, x => x.hash, x => x.set)

    const pattern = this.findMostOccuring(countByHash)
    
    // pattern: 
    // {
    // count: 5,
    // set: [elem1, elem2, elem3, ...]
    // hash: da32466000828e6b6a269d3fda059749579ece2f
    // }

    return pattern
  }
}

export default LongestRepeatedUniqueSet
