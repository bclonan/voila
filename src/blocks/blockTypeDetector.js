import ShortText from './short-text'
import Email from './email'
import Date from './date'
import Website from './website'
import Number from './number'
import OpinionScale from './opinion-scale'
import MultipleChoice from './multiple-choice'
import LongText from './long-text'

const SHORT_TEXT_KEY = 'short_text'
const EMAIL_KEY = 'email'
const DATE_KEY = 'date'
const WEBSITE_KEY = 'website'
const NUMBER_KEY = 'number'
const OPINION_SCALE_KEY = 'opinion_scale'
const MULTIPLE_CHOICES_KEY = 'multiple_choice'
const LONG_TEXT_KEY = 'long_text'

const types = {
  'INPUT': {
    'text': SHORT_TEXT_KEY,
    'email': EMAIL_KEY,
    'date': DATE_KEY,
    'url': WEBSITE_KEY,
    'tel': SHORT_TEXT_KEY,
    'number': NUMBER_KEY,
    'range': OPINION_SCALE_KEY
  },
  'SELECT': {
    'select-one': MULTIPLE_CHOICES_KEY
  },
  'TEXTAREA': {
    'textarea': 'long_text'
  }
}

class BlockTypeDetector {
  getFieldType (block) {
    if (item.type === 'button' || item.tagName === undefined)
      return null

    let blockType = types[block.tagName][block.type]
    let blockClassType

    switch (blockType) {
      case SHORT_TEXT_KEY:
        blockClassType = ShortText
        break
      case EMAIL_KEY:
        blockClassType = Email
        break
      case DATE_KEY:
        blockClassType = Date
        break
      case WEBSITE_KEY:
        blockClassType = Website
        break
      case NUMBER_KEY:
        blockClassType = Number
        break
      case OPINION_SCALE_KEY:
        blockClassType = OpinionScale
        break
      case MULTIPLE_CHOICES_KEY:
        blockClassType = MultipleChoice
        break
      case LONG_TEXT_KEY:
        blockClassType = LongText
        break
    }

    return blockClassType
  }
}

export default BlockTypeDetector
