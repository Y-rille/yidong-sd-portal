import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

const { connect } = require('react-redux')

import MainRoures from './common/routes';
const store = require('./common/store').default();

class Root extends React.Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <MainRoures store={store} />
            </Provider>
        )
    }
}
export default Root;
