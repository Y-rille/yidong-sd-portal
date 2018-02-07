import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import Host from './host'
import styles from '../../style/index.less'
class Vim extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    render() {
        let { match } = this.props
        return (
            <div>
                <div>主机列表*****************</div>
                <Switch>
                    <Redirect from={`${match.url}`} to={`${match.url}/host`} exact />
                    <Route path={`${match.url}/host`} component={Host} />
                </Switch>
            </div>
        );
    }
}
export default Vim;