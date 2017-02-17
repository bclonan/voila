import test from 'ava'
import {stripIndents} from 'common-tags'

import sha1 from './lib/sha1-min'
import Tree from './tree'
import Branch from './branch'

const getHtml = (str) => {
  var d = document.createElement('div')
  d.innerHTML = str.replace(/\n/g, '')
  return d.firstChild
}

const getFulfilledTree = () => {
  const str = stripIndents`<form>
    <div>
      <span>field 1</span>
      <p>Bla</p>
      <input type="text" id="field1" />
    </div>
    <div>
      <span>field 2</span>
      <input type="text" id="field2" />
    </div>
  </form>`
  const html = getHtml(str)

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

  const expectedHashes = [
    sha1(['DIV', 'SPAN', 'TEXT', 'P', 'TEXT', 'FIELD', 'DIV', 'SPAN', 'TEXT', 'FIELD'].join()),
    sha1(['SPAN', 'TEXT', 'P', 'TEXT', 'FIELD'].join()),
    sha1(['TEXT'].join()),
    sha1([].join()),
    sha1(['TEXT'].join()),
    sha1([].join()),
    sha1([].join()),
    sha1(['SPAN', 'TEXT', 'FIELD'].join()),
    sha1(['TEXT'].join()),
    sha1([].join()),
    sha1([].join())
  ]

  t.deepEqual(expectedHashes, hashes)
})

test.skip('walk through the tree [test has not been finished]', t => {
  const html = getHtml(stripIndents`
  <form>
    <div>
      <span>field 1</span>
      <p>Bla</p>
      <input type="text" id="field1" />
    </div>
    <div>
      <span>field 2</span>
      <input type="text" id="field2" />
    </div>
    <div>
      <span>field 3</span>
      <input type="text" id="field3" />
    </div>
  </form>`)

  const tree = new Tree()
  tree.fill(html)

  tree.walkThroughLevels(branch => {}, level => {})
})

test('find patterns', t => {
  const html = getHtml(stripIndents`
  <form>
    <div>
      <span>field 1</span>
      <p>Bla</p>
      <input type="text" id="field1" />
    </div>
    <div>
      <span>field 2</span>
      <input type="text" id="field2" />
    </div>
    <div>
      <span>field 3</span>
      <input type="text" id="field3" />
    </div>
  </form>`)

  const tree = new Tree()
  tree.fill(html)

  tree.calculateHashes()

  const patterns = tree.getPatterns()
  t.is(patterns.length, 2)

  const firstPattern = patterns[0]
  t.is(firstPattern.tagName, 'DIV')
})
