import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Button, Input, Spin } from 'antd';
import { matchPath } from 'react-router'
import CompactTable from '../../../../components/CompactTable/'
import Selector from '../../../../components/Selector'
import qs from 'querystringify'
import { stringify } from 'querystringify'
class VirtualFirewall extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/vim/:id'
        })
        let { pageNo, project, name } = qs.parse(this.props.location.search)
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            project: project ? project : '',
            name: name ? name : '',
            vim_id: mp_node.params.id
        }
    }
    getData(type, value) {
        let { project } = this.state
        this.setState({
            project: type === 'Project' ? value : project,
        })
    }
    virtualFirewallInput(value) {
        this.setState({
            name: value
        })
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let { pageSize, pageNo, project, name, vim_id } = this.state
        let params_obj = { pageNo, pageSize, project, name, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsVirtualFirewall', params_obj, () => {
            this.setState({
                tableLoading: false
            });
        })
    }
    goPage = (num) => {
        this.setState({
            pageNo: num
        }, () => {
            let { match } = this.props
            let { project, name } = this.state
            let pageNo = num
            let queryObj = { pageNo, project, name }
            this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
            this.getTableData()
        })
    }
    handleClick() {
        let { match } = this.props
        let { project, name } = this.state
        let pageNo = 1
        let queryObj = { pageNo, project, name }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData()
    }
    componentWillMount() {
        this.getTableData()
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, nodeInfo, list } = this.props
        let { pageSize, tableLoading, project, name } = this.state
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟防火墙管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item>虚拟防火墙管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Selector type="Project" data={this.props.subDataProject} getData={this.getData.bind(this)} value={project} />
                        <Input placeholder="虚拟防火墙名称"
                            value={name} type="text"
                            onChange={e => this.virtualFirewallInput(e.target.value)} />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                                </Button>
                    </div>
                    {
                        list ? (
                            <CompactTable
                                outStyle={{ marginTop: '20px' }}
                                goPage={this.goPage.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                actionAuth={[]}
                                size={{ y: list.totalCount > pageSize ? window.innerHeight - 368 : window.innerHeight - 334 }}
                            />) : (
                                <Spin />
                            )
                    }
                </div>
            </div>
        );
    }
}
export default VirtualFirewall;