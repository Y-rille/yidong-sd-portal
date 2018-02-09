import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import MirrorInfo from '../../container/vim/mirrorInfo'
import AzInfo from '../../container/vim/azInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin } from 'antd';
import styles from '../../style/index.less'
class Mirror extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/mirror/info`)
    }
    render() {
        let { match } = this.props
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={AzInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>镜像管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>镜像管理</Breadcrumb.Item>
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
export default Mirror;