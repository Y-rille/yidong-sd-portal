import * as _ from 'lodash'

function shallowDiffers(a, b) {
    // for (let i in a) if (!(i in b)) return true
    for (let i in b) {
        if (!_.isEqual(a[i], b[i])) {
            return true
        }
    }
    return false
}

export default shallowDiffers