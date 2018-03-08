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
import Selector from '../../../../components/Selector/index'
import { stringify } from 'querystringify'
import { matchPath } from 'react-router'
var qs = require('querystringify')
const Option = Select.Option;
class AzInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { pageNo, vim_id, name, ha } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/:type/:id'
        })
        this.state = {
            tableLoading: false,
            pageSize: 10,
            ha: ha ? ha : '',
            pageNo: pageNo ? pageNo : 1,
            vim_id: mp_node.params.id,
            name: name ? name : '',
        }
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { name, pageSize, vim_id, pageNo, ha } = this.state
        this.props.actions.queryList('imdsAZHost', { pageNo, pageSize, name, vim_id, ha }, (res) => {
            self.setState({
                tableLoading: false
            });
        })
    }
    goPage = (num) => {
        let { match } = this.props
        let { name } = this.state
        let pageNo = num
        this.setState({
            pageNo: num
        }, () => {
            this.getTableData()
            let queryObj = { pageNo, name }
            this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        })
    }
    handleClick() {
        this.setState({
            pageNo: 1
        }, () => {
            let { match } = this.props
            const { name, pageNo, ha } = this.state;
            let queryObj = { pageNo, name, ha }
            this.props.history.push(`${match.url}?${stringify(queryObj)}`)
            this.getTableData()
        });
    }
    HASelectChange(value) {
        this.setState({
            ha: value
        })
    }
    getData(type, value) {  // 查询条件切换
        let { ha } = this.state
        this.setState({
            ha: type === 'HA' ? value : ha
        })
    }
    HostInputChange(e) {
        this.setState({
            name: e.target.value
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
    componentDidMount() {
        this.getTableData()
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    render() {
        const { pageSize, tableLoading, ha, name } = this.state;
        let { nodeInfo, list, subDataHA } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>AZ详情</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item>AZ管理</Breadcrumb.Item>
                            <Breadcrumb.Item>AZ详情</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
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
                            <Selector type="HA" data={subDataHA} getData={this.getData.bind(this)} value={ha} />

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
export default AzInfo;