import test from 'ava'
import browserEnv from 'browser-env'

import Tree from './tree'
import Branch from './branch'

const getHtml = (str) => {
  var d = document.createElement('div');
  d.innerHTML = str;
  return d.firstChild;
}

const getFulfilledTree = () => {
  const html = getHtml('<form>' +
    '<div>' +
      '<span>field 1</span>' +
      '<p>Bla</p>' +
      '<input type="text" id="field1" />' +
    '</div>' +
    '<div>' +
      '<span>field 2</span>' +
      '<input type="text" id="field2" />' +
    '</div>' +
  '</form>')

  const tree = new Tree()
  tree.fill(html)

  return tree
}

test('base tree parser', t => {
  const tree = getFulfilledTree()

  const p1 = tree.root.children[0]
  const p2 = tree.root.children[1]

  const p1_input = p1.children[2]
  const p2_input = p2.children[1]

  t.is(tree.root.tagName, 'FORM')
  t.is(tree.root.children.length, 2)

  t.is(p1.tagCode, 'DIV')
  t.is(p1.children[1].tagCode, 'P')
  t.is(p2.html, '<span>field 2</span><input type=\"text\" id=\"field2\">')

  t.is(p1_input.tagName, 'INPUT')
  t.is(p1_input.tagCode, 'FIELD')
  t.is(p2_input.parent.tagName, 'DIV')
})

test('calculate hashes', t => {
  const tree = getFulfilledTree()
  tree.calculateHashes()

  const hashes = []
  Branch.forEach(b => hashes.push(b.hash), tree.root)

  t.deepEqual(hashes, [
    'bfd0ee65c0322f8cb14776f89913c7e49797697f',
    '89290e96978f53d3dba9b9d86fe8b448525adc1f',
    '7d4e42ef9d04a046b5679f952cb0b6b5c498c73c',
    'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    '7d4e42ef9d04a046b5679f952cb0b6b5c498c73c',
    'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    '48fe65d2f3fcf414e938de527db88cc42a9d3d63',
    '7d4e42ef9d04a046b5679f952cb0b6b5c498c73c',
    'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    'da39a3ee5e6b4b0d3255bfef95601890afd80709'
  ])
})

test.skip('walk through the tree [test has not been finished]', t => {
  const html = getHtml('<form>' +
    '<div>' +
      '<span>field 1</span>' +
      '<p>Bla</p>' +
      '<input type="text" id="field1" />' +
    '</div>' +
    '<div>' +
      '<span>field 2</span>' +
      '<input type="text" id="field2" />' +
    '</div>' +
    '<div>' +
      '<span>field 3</span>' +
      '<input type="text" id="field3" />' +
    '</div>' +
  '</form>')

  const tree = new Tree()
  tree.fill(html)

  tree.walkThroughLevels(branch => {}, level => {})
})

test('find patterns', t => {
  const html = getHtml('<form>' +
    '<div>' +
      '<span>field 1</span>' +
      '<p>Bla</p>' +
      '<input type="text" id="field1" />' +
    '</div>' +
    '<div>' +
      '<span>field 2</span>' +
      '<input type="text" id="field2" />' +
    '</div>' +
    '<div>' +
      '<span>field 3</span>' +
      '<input type="text" id="field3" />' +
    '</div>' +
  '</form>')

  const tree = new Tree()
  tree.fill(html)

  tree.calculateHashes()

  const patterns = tree.getPatterns()
  t.is(patterns.length, 2)

  const firstPattern = patterns[0]
  t.is(firstPattern.tagName, 'DIV')
})
