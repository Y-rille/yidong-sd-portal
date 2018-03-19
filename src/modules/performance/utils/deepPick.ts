import * as _ from 'lodash'

function deepPick(nodeId, items) {
    var i = 0, found;

    for (; i < items.length; i++) {
        if (items[i].nodeId === nodeId && items[i].dataType === 2) {
            return items[i]
        } else if (_.isArray(items[i].children)) {
            found = deepPick(nodeId, items[i].children);
            if (found) {
                return found;
            }
        }
    }
}

function deepPickFirst(items) {
    var i = 0, found;
    for (; i < items.length; i++) {
        if (items[i].dataType === 2) {
            return items[i]
        } else if (_.isArray(items[i].children)) {
            found = deepPickFirst(items[i].children);
            if (found) {
                return found;
            }
        }
    }
}

export { deepPickFirst }

export default deepPick