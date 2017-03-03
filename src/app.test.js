import test from 'ava'
import { elPais, elMundo, restaurant, bank, mailService, airline } from './form.examples'
import Tree from './tree'

const getHtml = (str) => {
  var d = document.createElement('div')
  d.innerHTML = str.replace(/\n/g, '')
  return d.firstChild
}

test('Newspaper El País contact form', t => {
  const html = getHtml(elPais)

  const tree = new Tree()
  tree.fill(html)

  const result = tree.getFieldsWithLabels()
  console.log(result.map(x => {
    return {
      field: x.field ? x.field.parent.html : null,
      label: x.label ? x.label.html : null
    }
  }))
})

test('Newspaper El Mundo contact form', t => {
  const html = getHtml(elMundo)

  const tree = new Tree()
  tree.fill(html)

  const result = tree.getFieldsWithLabels()
  console.log(result.map(x => {
    return {
      field: x.field ? x.field.parent.html : null,
      label: x.label ? x.label.html : null
    }
  }))
})

test('Restaurant contact form', t => {
  const html = getHtml(restaurant)

  const tree = new Tree()
  tree.fill(html)

  const result = tree.getFieldsWithLabels()
  console.log(result.map(x => {
    return {
      field: x.field ? x.field.parent.html : null,
      label: x.label ? x.label.html : null
    }
  }))
})

test('Bank Triodos contact form', t => {
  const html = getHtml(bank)

  const tree = new Tree()
  tree.fill(html)

  const result = tree.getFieldsWithLabels()
  console.log(result.map(x => {
    return {
      field: x.field ? x.field.parent.html : null,
      label: x.label ? x.label.html : null
    }
  }))
})

test('Mail service Correos contact form (table)', t => {
  const html = getHtml(mailService)

  const tree = new Tree()
  tree.fill(html)

  const result = tree.getFieldsWithLabels()
  console.log(result.map(x => {
    return {
      field: x.field ? x.field.parent.html : null,
      label: x.label ? x.label.html : null
    }
  }))
})

test.only('Airline service Ryanair contact form (dt)', t => {
  const html = getHtml(airline)

  const tree = new Tree()
  tree.fill(html)

  const result = tree.getFieldsWithLabels()
  console.log(result.map(x => {
    return {
      field: x.field ? x.field.parent.html : null,
      label: x.label ? x.label.html : null
    }
  }))
})
