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
    history?
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
        this.props.history.push(`${match.url}/${nodeId}`)
        let defaultNodeIdArr = []
        defaultNodeIdArr.push(nodeId)
        this.setState({
            defaultNodeId: defaultNodeIdArr
        })
        this.props.actions.getNodeData(nodeId, this.props.tree)
    }
    triggerResize() {
        let e: Event = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);

        document.querySelector('.ant-input-search').setAttribute('style', `width: ${document.querySelector('.Pane1').clientWidth}px`)
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
            path: `${match.url} /: nodeId`
        })
        if (mp) {
            let defaultNodeIdArr = []
            defaultNodeIdArr.push(mp.params.nodeId)
            this.setState({
                defaultNodeId: defaultNodeIdArr
            })
        }
    }
    componentDidMount() {
        this.getTimeFilter();
        document.querySelector('.ant-input-search').setAttribute('style', `width: ${document.querySelector('.Pane1').clientWidth}px`)
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
                    onChange={this.triggerResize.bind(this)} >
                    <div className={styles.tree}>
                        <TreeSelect onSelect={this.onTreeSelect.bind(this)} data={this.props.tree} dExpandedKeys={this.state.defaultNodeId} />
                    </div>
                    <div className={styles.main}>
                        <Switch>
                            <Route path={`${match.url}/:nodeId`} component={Info} />
                            <Route render={() => (
                                <h3>Please select a node.</h3>
                            )} />
                        </Switch>
                    </div>
                </SplitPane>

            </Row>
        );
    }
}

export default Home;