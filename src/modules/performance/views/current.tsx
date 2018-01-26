import * as React from 'react';
import * as _ from 'lodash';
import {
    HashRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom'

import { Row, Col, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Home extends React.Component<any, any> {
    tabClick() {

    }
    render() {
        return (
            <Row>
                当前趋势main
            </Row>
        );
    }
}

export default Home;