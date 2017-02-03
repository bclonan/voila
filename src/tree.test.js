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

  t.is(p1.tagName, 'DIV')
  t.is(p1.children[1].tagName, 'P')
  t.is(p2.html, '<span>field 2</span><input type=\"text\" id=\"field2\">')

  t.is(p1_input.tagName, 'INPUT')
  t.is(p2_input.parent.tagName, 'DIV')
})

test('calculate hashes', t => {
  const tree = getFulfilledTree()
  tree.calculateHashes()

  const hashes = []
  Branch.forEach(b => hashes.push(b.hash), tree.root)

  t.deepEqual(hashes, [
    'bfd0ee65c0322f8cb14776f89913c7e49797697f',
    'ecf2a7d7b0f5f6ea7a3172152b17e525f4ace4dd',
    '372ea08cab33e71c02c651dbc83a474d32c676ea',
    'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    '372ea08cab33e71c02c651dbc83a474d32c676ea',
    'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    '8d6ab4d43de39841fb65d9e6fc81ace532f0ba1d',
    '372ea08cab33e71c02c651dbc83a474d32c676ea',
    'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    'da39a3ee5e6b4b0d3255bfef95601890afd80709'
  ])
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
  tree.getPatterns()
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
