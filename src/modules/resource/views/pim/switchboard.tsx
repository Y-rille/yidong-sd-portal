import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SwitchboardInfo from '../../container/pim/switchboardInfo'
import CompactTable from '../../../../components/CompactTable'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Cascader, Input } from 'antd';
import styles from '../../style/index.less'

class Switchboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            dataValue: ['数据中心'],
            nameValue: ''
        };
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/1/switchboard/info`)
    }
    onDataChange(value) {
        this.setState({
            dataValue: value
        })
    }
    onNameChange(value) {
        this.setState({
            nameValue: value
        })
    }
    handleClick() {
        const { dataValue, nameValue } = this.state;
        // console.log(dataValue, nameValue)
    }
    goPage = () => {
        
    }
    goLink(url) {
        this.props.history.push(url)
    }
    render() {
        let { match } = this.props;
        const { dataValue, nameValue } = this.state;
        const DataCenter = [{
            value: '数据中心1',
            label: '数据中心1',
            children: [{
                value: '机房1',
                label: '机房1',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房2',
                label: '机房2',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房3',
                label: '机房3',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }],
        }, {
            value: '数据中心2',
            label: '数据中心2',
            children: [{
                value: '机房1',
                label: '机房1',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房2',
                label: '机房2',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房3',
                label: '机房3',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }],
        }];
        return (
            <Switch>
                <Route path={`${match.url}/info`} component={SwitchboardInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>交换机管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>物理部署组织</Breadcrumb.Item>
                                <Breadcrumb.Item>交换机管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Cascader
                                    options={DataCenter}
                                    onChange={this.onDataChange.bind(this)}
                                    placeholder={dataValue}
                                />
                                <Input
                                    placeholder="名称，编号"
                                    value={nameValue} type="text"
                                    onChange={this.onNameChange.bind(this)}
                                />
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                                </Button>
                            </div>
                            <CompactTable
                                goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                data={null}
                                actionAuth={[]}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Switchboard;