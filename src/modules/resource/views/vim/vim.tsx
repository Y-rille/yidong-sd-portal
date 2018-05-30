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
import StorageSnapshot from '../../container/vim/storageSnapshot'
import StorageVolumeInfo from '../../container/vim/storageVolumeInfo'
import Virtual from '../../container/vim/virtual'
import VirtualInfo from '../../container/vim/virtualInfo'
import VirtualNetwork from '../../container/vim/virtualNetwork'
import VirtualNetworkInfo from '../../container/vim/virtualNetworkInfo'
import VolumeType from '../../container/vim/volumeType'
import VolumeTypeInfo from '../../container/vim/volumeTypeInfo'
import VirtualGroup from '../../container/vim/virtualGroup'
import NetworkQos from '../../container/vim/networkQos'
import ProjectQuota from '../../container/vim/projectQuota'
import ProjectUser from '../../container/vim/projectUser'
import StorageQos from '../../container/vim/storageQos'
import UserGroup from '../../container/vim/userGroup'
import VfRule from '../../container/vim/vfRule'
import VfStrategy from '../../container/vim/vfStrategy'
import VirtualFirewall from '../../container/vim/virtualFirewall'
// import VirtualPort from '../../container/vim/virtualPort'
import VirtualRouter from '../../container/vim/virtualRouter'
// import VirtualSubnet from '../../container/vim/virtualSubnet'
import styles from '../../style/index.less'
import vfRule from '../../container/vim/vfRule';
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
                        <Route path={`${match.url}/storage_snapshot`} component={StorageSnapshot} />
                        <Route path={`${match.url}/virtual/info/:id`} component={VirtualInfo} />
                        <Route path={`${match.url}/virtual`} component={Virtual} />
                        <Route path={`${match.url}/virtual_network/info/:id`} component={VirtualNetworkInfo} />
                        {/* <Route path={`${match.url}/virtual_network/:id/subnet`} component={VirtualSubnet} />
                        <Route path={`${match.url}/virtual_network/:id/port`} component={VirtualPort} /> */}
                        <Route path={`${match.url}/virtual_network`} component={VirtualNetwork} />
                        <Route path={`${match.url}/volume_type/info/:id`} component={VolumeTypeInfo} />
                        <Route path={`${match.url}/volume_type`} component={VolumeType} />
                        <Route path={`${match.url}/virtual_group`} component={VirtualGroup} />
                        <Route path={`${match.url}/storage_qos`} component={StorageQos} />
                        <Route path={`${match.url}/network_qos`} component={NetworkQos} />
                        <Route path={`${match.url}/virtual_router`} component={VirtualRouter} />
                        <Route path={`${match.url}/virtual_firewall`} component={VirtualFirewall} />
                        <Route path={`${match.url}/vf_strategy`} component={VfStrategy} />
                        <Route path={`${match.url}/vf_rule`} component={VfRule} />
                        <Route path={`${match.url}/user_group`} component={UserGroup} />
                        <Route path={`${match.url}/project_quota/:id/user`} component={ProjectUser} />
                        <Route path={`${match.url}/project_quota`} component={ProjectQuota} />
                    </Switch>
                </div>) : (
                    <div />
                )

        );
    }
}
export default Vim;