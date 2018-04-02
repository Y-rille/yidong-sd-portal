import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import Host from '../../container/vim/host'
import HostInfo from '../../container/vim/hostInfo'
import Az from '../../container/vim/az'
import AzInfo from '../../container/vim/azInfo'
import Flavor from '../../container/vim/flavor'
import FlavorInfo from '../../container/vim/flavorInfo'
import Ha from '../../container/vim/ha'
import HaInfo from '../../container/vim/haInfo'
import Mirror from '../../container/vim/mirror'
import MirrorInfo from '../../container/vim/mirrorInfo'
import StorageVolume from '../../container/vim/storageVolume'
import StorageVolumeInfo from '../../container/vim/storageVolumeInfo'
import Virtual from '../../container/vim/virtual'
import VirtualInfo from '../../container/vim/virtualInfo'
import VirtualNetwork from '../../container/vim/virtualNetwork'
import VirtualNetworkInfo from '../../container/vim/virtualNetworkInfo'
import VolumeType from '../../container/vim/volumeType'
import VolumeTypeInfo from '../../container/vim/volumeTypeInfo'
import styles from '../../style/index.less'
class Vim extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // 选择项查询
        let selectKey = ['imdsSelectionAZ', 'imdsSelectionHA', 'imdsSelectionRegion', 'imdsSelectionHost', 'imdsSelectionProject']
        let self = this
        selectKey.forEach(item => {
            self.props.actions.getSubDataByName(item)
        })
    }

    render() {
        let { match, subDataAZ, subDataHA, subDataRegion, subDataHost, subDataProject } = this.props
        return (
            (subDataAZ && subDataHA && subDataRegion && subDataHost && subDataProject) ? (
                <div>
                    <Switch>
                        {/* <Redirect from={`${match.url}`} to={`${match.url}/az`} exact /> */}
                        <Route path={`${match.url}/host/:type/info/:id`} component={HostInfo} />
                        <Route path={`${match.url}/host`} component={Host} />
                        <Route path={`${match.url}/az/info/:id`} component={AzInfo} />
                        <Route path={`${match.url}/az`} component={Az} />
                        <Route path={`${match.url}/flavor/info/:id`} component={FlavorInfo} />
                        <Route path={`${match.url}/flavor`} component={Flavor} />
                        <Route path={`${match.url}/ha/info/:id`} component={HaInfo} />
                        <Route path={`${match.url}/ha`} component={Ha} />
                        <Route path={`${match.url}/mirror/info/:id`} component={MirrorInfo} />
                        <Route path={`${match.url}/mirror`} component={Mirror} />
                        <Route path={`${match.url}/storage_volume/info/:id`} component={StorageVolumeInfo} />
                        <Route path={`${match.url}/storage_volume`} component={StorageVolume} />
                        <Route path={`${match.url}/virtual/info/:id`} component={VirtualInfo} />
                        <Route path={`${match.url}/virtual`} component={Virtual} />
                        <Route path={`${match.url}/virtual_network/info/:id`} component={VirtualNetworkInfo} />
                        <Route path={`${match.url}/virtual_network`} component={VirtualNetwork} />
                        <Route path={`${match.url}/volume_type/info/:id`} component={VolumeTypeInfo} />
                        <Route path={`${match.url}/volume_type`} component={VolumeType} />
                    </Switch>
                </div>) : (
                    <div />
                )

        );
    }
}
export default Vim;