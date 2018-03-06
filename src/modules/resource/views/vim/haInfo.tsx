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
const Option = Select.Option;
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import Headline from '../../../../components/Headline/'
import Summaries from '../../../../components/Summaries/'
import { ResourceActions } from '../../actions/index'
import Selector from '../../../../components/Selector/index'
import { stringify } from 'querystringify'
import { matchPath } from 'react-router'
var qs = require('querystringify')
class HaInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { pageNo, region, vim_id, name, az } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/:type/:id'
        })
        this.state = {
            tableLoading: false,
            pageSize: 1,
            az: az ? az : '',
            pageNo: pageNo ? pageNo : 1,
            vim_id: mp_node.params.id,
            name: name ? name : '',
            region: region ? region : '',
        }
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { region, name, pageSize, vim_id, pageNo, az } = this.state
        this.props.actions.queryList('imdsHAHost', { pageNo, pageSize, region, name, vim_id, az }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    goPage = (num) => {
        let { match } = this.props
        let { region, name } = this.state
        let pageNo = num
        this.setState({
            pageNo: num
        }, () => {
            this.getTableData()
            let queryObj = { pageNo, region, name }
            this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        })
    }
    handleClick() {
        this.setState({
            pageNo: 1
        }, () => {
            let { match } = this.props
            const { region, name, pageNo, az } = this.state;
            let queryObj = { pageNo, region, name, az }
            this.props.history.push(`${match.url}?${stringify(queryObj)}`)
            this.getTableData()
        });
    }
    HASelectChange(value) {
        this.setState({
            az: value
        })
    }
    HostInputChange(e) {
        this.setState({
            name: e.target.value
        })
    }
    getData(type, value) {  // 查询条件切换
        let { az } = this.state
        this.setState({
            az: type === 'AZ' ? value : az
        })
    }
    componentDidMount() {
        this.getTableData()
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    renderTitle = (title) => {
        return (
            <div className={styles.nodeTitle}>
                <span className={styles.nodeTitle1}></span>
                <span className={styles.nodeTitle2}>{title}</span>
            </div>
        )
    }

    render() {
        const { pageSize, tableLoading, az, name } = this.state;
        let { nodeInfo, list, subDataAZ } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>HA详情</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item>HA管理</Breadcrumb.Item>
                        <Breadcrumb.Item>HA详情</Breadcrumb.Item>
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
                                value={name}
                                type="text"
                                placeholder="主机名称"
                                onChange={this.HostInputChange.bind(this)}
                            />
                            <Selector type="AZ" data={subDataAZ} getData={this.getData.bind(this)} value={az} />

                            <Button
                                type="primary"
                                onClick={this.handleClick.bind(this)}>查询
                            </Button>
                        </div>
                    </div>
                    <CompactTable
                        goPage={this.goPage.bind(this)} // 翻页
                        data={list}
                        pageSize={pageSize}
                        loading={tableLoading}
                        outStyle={{ 'marginTop': '20px' }}
                    />

                </div>
            </div>
        );
    }
}
export default HaInfo;