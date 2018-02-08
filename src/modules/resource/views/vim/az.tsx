import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import AzInfo from '../../container/vim/azInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
import styles from '../../style/index.less'
const Option = Select.Option;
class Az extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            AZInputValue: '',
            AZSelectValue: 'region'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/az/info`)
    }
    AZSelectChange(value) {
        this.setState({
            AZSelectValue: value
        })
    }
    AZInputChange(value) {
        this.setState({
            AZInputValue: value
        })
    }
    handleClick() {
        const { AZInputValue, AZSelectValue } = this.state;
        // console.log(AZInputValue, AZSelectValue)
    }
    render() {
        let { match } = this.props;
        const { AZInputValue, AZSelectValue } = this.state;
        return (
            <div>
                <Switch>
                    <Route path={`${match.url}/info`} component={AzInfo} />
                    <Route render={() => (
                        <div>
                            <div className={styles.header}>
                                <h1 className={styles.title}>AZ管理</h1>
                                <Breadcrumb>
                                    <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                    <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                    <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                    <Breadcrumb.Item>AZ管理</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div style={{ padding: '20px' }}>
                                <div className={styles.queryBar}>
                                    <Select
                                        value={AZSelectValue}
                                        onChange={this.AZSelectChange.bind(this)}
                                        style={{ width: 120 }}>
                                        <Option value="region">Region</Option>
                                    </Select>
                                    <Input
                                        placeholder="AZ名称"
                                        value={AZInputValue} type="text"
                                        onChange={e => this.AZInputChange(e.target.value)}
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
                                <div>
                                    table区域
                                </div>
                            </div>
                        </div>
                    )} />
                </Switch>
            </div>
        );
    }
}
export default Az;