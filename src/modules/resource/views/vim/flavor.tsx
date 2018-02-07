import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import FlavorInfo from '../../container/vim/flavorInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin } from 'antd';
import styles from '../../style/index.less'
class Flavor extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/flavor/info`)
    }
    render() {
        let { match } = this.props
        return (
            <Switch>
                <Route path={`${match.url}/info`} component={FlavorInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>flavor列表</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>flavor列表</Breadcrumb.Item>
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
export default Flavor;