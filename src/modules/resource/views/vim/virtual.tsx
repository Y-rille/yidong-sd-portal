import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import VirtualInfo from '../../container/vim/virtualInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select } from 'antd';
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
const Option = Select.Option;
class Virtual extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            menuValue: 'region',
            secondMenuValue: 'az',
            thiredMenuValue: 'ha',
            fourthMenuValue: 'host'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/virtual/info`)
    }
    menuChange(value) {
        this.setState({
            menuValue: value
        })
    }

    secondMenuChange(value) {
        this.setState({
            secondMenuValue: value
        })
    }

    thiredMenuChange(value) {
        this.setState({
            thiredMenuValue: value
        })
    }

    fourthMenuChange(value) {
        this.setState({
            fourthMenuValue: value
        })
    }
    handleClick() {
        const { menuValue, secondMenuValue, thiredMenuValue, fourthMenuValue } = this.state;
        // console.log("selectValue:", menuValue, secondMenuValue, thiredMenuValue)
    }
    goPage() {
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    render() {
        let tData = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '虚拟机名称',
                link: true,
                fixed: true,
            }, {
                key: 'name',
                title: '主机',
                fixed: true,
            }, {
                key: 'mobile',
                title: '项目',
            }, {
                key: 'vm',
                title: '镜像'
            },
            {
                key: 'email',
                title: 'IP地址',
            }, {
                key: 'cpu',
                title: 'CPU数'
            }, {
                key: 'memory',
                title: '状态'
            }, {
                key: 'role',
                title: '运行时间',
            }],
            'body': [
                {
                    'id': 'whj_train1',
                    'email': 'whj_train',
                    'name': 'p3tenant_c119699c',
                    'mobile': 'win2012',
                    'cpu': 'HW-Volte-Test-Busi-V1175 188.103.19.171',
                    'memory': '42134',
                    'role': '14天24小时',
                    'vm': 20
                },
                {
                    'id': 'whj_train2',
                    'email': 'whj_train',
                    'name': 'p3tenant_c119699c',
                    'mobile': 'win2012',
                    'cpu': 'HW-Volte-Test-Busi-V1175 188.103.19.171',
                    'memory': '42134',
                    'role': '14天24小时',
                    'vm': 20
                },
                {
                    'id': 'whj_train3',
                    'email': 'whj_train',
                    'name': 'p3tenant_c119699c',
                    'mobile': 'win2012',
                    'cpu': 'HW-Volte-Test-Busi-V1175 188.103.19.171',
                    'memory': '42134',
                    'role': '14天24小时',
                    'vm': 20
                },
                {
                    'id': 'whj_train4',
                    'email': 'whj_train',
                    'name': 'p3tenant_c119699c',
                    'mobile': 'win2012',
                    'cpu': 'HW-Volte-Test-Busi-V1175 188.103.19.171',
                    'memory': '42134',
                    'role': '14天24小时',
                    'vm': 20
                },
                {
                    'id': 'whj_train5',
                    'email': 'whj_train',
                    'name': 'p3tenant_c119699c',
                    'mobile': 'win2012',
                    'cpu': 'HW-Volte-Test-Busi-V1175 188.103.19.171',
                    'memory': '42134',
                    'role': '14天24小时',
                    'vm': 20
                },
                {
                    'id': 'whj_train6',
                    'email': 'whj_train',
                    'name': 'p3tenant_c119699c',
                    'mobile': 'win2012',
                    'cpu': 'HW-Volte-Test-Busi-V1175 188.103.19.171',
                    'memory': '42134',
                    'role': '14天24小时',
                    'vm': 20
                },
                {
                    'id': 'whj_train7',
                    'email': 'whj_train',
                    'name': 'p3tenant_c119699c',
                    'mobile': 'win2012',
                    'cpu': 'HW-Volte-Test-Busi-V1175 188.103.19.171',
                    'memory': '42134',
                    'role': '14天24小时',
                    'vm': 20
                },
                {
                    'id': 'whj_train8',
                    'email': 'whj_train',
                    'name': 'p3tenant_c119699c',
                    'mobile': 'win2012',
                    'cpu': 'HW-Volte-Test-Busi-V1175 188.103.19.171',
                    'memory': '42134',
                    'role': '14天24小时',
                    'vm': 20
                },
                
            ]
        }
        let { match } = this.props;
        const { menuValue, secondMenuValue, thiredMenuValue, fourthMenuValue } = this.state;
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={VirtualInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>虚拟机管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>虚拟机管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Select
                                    value={menuValue}
                                    onChange={this.menuChange.bind(this)}
                                >
                                    <Option value="region">Region</Option>
                                </Select>

                                <Select
                                    value={secondMenuValue}
                                    onChange={this.secondMenuChange.bind(this)}
                                >
                                    <Option value="az">AZ</Option>
                                </Select>

                                <Select
                                    value={thiredMenuValue}
                                    onChange={this.thiredMenuChange.bind(this)}
                                >
                                    <Option value="ha">HA</Option>
                                </Select>

                                <Select
                                    value={fourthMenuValue}
                                    onChange={this.fourthMenuChange.bind(this)}
                                >
                                    <Option value="host">Host</Option>
                                </Select>

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
                                data={tData}
                                pageAuth={true}
                                actionAuth={[]}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Virtual;