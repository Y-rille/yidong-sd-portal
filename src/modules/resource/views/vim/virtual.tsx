import * as React from 'react';
import * as _ from 'lodash';
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, Spin, Select } from 'antd';
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
const Option = Select.Option;
import Selector from '../../../../components/Selector'
import qs from 'querystringify'

class Virtual extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { pageNo, region, az, ha, host, vmGroup } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            region: region ? region : '',
            az: az ? az : '',
            ha: ha ? ha : '',
            host: host ? host : '',
            vmGroup: vmGroup ? vmGroup : '',
            vim_id: mp_node.params.id ? mp_node.params.id : ''
        }
    }
    getData(type, value) {
        let { region, az, ha, host } = this.state
        this.setState({
            region: type === 'Region' ? value : region,
            az: type === 'AZ' ? value : az,
            ha: type === 'HA' ? value : ha,
            host: type === 'Host' ? value : host,
        })
    }
    vmGroupInputChange(value) {
        this.setState({
            vmGroup: value
        })
    }
    handleClick() {
        let { match } = this.props
        let pageNo = 1
        let { region, az, ha, host, vmGroup } = this.state
        let queryObj = { pageNo, region, az, ha, host, vmGroup }
        this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
    }
    goPage = (num) => {
        let { match } = this.props
        let { region, az, ha, host, vmGroup } = this.state
        let pageNo = num
        let queryObj = { pageNo, region, az, ha, host, vmGroup }
        this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { region, az, ha, host, vmGroup, pageSize, vim_id } = this.state
        let params_obj = { pageNo, pageSize, region, az, ha, host, vmGroup, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsVM', params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    goLink(key, obj) {
        let { match } = this.props;
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        let vimId = mp_node.params.id
        if (key === 'name') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        } else if (key === 'cHost') {
            this.props.history.push(`/resource/vim/${vimId}/host/${obj.host_type}/info/${obj.id}?name=${obj.name}`)
        }
    }
    componentWillMount() {
        let { pathname } = this.props.location
        let { pageNo } = this.state
        let queryObj = {
            pageNo
        }
        this.getTableData(queryObj)
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, nodeInfo, list } = this.props;
        const { region, az, ha, host, vmGroup, pageSize, tableLoading } = this.state;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟机管理</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item>虚拟机管理</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Selector type="Region" data={this.props.subDataRegion} getData={this.getData.bind(this)} value={region} />
                        <Selector type="AZ" data={this.props.subDataAZ} getData={this.getData.bind(this)} value={az} />
                        <Selector type="HA" data={this.props.subDataHA} getData={this.getData.bind(this)} value={ha} />
                        <Selector type="Host" data={this.props.subDataHost} getData={this.getData.bind(this)} value={host} />
                        <Input
                            placeholder="虚拟机组名称"
                            value={vmGroup} type="text"
                            onChange={e => this.vmGroupInputChange(e.target.value)}
                        />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                            </Button>
                    </div>{
                        list ? (
                            <CompactTable
                                goPage={this.goPage.bind(this)}
                                goLink={this.goLink.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                footInfoAuth={<div>*&nbsp;虚拟机共有{list.totalCount}个</div>}
                                size={{ y: list.totalCount > pageSize ? window.innerHeight - 386 : window.innerHeight - 380 }}
                            />) : (
                                <Spin />
                            )
                    }
                </div>
            </div>
        );
    }
}
export default Virtual;