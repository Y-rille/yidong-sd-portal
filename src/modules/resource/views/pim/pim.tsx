import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import Magnetic from '../../container/pim/magnetic'
import MagneticInfo from '../../container/pim/magneticInfo'
import Server from '../../container/pim/server'
import ServerInfo from '../../container/pim/serverInfo'
import Switchboard from '../../container/pim/switchboard'
import SwitchboardInfo from '../../container/pim/switchboardInfo'
import Firewall from '../../container/pim/firewall'
import FirewallInfo from '../../container/pim/firewallInfo'
import styles from '../../style/index.less'
class Pim extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // 选择项查询
        let selectKey = ['imdsSelectionVendor', 'imdsSelectionPIM', 'imdsSelectSwitchType']
        let self = this
        selectKey.forEach(item => {
            self.props.actions.getSubDataByName(item)
        })
        this.props.actions.getDataCenter('dcMachineRoomCabinet')
    }
    render() {
        let { match, subDataCenter, subDataVendor } = this.props
        return (
            (subDataCenter && subDataVendor) ? (
                <div>
                    <Switch>
                        {/* <Redirect from={`${match.url}`} to={`${match.url}/magnetic`} exact /> */}
                        <Route path={`${match.url}/magnetic/info/:magneticId`} component={MagneticInfo} />
                        <Route path={`${match.url}/magnetic`} component={Magnetic} />
                        <Route path={`${match.url}/server/info/:id`} component={ServerInfo} />
                        <Route path={`${match.url}/server`} component={Server} />
                        <Route path={`${match.url}/switchboard/info/:id`} component={SwitchboardInfo} />
                        <Route path={`${match.url}/switchboard`} component={Switchboard} />
                        <Route path={`${match.url}/firewall/info/:id`} component={FirewallInfo} />
                        <Route path={`${match.url}/firewall`} component={Firewall} />

                    </Switch>
                </div>) : (
                    <div />
                )

        );
    }
}
export default Pim;