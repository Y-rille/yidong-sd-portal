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
import Result from '../container/result'

import { deepPickFirst } from '../utils/deepPick'

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
            defaultNodeId: [],
            searchValue: ''
        }

    }
    onTreeSelect(nodeId) {
        let { match, history } = this.props
        let defaultNodeIdArr = []
        defaultNodeIdArr.push(nodeId)
        this.setState({
            defaultNodeId: defaultNodeIdArr
        })
        history.push(`${match.url}/${nodeId}`)
    }
    triggerResize() {
        let e: Event = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);

        document.querySelector('.tree-search').setAttribute('style', `width: ${document.querySelector('.Pane1').clientWidth}px`)
    }

    getTimeFilter() {
        this.props.actions.getTimeFilter((data) => {
        })
    }
    getInfoDetail() {

    }
    handleSearch(value) {
        let { match, history } = this.props
        if (value) {
            if (value.searchValue) {
                if (this.props.location.pathname.split('/').indexOf('search') < 0) {
                    history.push(`${match.url}/search/${value.searchValue}`)
                } else {
                    history.replace(`${match.url}/search/${value.searchValue}`)
                }
            } else {
                let firstNode = deepPickFirst(this.props.tree)
                if (firstNode) {
                    history.push(`${match.url}/${firstNode.nodeId}`)
                    this.setState({
                        defaultNodeId: [firstNode.nodeId]
                    })
                }
            }
            this.setState({
                searchValue: value
            })
        } else {
            this.setState({
                searchValue: ''
            })
        }
    }
    componentWillMount() {
        let { match, history } = this.props
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: `${match.url}/:nodeId`
        })
        if (mp_node) {
            let defaultNodeIdArr = []
            defaultNodeIdArr.push(mp_node.params.nodeId)
            this.setState({
                defaultNodeId: defaultNodeIdArr
            })
        } else {
            let firstNode = deepPickFirst(this.props.tree)
            if (firstNode) {
                history.replace(`${match.url}/${firstNode.nodeId}`)
                let defaultNodeIdArr = []
                defaultNodeIdArr.push(firstNode.nodeId)
                this.setState({
                    defaultNodeId: defaultNodeIdArr
                })
            }
        }
    }
    componentDidMount() {
        this.getTimeFilter();
        document.querySelector('.tree-search').setAttribute('style', `width: ${document.querySelector('.Pane1').clientWidth}px`)
    }
    render() {
        let { match, tree } = this.props
        const mp_search: any = matchPath(this.props.location.pathname, {
            path: `${match.url}/search/:querykey`
        })
        let initSearchValue = ''
        if (mp_search) {
            initSearchValue = mp_search.params.querykey
        }
        return (
            <Row className={styles.performance}>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={300}
                    defaultSize={260}
                    onChange={this.triggerResize.bind(this)} >
                    <div className={styles.tree}>
                        <TreeSelect onSelect={this.onTreeSelect.bind(this)} data={this.props.tree} searchValue={initSearchValue} dExpandedKeys={this.state.defaultNodeId} onSearch={this.handleSearch.bind(this)} />
                    </div>
                    <div className={styles.main} style={{ minHeight: window.innerHeight - 104 }}>
                        <Switch>
                            <Route path={`${match.url}/search/:querykey`} render={() => <Result {...this.props} datas={this.state.searchValue} />} />
                            <Route path={`${match.url}/:nodeId`} component={Info} />
                            <Route render={() => (
                                <div></div>
                            )} />
                        </Switch>
                    </div>
                </SplitPane>

            </Row>
        );
    }
}

export default Home;