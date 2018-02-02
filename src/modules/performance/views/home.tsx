import * as React from 'react';
import * as _ from 'lodash';
import * as classNames from 'classnames';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'
import moment from '../../../common/moment'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin } from 'antd';

import TreeSelect from '../../../components/TreeSelect'

import Info from '../container/info'

declare let global: any;

import { PerformanceActions } from '../actions/index';

import styles from '../style/index.less'

export interface HomeProps {
    actions: PerformanceActions,
    location?
    match?
    moInstKpiThresholds?
    moTypeKpis?
    tree?
    timeFilter?
}

class Home extends React.Component<HomeProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            defaultNodeId: []
        }

    }
    onTreeSelect(nodeId) {
        let { match } = this.props
        global.hashHistory.push(`${match.url}/${nodeId}`)
    }
    triggerResize() {
        let e: Event = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
    }
    getKpisAndThresholds() {
        this.props.actions.getMoTypeKpis(1, 7, (data) => {
        })
        this.props.actions.getMoInstKpiThresholds(1, 1, (data) => {
        })
    }
    getTimeFilter() {
        this.props.actions.getTimeFilter((data) => {
        })
    }
    getInfoDetail() {

    }
    componentWillMount() {
        let { match } = this.props
        const mp: any = matchPath(this.props.location.pathname, {
            path: `${match.url}/:nodeId`
        })
        let defaultNodeIdArr = []
        defaultNodeIdArr.push(mp.params.nodeId)
        this.setState({
            defaultNodeId: defaultNodeIdArr
        })
    }
    componentDidMount() {
        this.getKpisAndThresholds();
        this.getTimeFilter();
    }
    render() {
        let { match, tree } = this.props
        return (
            <Row className={styles.performance}>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={300}
                    defaultSize={200}
                    onChange={this.triggerResize} >
                    <div className={styles.tree}>
                        <TreeSelect onSelect={this.onTreeSelect.bind(this)} data={this.props.tree} dExpandedKeys={this.state.defaultNodeId}/>
                    </div>
                    <div className={styles.main}>
                        {
                            (this.props.moTypeKpis && this.props.moInstKpiThresholds) ? (
                                <Switch>
                                    <Route path={`${match.url}/:nodeId`} component={Info} />
                                    <Route render={() => (
                                        <h3>Please select a node.</h3>
                                    )} />
                                </Switch>
                            ) : (
                                    <Spin />
                                )
                        }
                    </div>
                </SplitPane>

            </Row>
        );
    }
}

export default Home;