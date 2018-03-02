import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import AzInfo from '../../container/vim/azInfo'
import CompactTable from '../../../../components/CompactTable'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
import styles from '../../style/index.less'
const Option = Select.Option;

import Selector from '../../../../components/Selector'
import { ResourceActions } from '../../actions/index'
export interface AzProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    subDataRegion?,
}

class Az extends React.Component<AzProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            AZInputValue: ''
        }
    }
    AZInputChange(value) {
        this.setState({
            AZInputValue: value
        })
    }
    handleClick() {
        const { AZInputValue } = this.state;
        // console.log(AZInputValue, AZSelectValue)
    }
    goPage = () => {

    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    selectRow(selectedRows) {
        // console.log(selectedRows, 'sss');
    }
    getData() {

    }
    componentDidMount() {
        // 控制节点 imdsQueryListController
        // 计算节点 imdsQueryListHost
        // 存储节点 imdsQueryListStorage
        let data = {
            pageSize: 10,
            pageNo: 1,
        }
        // this.props.actions.queryList('imdsQueryListController')
    }

    render() {
        let tdata = {
            'totalCount': 15,
            'header': [{
                key: 'id',
                title: 'AZ名称',
                link: true,
            }, {
                key: 'name',
                title: 'HA数',

            }, {
                key: 'mobile',
                title: '主机数',
            }],
            'dataList': [
                {
                    'id': 'xiaojindian1',
                    'name': 13,
                    'mobile': 15,
                }, {
                    'id': 'xiaojindian2',
                    'name': 13,
                    'mobile': 15,
                }, {
                    'id': 'xiaojindian3',
                    'name': 13,
                    'mobile': 15,
                    hasChecked: true
                }, {
                    'id': 'xiaojindian4',
                    'name': 13,
                    'mobile': 15,
                }, {
                    'id': 'xiaojindian5',
                    'name': 13,
                    'mobile': 15,
                }, {
                    'id': 'xiaojindian6',
                    'name': 13,
                    'mobile': 15,
                }
            ]
        }
        let { match } = this.props;
        const { AZInputValue, AZSelectValue } = this.state;
        return (
            <div>
                <Switch>
                    <Route path={`${match.url}/info/:azId`} component={AzInfo} />
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
                                    <Selector type="Region" data={this.props.subDataRegion} actions={this.props.actions} getData={this.getData.bind(this)} />
                                    <Input
                                        placeholder="AZ名称"
                                        value={AZInputValue} type="text"
                                        onChange={e => this.AZInputChange(e.target.value)}
                                    />
                                    <Button
                                        type="primary"
                                        onClick={this.handleClick.bind(this)}
                                    >
                                        查询
                                    </Button>
                                </div>
                                <CompactTable
                                    outStyle={{ marginTop: '20px' }}
                                    goPage={this.goPage.bind(this)} // 翻页
                                    goLink={this.goLink.bind(this)}
                                    data={tdata}
                                    pageSize={5}
                                // selectAuth={true}
                                // actionAuth={['edit']}
                                // selectRow={this.selectRow.bind(this)}
                                />
                                {/* <CompactTable
                                    outStyle={{ marginTop: '20px' }}

                                /> */}
                            </div>
                        </div>
                    )} />
                </Switch>
            </div>
        );
    }
}
export default Az;