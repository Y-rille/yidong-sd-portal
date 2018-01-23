import * as React from 'react'
import * as PropTypes from 'prop-types';
import Home from '../container/home'
import { injectAsyncReducer } from '../../../common/store';
import {
    Switch,
    Route,
} from 'react-router-dom'

let { dashboardReducer } = require('../reducers/index');

export interface RoutesProps {
    // store
    match
}

export default class Routes extends React.Component<RoutesProps, any> {
    static contextTypes = {
        store: PropTypes.object
    }
    componentWillMount() {
        let { store } = this.context
        injectAsyncReducer(store, 'dashboardReducer', dashboardReducer);
    }

    render() {
        let { match } = this.props
        return (
            <div>
                <Switch>
                    <Route path={`${match.url}`} component={Home} />
                </Switch>
            </div>
        );
    }
}
