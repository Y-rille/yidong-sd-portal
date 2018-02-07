import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import Magnetic from '../../container/pim/magnetic'
import Server from '../../container/pim/server'
import Switchboard from '../../container/pim/switchboard'
import Firewall from '../../container/pim/firewall'
import styles from '../../style/index.less'
class Pim extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    render() {
        let { match } = this.props
        return (
            <div>
                <Switch>
                    <Redirect from={`${match.url}`} to={`${match.url}/magnetic`} exact />
                    <Route path={`${match.url}/magnetic`} component={Magnetic} />
                    <Route path={`${match.url}/server`} component={Server} />
                    <Route path={`${match.url}/switchboard`} component={Switchboard} />
                    <Route path={`${match.url}/firewall`} component={Firewall} />
                </Switch>
            </div>
        );
    }
}
export default Pim;