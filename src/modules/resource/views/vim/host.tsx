import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import HostInfo from '../../container/vim/hostInfo'
import { Row, Col, Breadcrumb, Icon, Radio, Spin } from 'antd';
import styles from '../../style/index.less'
import HostQueryBar from '../../../../components/HostQueryBar/'
class Host extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/host/info`)
    }
    onChange() {

    }
    render() {
        let { match } = this.props
        return (

            <Switch>
                <Route path={`${match.url}/info`} component={HostInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>主机列表</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>主机列表</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <HostQueryBar />
                            </div>
                            <Radio.Group onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }}>
                                <Radio.Button value="small">控制节点</Radio.Button>
                                <Radio.Button value="default">计算节点</Radio.Button>
                                <Radio.Button value="large">存储节点</Radio.Button>
                            </Radio.Group>
                            <div>
                                table区域
                            </div>
                        </div>

                    </div>
                )} />
            </Switch>
        );
    }
}
export default Host;