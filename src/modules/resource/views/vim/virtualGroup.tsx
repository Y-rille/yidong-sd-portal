import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Input, Button, Spin } from 'antd';
import { matchPath } from 'react-router'
import CompactTable from '../../../../components/CompactTable/'
import Selector from '../../../../components/Selector'
import qs from 'querystringify'
import { stringify } from 'querystringify'
class VirtualGroup extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/vim/:id'
        })
        let { pageNo, project, vgname } = qs.parse(this.props.location.search)
        this.state = {
            tableLoading: false,
            pageSize: 1000,
            pageNo: pageNo ? pageNo : 1,
            project: project ? project : '',
            vgname: vgname ? vgname : '',
            vim_id: mp_node.params.id
        }
    }
    getData(type, value) {
        let { project } = this.state
        this.setState({
            project: type === 'Project' ? value : project,
        })
    }
    projectQuotaInput(value) {
        this.setState({
            vgname: value
        })
    }
    handleManage() {
        let { config } = this.props
        window.open(config.vim_manage_link.virtual_group)
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let { pageSize, pageNo, project, vgname, vim_id } = this.state
        let params_obj = { pageNo, pageSize, project, vgname, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsVmGroup', params_obj, () => {
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
            let { project, vgname } = this.state
            let pageNo = num
            let queryObj = { pageNo, project, vgname }
            this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
            this.getTableData()
        })
    }
    handleClick() {
        let { match } = this.props
        let { project, vgname } = this.state
        let pageNo = 1
        let queryObj = { pageNo, project, vgname }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData()
    }
    componentWillMount() {
        let { pageNo } = this.state
        let queryObj = {
            pageNo
        }
        this.getTableData()
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    render() {
        let { nodeInfo, config, list } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        let { pageSize, tableLoading, project, vgname } = this.state
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟机组管理</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item>虚拟机组管理</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px', height: window.innerHeight - 204 }}>
                    <div className={styles.queryBar}>
                        <Selector type="Project" data={this.props.subDataProject} getData={this.getData.bind(this)} value={project} />
                        <Input placeholder="虚拟机组名称"
                            value={vgname} type="text"
                            onChange={e => this.projectQuotaInput(e.target.value)} />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                                </Button>
                        <Button style={{ float: 'right' }}
                            type="primary"
                            onClick={this.handleManage.bind(this)}
                        >
                            管理
                            </Button>
                    </div>
                    {
                        list ? (
                            <CompactTable
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
export default VirtualGroup;