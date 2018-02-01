import * as React from 'react'
import * as PropTypes from 'prop-types';
import Home from '../container/home'
import { injectAsyncReducer } from '../../../common/store';
import {
    Switch,
    Route,
} from 'react-router-dom'

let { performanceReducer } = require('../reducers/index');

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
        injectAsyncReducer(store, 'performanceReducer', performanceReducer);
    }

    render() {
        let { match } = this.props
        return (
            <Switch>
                <Route path={`${match.url}`} component={Home} />
            </Switch>
        );
    }
}
