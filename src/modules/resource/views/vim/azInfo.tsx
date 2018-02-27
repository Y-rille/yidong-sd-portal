import * as React from 'react';
import * as _ from 'lodash';
import {
    Breadcrumb,
    Icon,
    Tabs,
    Row,
    Col,
    Select,
    Button,
    Input
} from 'antd';
import CompactTable from '../../../../components/CompactTable/'
import Headline from '../../../../components/Headline/'
import Summaries from '../../../../components/Summaries/'
import styles from '../../style/index.less'
const Option = Select.Option;
class AzInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            HostInputValue: '',
            HZSelectValue: 'HZ'
        }
    }
    handleClick() {
        const { HostInputValue, HZSelectValue } = this.state;
        // console.log(HostInputValue, HZSelectValue)
    }
    HZSelectChange(value) {
        this.setState({
            HZSelectValue: value
        })
    }
    HostInputChange(e) {
        this.setState({
            HostInputValue: e.target.value
        })
    }
    renderTitle = (title) => {
        return (
            <div className={styles.nodeTitle}>
                <span className={styles.nodeTitle1}></span>
                <span className={styles.nodeTitle2}>{title}</span>
            </div>
        )
    }
    goPage() { }
    renderTable() { 
        let tdata = {
            'count': 17,
            'header': [
                {
                key: 'id',
                title: '名称',
                // fixed: true,
                link: true,
            }, {
                key: 'name',
                title: '内存',
                // fixed: true,
                // link: true,
            }, {
                key: 'mobile',
                title: 'CPU',
            }, {
                key: 'vm',
                title: '所属HA'
            },
            {
                key: 'email',
                title: '维护状态',
            }, {
                key: 'cpu',
                title: 'VM数'
            }],
            'body': [
                {
                    'id': 'xiaojindian4',
                    'name': '2c55-:d357-612de-32',
                    'mobile': '13',
                    'vm': 20,
                    'email': '1',
                    'cpu': '12',
                },
                {
                    'id': 'xiaojindian',
                    'name': '2c55-:d357-612de-32',
                    'mobile': '13',
                    'vm': 20,
                    'email': '2',
                    'cpu': '12',
                },
            ]
        }
        return (
            <CompactTable
                            outStyle={{ marginTop: '20px' }}
                            goPage={this.goPage.bind(this)} // 翻页
                            // goLink={this.goLink.bind(this)}
                            data={tdata}
                            actionAuth={[]}
                            pageAuth={true}
                            footInfoAuth={false}
                        />
        )
    }
    render() {
        const { HostInputValue, HZSelectValue } = this.state;
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>AZ详情</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                        <Breadcrumb.Item>AZ管理</Breadcrumb.Item>
                        <Breadcrumb.Item>AZ详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '0 20px 20px 20px' }}>
                    <div>
                        <Headline title="系统信息" />
                        <Summaries
                            data={[
                                {
                                    attr: 'HA数',
                                    value: 12312
                                }, {
                                    attr: 'Host数',
                                    value: 12312
                                }, {
                                    attr: 'VCPU（未使用/总）',
                                    value: '21GB/26GB'
                                }, {
                                    attr: '内   存（未使用/总）',
                                    value: '21GB/26GB'
                                }, {
                                    attr: '硬   盘（未使用/总）',
                                    value: '21GB/26GB'
                                }
                            ]}
                            colNum={3} />
                        <Headline title="主机" />
                        <div className={styles.queryBar}>
                            <Input
                                value={HostInputValue}
                                type="text"
                                placeholder="主机名称"
                                onChange={this.HostInputChange.bind(this)}
                            />
                            <Select
                                value={HZSelectValue}
                                onChange={this.HZSelectChange.bind(this)}
                            >
                                <Option value="region">Region</Option>
                            </Select>

                            <Button
                                type="primary"
                                onClick={this.handleClick.bind(this)}>查询
                            </Button>
                        </div>
                    </div>
                    {this.renderTable()}

                </div>
            </div>
        );
    }
}
export default AzInfo;