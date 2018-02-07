import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import HaInfo from '../../container/vim/haInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin } from 'antd';
import styles from '../../style/index.less'
class Ha extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/ha/info`)
    }
    render() {
        let { match } = this.props
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>HA列表</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                        <Breadcrumb.Item>HA列表</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={styles.queryBar}>
                    queryBar
                </div>
                <Switch>
                    <Route path={`${match.url}/info`} component={HaInfo} />
                    <Route render={() => (
                        <div onClick={this.goInfo}>详情</div>
                    )} />
                </Switch>
            </div>
        );
    }
}
export default Ha;