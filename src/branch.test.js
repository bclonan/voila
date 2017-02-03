import test from 'ava'
import browserEnv from 'browser-env'

import Branch from './branch'

const getHtml = (str) => {
  var d = document.createElement('div');
  d.innerHTML = str;
  return d.firstChild;
}

test('fill from select field, skip option tags from the tree', t => {
  const html = getHtml('<div>' +
    '<select>' +
      '<option>Option1</option>' +
      '<option>Option2</option>' +
      '<option>Option3</option>' +
    '</select>' +
  '</div>')

  const branch = new Branch(null)
  branch.fill(html)

  t.is(branch.tagName, 'DIV')

  const child = branch.children[0]
  t.is(child.tagName, 'SELECT')
  t.is(child.tagCode, 'FIELD')
  t.is(child.children.length, 0)
})

test('hash empty branch', t => {
  const branch = new Branch(null)

  const hash = branch.getSubTreeHash()
  const emptyStringSha1Hash = 'da39a3ee5e6b4b0d3255bfef95601890afd80709'
  t.is(hash, emptyStringSha1Hash)
})

test('hash simple branch', t => {
  const rootBranch = new Branch(null)
  rootBranch.tagCode = 'DIV'

  const subBranch = new Branch(rootBranch);
  subBranch.tagName = 'INPUT'
  subBranch.tagCode = 'FIELD'

  rootBranch.children.push(subBranch)

  const hash = rootBranch.getSubTreeHash()
  const currentRootBranchHash = '987f4e96caf5df1037efbd4ee25756938e9da844'
  t.is(hash, currentRootBranchHash)
})

test('different hashes for branches', t => {
  //one tree
  const rootBranch1 = new Branch(null)
  rootBranch1.tagCode = 'DIV'

  const subBranch1 = new Branch(rootBranch1);
  subBranch1.tagName = 'INPUT'
  subBranch1.tagCode = 'FIELD'

  rootBranch1.children.push(subBranch1)

  //second tree
  const rootBranch2 = new Branch(null)
  rootBranch2.tagCode = 'DIV'

  const subBranch2 = new Branch(rootBranch2);
  subBranch2.tagCode = 'SPAN'

  rootBranch2.children.push(subBranch2)

  const hash1 = rootBranch1.getSubTreeHash()
  const hash2 = rootBranch2.getSubTreeHash()

  t.not(hash1, hash2)
})


test('foreach branch', t => {
  const rootBranch = new Branch(null)
  rootBranch.tagCode = 'DIV'

  const subBranch = new Branch(rootBranch);
  subBranch.tagName = 'INPUT'
  subBranch.tagCode = 'FIELD'

  const subBranch2 = new Branch(rootBranch);
  subBranch2.tagCode = 'SPAN'

  rootBranch.children.push(subBranch)
  rootBranch.children.push(subBranch2)

  const joinedTags = []
  Branch.forEach(c => joinedTags.push(c.tagCode), rootBranch)

  t.deepEqual(joinedTags, ['DIV', 'FIELD', 'SPAN'])
})

test('contains', t => {
  const rootBranch = new Branch(null)
  rootBranch.tagCode = 'DIV'

  const subBranch = new Branch(rootBranch);
  subBranch.tagName = 'INPUT'
  subBranch.tagCode = 'FIELD'

  rootBranch.children.push(subBranch)

  const containsInput = rootBranch.contains(x => x.tagCode === 'FIELD')
  t.is(containsInput, true)
})

test('get input from last detected pattern', t => {
  const rootBranch = new Branch(null)
  const template = document.createElement('template')
  template.innerHTML = '<div><p><input type="hidden" value="boo"><span>Name:</span></p><div><input type="text" id="name" name="name"></div></div>'

  rootBranch.fill(template.content.firstChild)
  const {field, question} = rootBranch.getInputFromPattern()

  t.is(question, 'Name:')
  //field here is a html element
  t.is(field.tagName, 'INPUT')
  t.is(field.id, 'name')
})
