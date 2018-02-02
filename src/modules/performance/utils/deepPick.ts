import * as _ from 'lodash'

function deepPick(nodeId, items) {
    var i = 0, found;

    for (; i < items.length; i++) {
        if (items[i].nodeId === nodeId) {
            return items[i]
        } else if (_.isArray(items[i].children)) {
            found = deepPick(nodeId, items[i].children);
            if (found) {
                return found;
            }
        }
    }
}

export default deepPick