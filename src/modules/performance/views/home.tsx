import * as React from 'react';
import * as _ from 'lodash';
import * as classNames from 'classnames';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'
import moment from '../../../common/moment'
import { Row, Col, Breadcrumb, Icon, Tabs, Button } from 'antd';

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
    componentDidMount() {
        this.getKpisAndThresholds();
        this.getTimeFilter();
    }
    render() {
        // console.log(`15分钟前:${moment().tz('Asia/Shanghai').subtract(15, 'minutes').format()}`)
        // console.log(`开始时间:${moment().tz('Asia/Shanghai').subtract(15, 'minutes').valueOf()}`)
        // console.log(`结束时间:${moment().tz('Asia/Shanghai').valueOf()}`)
        let { match, tree } = this.props
        // console.log(this.props.timeFilter)
        return (
            <Row className={styles.performance}>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={300}
                    defaultSize={200}
                    onChange={this.triggerResize} >
                    <div className={styles.tree}>
                        <TreeSelect />
                    </div>
                    <div className={styles.main}>
                        {
                            (this.props.moTypeKpis && this.props.moInstKpiThresholds) ? (
                                <Switch>
                                    <Route path={`${match.url}/:moTypeId/:moInstId`} component={Info} />
                                    <Route render={() => (
                                        <h3>Please select a node.</h3>
                                    )} />
                                </Switch>
                            ) : (
                                    <div>loading</div>
                                )
                        }
                    </div>
                </SplitPane>

            </Row>
        );
    }
}

export default Home;