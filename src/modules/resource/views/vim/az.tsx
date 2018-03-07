import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import AzInfo from '../../container/vim/azInfo'
import CompactTable from '../../../../components/CompactTable'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
import styles from '../../style/index.less'
const Option = Select.Option;
import qs from 'querystringify'
import { stringify } from 'querystringify'
import Selector from '../../../../components/Selector'
import { ResourceActions } from '../../actions/index'
export interface AzProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    subDataRegion?,
    nodeInfo,
    list?
}
class Az extends React.Component<AzProps, any> {
    constructor(props) {
        super(props);
        let { pageNo, region, name } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/:type/:id'
        })
        this.state = {
            region: region ? region : '',
            name: name ? name : '',
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            vim_id: mp_node.params.id
        }
    }
    AZInputChange(value) {
        this.setState({
            name: value
        })
    }
    handleClick() {
        this.setState({
            pageNo: 1
        }, () => {
            let { match } = this.props
            const { region, name, pageNo } = this.state;
            let queryObj = { pageNo, region, name }
            this.props.history.push(`${match.url}?${stringify(queryObj)}`)
            this.getTableData()
        });

    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    goPage = (num) => {
        let { match } = this.props
        let { region, name } = this.state
        let pageNo = num
        this.setState({
            pageNo: num
        }, () => {
            this.getTableData()
            let queryObj = { pageNo, region, name }
            this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        })
    }

    getData(type, value) {  // 查询条件切换
        let { region } = this.state
        this.setState({
            region: type === 'Region' ? value : region
        })
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { region, name, pageSize, vim_id, pageNo } = this.state
        this.props.actions.queryList('imdsAZ', { pageNo, pageSize, region, name, vim_id }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    componentDidMount() {
        this.getTableData()
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, nodeInfo, list } = this.props;
        const { name, tableLoading, pageSize, region } = this.state;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <Switch>
                    <Route path={`${match.url}/info/:azId`} component={AzInfo} />
                    <Route render={() => (
                        <div>
                            <div className={styles.header}>
                                <h1 className={styles.title}>AZ管理</h1>
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
                                    </Breadcrumb>
                                ) : ''}
                            </div>
                            <div style={{ padding: '20px' }}>
                                <div className={styles.queryBar}>
                                    <Selector type="Region" data={this.props.subDataRegion} getData={this.getData.bind(this)} value={region} />
                                    <Input
                                        placeholder="AZ名称"
                                        value={name} type="text"
                                        onChange={e => this.AZInputChange(e.target.value)}
                                    />
                                    <Button
                                        type="primary"
                                        onClick={this.handleClick.bind(this)}
                                    >
                                        查询
                                    </Button>
                                </div>

                                {
                                    this.props.list ? (
                                        <CompactTable
                                            goPage={this.goPage.bind(this)} // 翻页
                                            goLink={this.goLink.bind(this)}
                                            data={list}
                                            actionAuth={[]}
                                            pageSize={pageSize}
                                            loading={tableLoading}
                                            outStyle={{ 'marginTop': '20px' }}
                                        />
                                    ) : (
                                            <Spin />
                                        )
                                }
                            </div>
                        </div>
                    )} />
                </Switch>
            </div>
        );
    }
}
export default Az;