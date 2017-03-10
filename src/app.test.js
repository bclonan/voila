import test from 'ava'
import { elPais, elMundo, restaurant, bank, mailService, airline } from './form.examples'
import Tree from './tree'

const getHtml = (str) => {
  var d = document.createElement('div')
  d.innerHTML = str.replace(/\n/g, '')
  return d.firstChild
}

test.skip('Newspaper El País contact form', t => {
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

test.skip('Newspaper El Mundo contact form', t => {
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

test.skip('Restaurant contact form', t => {
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

test.skip('Bank Triodos contact form', t => {
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

test.skip('Mail service Correos contact form (table)', t => {
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

test.skip('Airline service Ryanair contact form (dt)', t => {
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
