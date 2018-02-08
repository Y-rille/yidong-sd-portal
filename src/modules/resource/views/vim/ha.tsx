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
            HAInputValue: '',
            HASelectValue: 'region'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/ha/info`)
    }
    HASelectChange(value) {
        this.setState({
            HASelectValue: value
        })
    }
    HAInputChange(value) {
        this.setState({
            HAInputValue: value
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
            <Switch>
                <Route path={`${match.url}/info`} component={HaInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>HA管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>HA管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Select
                                    value={HASelectValue}
                                    onChange={this.HASelectChange.bind(this)}
                                >
                                    <Option value="region">Region</Option>
                                </Select>
                                <Input
                                    placeholder="HA名称"
                                    value={HAInputValue} type="text"
                                    onChange={e => this.HAInputChange(e.target.value)}
                                />
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
export default Ha;