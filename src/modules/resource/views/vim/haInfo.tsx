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
        let { pageNo, vim_id, name, az } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/:type/:id'
        })
        this.state = {
            tableLoading: false,
            pageSize: 10,
            az: az ? az : '',
            pageNo: pageNo ? pageNo : 1,
            vim_id: mp_node.params.id,
            ha_id: this.props.match.params.id,
            name: name ? name : '',
        }
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { name, pageSize, vim_id, pageNo, az, ha_id } = this.state
        this.props.actions.queryList('imdsHAHost', { pageNo, pageSize, name, vim_id, az, ha_id }, () => {
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
            const { name, pageNo, az } = this.state;
            let queryObj = { pageNo, name, az }
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
    goList() {
        let path = this.props.location.pathname.replace(/\/info\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    componentDidMount() {
        this.getTableData()
    }
    componentWillUnmount() {
        this.props.actions.resetList();
        this.props.actions.resetSummary();
    }
    renderTitle = (title) => {
        return (
            <div className={styles.nodeTitle}>
                <span className={styles.nodeTitle1}></span>
                <span className={styles.nodeTitle2}>{title}</span>
            </div>
        )
    }
    componentWillMount() {
        let ha_id = this.props.match.params.id
        this.props.actions.getSummary('imdsHAInfo', { ha_id: ha_id });
    }
    render() {
        const { pageSize, tableLoading, az, name } = this.state;
        let { nodeInfo, list, subDataAZ, summary } = this.props;
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
                        <Breadcrumb.Item><a onClick={this.goList.bind(this)}>HA管理</a></Breadcrumb.Item>
                        <Breadcrumb.Item>HA详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '0 20px 20px 20px' }}>
                    <div>
                        <Headline title="系统信息" />
                        {summary ? <Summaries
                            data={summary}
                            colNum={3} /> : ''}
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
                        goPage={this.goPage.bind(this)}
                        data={list}
                        pageSize={pageSize}
                        loading={tableLoading}
                    />

                </div>
            </div>
        );
    }
}
export default HaInfo;