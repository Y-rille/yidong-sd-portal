import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SwitchboardInfo from '../../container/pim/switchboardInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin } from 'antd';
import styles from '../../style/index.less'
class Switchboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/1/switchboard/info`)
    }
    render() {
        let { match } = this.props
        return (
            <Switch>
                <Route path={`${match.url}/info`} component={SwitchboardInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>交换机列表</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>交换机列表</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className={styles.queryBar}>
                            queryBar
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Switchboard;