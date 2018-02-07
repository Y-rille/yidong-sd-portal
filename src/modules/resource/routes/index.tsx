import * as React from 'react'
import * as PropTypes from 'prop-types';
import Home from '../container/home'
import Dashboard from '../container/dashboard'
import Vim from '../container/vim/vim'
// import Pim from '../container/pim/pim'
import { injectAsyncReducer } from '../../../common/store';
import {
    Switch,
    Route,
} from 'react-router-dom'

let { resourceReducer } = require('../reducers/index');

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
        injectAsyncReducer(store, 'resourceReducer', resourceReducer);
    }

    render() {
        let { match } = this.props
        return (
            <Switch>
                {/* <Route path={`${match.url}/dashboard`} component={Dashboard} />
                <Route path={`${match.url}/vim`} component={Vim} /> */}
                {/* <Route path={`${match.url}/pim`} component={Pim} /> */}
                <Route path={`${match.url}`} component={Home} />
            </Switch>
        );
    }
}
