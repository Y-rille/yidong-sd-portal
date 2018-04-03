import * as React from 'react';
import * as _ from 'lodash';
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
import styles from '../../style/index.less';
import CompactTable from '../../../../components/CompactTable/'
const Option = Select.Option;
import qs from 'querystringify'

import Selector from '../../../../components/Selector'
import { ResourceActions } from '../../actions/index'
export interface HaProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    subDataRegion?,
    nodeInfo,
    list?
}

class Ha extends React.Component<HaProps, any> {
    constructor(props) {
        super(props);
        let { pageNo, region, name } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            region: region ? region : '',
            vim_id: mp_node ? mp_node.params.id : '',
            name: name ? name : '',
        }
    }
    HAInputChange(value) {
        this.setState({
            name: value
        })
    }
    handleClick() {
        let pageNo = 1
        this.setState({
            pageNo
        }, () => {
            let { match } = this.props
            let { region, name } = this.state
            let queryObj = { pageNo, region, name }
            this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
            this.getTableData()
        });
    }
    goPage(num) {
        this.setState({
            pageNo: num
        }, () => {
            let { match } = this.props
            let { region, name } = this.state
            let pageNo = num
            let queryObj = { pageNo, region, name }
            this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
            this.getTableData()
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'name') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    getData(value) {
        let { region } = this.state
        this.setState({
            region: value
        })
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let { region, pageSize, pageNo, vim_id, name } = this.state
        let params_obj = { pageNo, pageSize, region, vim_id, name }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsHA', params_obj, () => {
            this.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        this.getTableData()
    }
    componentWillUnMount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, nodeInfo, list } = this.props;
        const { name, region, pageSize, tableLoading } = this.state;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>HA管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item>HA管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Selector type="Region" data={this.props.subDataRegion} getData={this.getData.bind(this)} value={region} />
                        <Input
                            placeholder="HA名称"
                            value={name} type="text"
                            onChange={e => this.HAInputChange(e.target.value)}
                        />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                                </Button>
                    </div>
                    {list ?
                        <CompactTable
                            goPage={this.goPage.bind(this)} // 翻页
                            goLink={this.goLink.bind(this)}
                            data={list}
                            pageSize={pageSize}
                            actionAuth={[]}
                            loading={tableLoading}
                            footInfoAuth={<div>*&nbsp;HA共有{list.totalCount}个</div>}
                        /> : <Spin />}
                </div>
            </div>
        );
    }
}
export default Ha;