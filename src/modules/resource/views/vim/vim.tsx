import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import Az from '../../container/vim/az'
import Flavor from '../../container/vim/flavor'
import Ha from '../../container/vim/ha'
import Mirror from '../../container/vim/mirror'
import StorageVolume from '../../container/vim/storageVolume'
import Virtual from '../../container/vim/virtual'
import VirtualNetwork from '../../container/vim/virtualNetwork'
import VolumeType from '../../container/vim/volumeType'
import Host from '../../container/vim/host'
import styles from '../../style/index.less'
class Vim extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        // 选择项查询
        let selectKey = ['AZ', 'HA', 'Region', 'Host', 'Project']
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
                    <Redirect from={`${match.url}`} to={`${match.url}/az`} exact />
                    <Route path={`${match.url}/host`} component={Host} />
                    <Route path={`${match.url}/az`} component={Az} />
                    <Route path={`${match.url}/flavor`} component={Flavor} />
                    <Route path={`${match.url}/ha`} component={Ha} />
                    <Route path={`${match.url}/mirror`} component={Mirror} />
                    <Route path={`${match.url}/storage_volume`} component={StorageVolume} />
                    <Route path={`${match.url}/virtual`} component={Virtual} />
                    <Route path={`${match.url}/virtual_network`} component={VirtualNetwork} />
                    <Route path={`${match.url}/volume_type`} component={VolumeType} />
                </Switch>
            </div>) : (
                    <div />
                )
             
        );
    }
}
export default Vim;