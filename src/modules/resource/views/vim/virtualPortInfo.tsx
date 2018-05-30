import * as React from 'react';
import * as _ from 'lodash';
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, Spin } from 'antd';
import Selector from '../../../../components/Selector'
import CompactTable from '../../../../components/CompactTable/'
import Headline from '../../../../components/Headline/'
import Summaries from '../../../../components/Summaries/'
import styles from '../../style/index.less'
import { ResourceActions } from '../../actions/index'
import qs from 'querystringify'
import { stringify } from 'querystringify'

export interface VirtualPortInfoProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    summary,
    nodeInfo?
}
class VirtualPortInfo extends React.Component<VirtualPortInfoProps, any> {
    constructor(props) {
        super(props);
        let { vim_id } = qs.parse(this.props.location.search)
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
        let path = this.props.location.pathname.replace(/\/port\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    componentWillMount() {
        let host = this.props.match.params.id
        this.props.actions.getSummary('imdsHostOverview', { host: host }, null)
    }
    componentWillUnmount() {
        this.props.actions.resetSummary();
    }
    render() {
        let { nodeInfo, summary } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟端口详情</h1>
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
                            <Breadcrumb.Item>虚拟端口详情</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '0 20px 20px 20px' }}>
                    <div>
                        <Headline title="基本信息" />
                        {summary ?
                            (<div>
                                <Summaries
                                    data={summary}
                                    colNum={3} />
                                {/*  <Headline title="DNS地址" />
                               <Summaries
                                    data={summary}
                                    colNum={1} />
                                <Headline title="静态路由" />
                                <Summaries
                                    data={summary}
                                    colNum={1} /> */}
                            </div>)
                            : ''}
                    </div>

                </div>
            </div>
        );
    }
}
export default VirtualPortInfo;