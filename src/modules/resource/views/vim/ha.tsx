import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import HaInfo from '../../container/vim/haInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
import styles from '../../style/index.less'
const Option = Select.Option;
class Ha extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            HAInputValue: 'HA名称',
            HASelectValue: '1'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/ha/info`)
    }
    HASelectChange(value) {
        const { AZSelectValue } = this.state;
        this.setState({
            AZSelectValue: value
        })
    }
    HAInputChange(value) {
        const { AZInputValue } = this.state;
        this.setState({
            AZInputValue: value
        })
    }
    handleClick() {
        const { HAInputValue, HASelectValue } = this.state;
        // console.log(HAInputValue, HASelectValue)
    }
    render() {
        let { match } = this.props;
        const { HAInputValue, HASelectValue } = this.state;
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
                    <Select
                        value={HASelectValue}
                        onChange={this.HASelectChange.bind(this)}
                        style={{ width: 120 }}>
                        <Option value="1">K1</Option>
                        <Option value="2">K2</Option>
                        <Option value="3">K3</Option>
                    </Select>
                    <Input
                        value={HAInputValue} type="text"
                        onChange={this.HAInputChange.bind(this)}
                        style={{ width: 120, marginLeft: 10 }}
                    />
                    <Button
                        type="primary"
                        style={{ marginLeft: 10 }}
                        onClick={this.handleClick.bind(this)}
                    >
                        查询
                    </Button>
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