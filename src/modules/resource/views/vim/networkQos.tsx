import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Input, Button, Spin } from 'antd';
import CompactTable from '../../../../components/CompactTable/'
import Selector from '../../../../components/Selector'
import qs from 'querystringify'
import { stringify } from 'querystringify'
class NetworkQos extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { pageNo, project, name } = qs.parse(this.props.location.search)
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            project: project ? project : '',
            name: name ? name : '',
        }
    }
    getData(type, value) {
        let { project } = this.state
        this.setState({
            project: type === 'Project' ? value : project,
        })
    }
    networkQosInput(value) {
        this.setState({
            name: value
        })
    }
    handleManage() {
        let { config } = this.props
        // window.open(config.manage_link.flavor)
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let { project, pageSize, pageNo, vim_id, name } = this.state
        let params_obj = { pageNo, pageSize, project, vim_id, name }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsNetworkQos', params_obj, () => {
            this.setState({
                tableLoading: false
            });
        })
    }
    goPage(num) {
        this.setState({
            pageNo: num
        }, () => {
            let { match } = this.props
            let { project, name, vim_id } = this.state
            let pageNo = num
            let queryObj = { pageNo, project, name, vim_id }
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
    componentWillUnMount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, nodeInfo, config, list } = this.props
        let { pageSize, tableLoading, project, name } = this.state
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>网络QOS管理</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item>网络QOS管理</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                {/* <div style={{ padding: '20px', height: window.innerHeight - 204 }}>
                    <iframe src={`${config.vim_manage_link.network_qos}`} style={{ width: '100%', height: '100%', border: '1px solid #e2e4e9' }}></iframe>
                </div> */}
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Selector type="Project" data={this.props.subDataProject} getData={this.getData.bind(this)} value={project} />
                        <Input placeholder="网络QOS名称"
                            value={name} type="text"
                            onChange={e => this.networkQosInput(e.target.value)} />
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
                                outStyle={{ marginTop: '20px' }}
                                goPage={this.goPage.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                actionAuth={[]}
                                size={{ y: list.totalCount > pageSize ? window.innerHeight - 386 : window.innerHeight - 333 }}
                            />
                        ) : (
                                <Spin />
                            )
                    }
                </div>
            </div>
        );
    }
}
export default NetworkQos;