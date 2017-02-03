import test from 'ava'
import Block from './block'

test('#block', t => {
  let block = new Block()
  block.title = 'testTitle'
  block.type = 'testType'
  block.addProperty({testProperty: 'test'})
  t.is(block.title, 'testTitle')
  t.is(block.type, 'testType')
  t.is(block.properties.testProperty, 'test')
})
