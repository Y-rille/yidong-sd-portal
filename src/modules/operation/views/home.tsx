import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, Menu } from 'antd';
const Search = Input.Search

// import UserTable from '../../../components/UserTable/'
// import * as classNames from 'classnames';
declare let global: any;

import styles from '../style/index.less'
import CustomInspection from './customInspection'
import ThresholdManage from './thresholdManage'
class Home extends React.Component<any, any> {
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
    goPath(e) {
        let { match } = this.props
        const path = e
        const currentUrl = this.props.location.pathname
        if (currentUrl.indexOf(path) < 0) {
            this.props.history.push(`${match.url}/${path}`)
        }

    }
    componentWillMount() {
    }
    handleClick(e) {
        this.goPath(e.key);
    }
    renderLeftNav() {
        let path = this.props.location.pathname
        let pathKey = path.replace('/operation/', '');
        if (pathKey.indexOf('operation') < 0) {
            return (
                <Menu onClick={this.handleClick.bind(this)} defaultSelectedKeys={pathKey} mode="inline">
                    <Menu.Item key="custom_inspection">
                        <Icon type="schedule" />自定义巡检
                    </Menu.Item>
                    <Menu.Item key="threshold_manage">
                        <Icon type="solution" />阈值管理
                    </Menu.Item>
                </Menu>
            )
        }
    }
    render() {
        let { match, tree, config } = this.props
        let { activeKey } = this.state
        return (
            <Row className={styles.operation}>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={300}
                    defaultSize={200}
                    onChange={this.triggerResize} >
                    <div className="sideBar">
                        {this.renderLeftNav()}
                    </div>
                    <div className={styles.main}>
                        <Switch>
                            <Redirect from={`${match.url}`} to={`${match.url}/custom_inspection`} exact />
                            <Route path={`${match.url}/custom_inspection`}
                                render={() => <CustomInspection config={config} />} />
                            <Route path={`${match.url}/threshold_manage`}
                                render={() => <ThresholdManage config={config} />} />
                        </Switch>
                    </div>
                </SplitPane>
            </Row>
        );
    }
}

export default Home;