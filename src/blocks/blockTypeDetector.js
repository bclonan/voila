import ShortText from './short-text'
import Email from './email'
import Date from './date'
import Dropdown from './dropdown'
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
    if (block.type === 'button' || block.tagName === undefined)
      return null

    let blockType = types[block.tagName][block.type]
    
    switch (blockType) {
      case SHORT_TEXT_KEY:
        return ShortText
      case EMAIL_KEY:
        return Email
      case DATE_KEY:
        return Date
      case WEBSITE_KEY:
        return Website
      case NUMBER_KEY:
        return Number
      case OPINION_SCALE_KEY:
        return OpinionScale
      case MULTIPLE_CHOICES_KEY:
        if (block.children && block.children.length > 8) {
          return Dropdown
        } else {
          return MultipleChoice
        }
      case LONG_TEXT_KEY:
        return LongText
      default:
        return null
    }
  }
}

export default BlockTypeDetector
