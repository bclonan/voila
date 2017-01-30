import test from 'ava'
import browserEnv from 'browser-env'

import Tree from './tree'


const getHtml = function (str) {
  var d = document.createElement('div');
  d.innerHTML = str;
  return d.firstChild;
}

test('base tree parser', t => {
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
});
