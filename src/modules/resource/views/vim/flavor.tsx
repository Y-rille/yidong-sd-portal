import * as React from 'react';
import * as _ from 'lodash';
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
const Option = Select.Option;
import qs from 'querystringify'
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import Selector from '../../../../components/Selector'

class Flavor extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pathname } = this.props.location
        let { pageNo, project, name } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/vim/:id'
        })
        this.state = {
            name: name ? name : '',
            tableLoading: false,
            pageSize: 1000,
            pageNo: pageNo ? pageNo : 1,
            project: project ? project : '',
            vim_id: mp_node.params.id
        }

    }
    getData(type, value) {
        let { project } = this.state
        this.setState({
            project: type === 'Project' ? value : project,
        })
    }
    flavorInputChange(value) {
        this.setState({
            name: value
        })
    }
    handleClick() {
        let { match } = this.props
        let pageNo = 1
        let { project, name } = this.state
        let queryObj = { pageNo, project, name }
        this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData({ pageNo })

    }
    goPage(num) {
        let { match } = this.props
        let { project, name } = this.state
        let pageNo = num
        let queryObj = { pageNo, project, name: name }
        this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'name') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { project, pageSize, activeKey, name, vim_id } = this.state
        let params_obj = { pageNo, pageSize, project, name, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsFlavor', params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    handleManage() {
        let { config } = this.props
        window.open(config.vim_manage_link.flavor)
    }
    componentWillMount() {
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
        let { match, nodeInfo, list, subDataProject } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        const { name, project, pageSize, tableLoading } = this.state;
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>Flavor管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item>Flavor管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Selector type="Project" data={subDataProject} getData={this.getData.bind(this)} value={project} />
                        <Input
                            placeholder="Flavor名称"
                            value={name} type="text"
                            onChange={e => this.flavorInputChange(e.target.value)}
                        />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                                 </Button>
                        <Button
                            type="primary"
                            style={{ 'float': 'right' }}
                            onClick={this.handleManage.bind(this)}
                        >管理</Button>
                    </div>
                    {
                        list ? (
                            <CompactTable
                                goPage={this.goPage.bind(this)}
                                goLink={this.goLink.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                size={{ y: list.totalCount > pageSize ? window.innerHeight - 368 : window.innerHeight - 340 }}
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
export default Flavor;