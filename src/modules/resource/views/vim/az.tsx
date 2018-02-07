import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import AzInfo from '../../container/vim/azInfo'
import styles from '../../style/index.less'
class Az extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/az/info`)
    }
    render() {
        let { match } = this.props
        return (
            <div> <Switch>
                <Route path={`${match.url}/info`} component={HostInfo} />
                <Route render={() => (
                    <div onClick={this.goInfo}>az详情</div>
                )} />
            </Switch></div>
        );
    }
}
export default Az;