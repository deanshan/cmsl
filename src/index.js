// data process
import * as data from './data'

// dom element process
import * as dom from './dom'

// regular expression
import * as regExp from './regExp'

// date time process
import * as date from './date'

export default {
    ...data,
    ...date,
    ...dom,
    ...regExp,
}