import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input } from 'antd';
const Search = Input.Search

import UserTable from '../../../components/UserTable/'

declare let global: any;
import styles from '../style/index.less'
class Log extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    triggerResize() {
        let e: Event = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
    }
    componentWillReceiveProps(nextProps) {
    }
    // showModal() {
    //     this.setState({
    //         visible: true
    //     })
    // }
    // handleOk() {
    //     this.setState({
    //         visible: false
    //     })
    // }
    // handleCancel() {
    //     this.setState({
    //         visible: false
    //     })
    // }
    componentWillMount() {
    }
    render() {
        let { match, tree } = this.props
        let { activeKey } = this.state
        // if (!tree) {
        //     return <div>loading</div>
        // }
        return (
            <Row className={styles.performance}>
                <div>log</div>

            </Row>
        );
    }
}

export default Log;