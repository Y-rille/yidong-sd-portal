import * as React from 'react';
import * as _ from 'lodash';
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, Spin } from 'antd';
import Selector from '../../../../components/Selector'
import CompactTable from '../../../../components/CompactTable/'
import styles from '../../style/index.less'
import { ResourceActions } from '../../actions/index'
import qs from 'querystringify'
import { stringify } from 'querystringify'
import Headline from '../../../../components/Headline/'
import Summaries from '../../../../components/Summaries/'
export interface VirtualSubnetInfoProps {
    location
    history
    match
    actions: ResourceActions
    summary
    nodeInfo
}
class VirtualSubnetInfo extends React.Component<VirtualSubnetInfoProps, any> {
    constructor(props) {
        super(props);
        let { pageNo, project, vim_id, name, vnGroup } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        this.state = {
            vim_id: mp_node ? mp_node.params.id : '',
        }
    }

    goList() {
        let path = this.props.location.pathname.replace(/\/info\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    goInfo() {
        let path = this.props.location.pathname.replace(/\/subnet\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    componentWillMount() {
        let virtualSubnet = this.props.match.params.id
        this.props.actions.getSummary('imdsVirtualSubnetDetail', { virtualSubnet: virtualSubnet }, null)
    }
    componentWillUnmount() {
        this.props.actions.resetSummary();
    }
    render() {
        let { nodeInfo, summary } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        let summary1 = {
            header: [],
            dataList: []
        }
        let summaryDns = {
            header: [],
            dataList: []
        }
        let summaryRoute = {
            header: [],
            dataList: []
        }
        if (summary) {
            let header = summary.header
            let val = _.head(summary.dataList)
            let objdns = _.find(header, ['key', 'dns'])
            let objroute = _.find(header, ['key', 'route'])
            summary1.header = _.difference(header, [objdns, objroute])
            summaryDns.header.push(objdns)
            summaryRoute.header.push(objroute)
            _.forIn(val, (value, key) => {
                switch (key) {
                    case 'dns':
                        summaryDns.dataList.push({ 'dns': value })
                        break;
                    case 'route':
                        summaryRoute.dataList.push({ 'route': value })
                        break;
                    default: summary1.dataList.push(_.omit(val, ['dns', 'route']))
                        break;
                }
            })
        }

        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟子网详情</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item><a onClick={this.goList.bind(this)}>虚拟网络管理</a></Breadcrumb.Item>
                            <Breadcrumb.Item><a onClick={this.goInfo.bind(this)}>虚拟网络详情</a></Breadcrumb.Item>
                            <Breadcrumb.Item>虚拟子网详情</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '0 20px 20px 20px' }}>
                    <div>
                        <Headline title="基本信息" />
                        {summary ?
                            (<div>
                                <Summaries
                                    data={summary1}
                                    colNum={3} />
                                <Headline title="DNS地址" />
                                <Summaries
                                    data={summaryDns}
                                    colNum={1} />
                                <Headline title="静态路由" />
                                <Summaries
                                    data={summaryRoute}
                                    colNum={1} />
                            </div>)
                            : ''}
                    </div>

                </div>
            </div>
        );
    }
}
export default VirtualSubnetInfo;