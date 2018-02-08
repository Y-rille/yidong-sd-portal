import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import ServerInfo from '../../container/pim/serverInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select } from 'antd';
import styles from '../../style/index.less'
const Option = Select.Option;
class Server extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            dataSelectValue: '1',
            supplierSelectValue: '1'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/1/server/info`)
    }
    dataSelectChange(value) {
        this.setState({
            dataSelectValue: value
        })
    }
    supplierSelectChange(value) {
        this.setState({
            supplierSelectValue: value
        })
    }
    handleClick() {
        const { dataSelectValue, supplierSelectValue } = this.state;
        // console.log(dataSelectValue, supplierSelectValue);
    }
    render() {
        let { match } = this.props;
        const { dataSelectValue, supplierSelectValue } = this.state;
        return (
            <Switch>
                <Route path={`${match.url}/info`} component={ServerInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>服务器管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>物理部署组织</Breadcrumb.Item>
                                <Breadcrumb.Item>服务器管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Select
                                    value={dataSelectValue}
                                    onChange={this.dataSelectChange.bind(this)}
                                >
                                    <Option value="1">数据中心</Option>

                                </Select>
                                <Select
                                    value={supplierSelectValue}
                                    onChange={this.supplierSelectChange.bind(this)}
                                >
                                    <Option value="1">供应商</Option>
                                </Select>
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                            </Button>
                            </div>
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Server;