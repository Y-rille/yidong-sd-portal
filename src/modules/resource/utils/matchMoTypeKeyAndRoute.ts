import * as _ from 'lodash'

function matchMoTypeKeyAndRoute(moTypeKey) {
    let path = ''
    switch (moTypeKey) {
        case 'host':
            path = 'host'
            break
        case 'vm':
            path = 'virtual'
            break
        case 'az':
            path = 'az'
            break
        case 'ha':
            path = 'ha'
            break
        case 'flavor':
            path = 'flavor'
            break
        case 'image':
            path = 'mirror'
            break
        case 'virtual_network':
            path = 'virtual_network'
            break
        case 'storageVolum':
            path = 'storage_volume'
            break
        case 'volumetype':
            path = 'volume_type'
            break
        case 'server':
            path = 'server'
            break
        case 'firewall':
            path = 'firewall'
            break
        case 'switch':
            path = 'switchboard'
            break
        case 'diskarray':
            path = 'magnetic'
            break
        default:
            path = ''
    }
    return path
}

export default matchMoTypeKeyAndRoute