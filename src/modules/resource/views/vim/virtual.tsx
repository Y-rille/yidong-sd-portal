import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import VirtualInfo from '../../container/vim/virtualInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select } from 'antd';
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
const Option = Select.Option;
import Selector from '../../../../components/Selector'
import { stringify } from 'querystringify'
import qs from 'querystringify'
class Virtual extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { pageNo, region, az, ha, host } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        this.state = {
            tableLoading: false,
            pageSize: 1,
            pageNo: pageNo ? pageNo : 1,
            region: region ? region : '',
            az: az ? az : '',
            ha: ha ? ha : '',
            host: host ? host : '',
            vim_id: mp_node.params.id ? mp_node.params.id : ''
        }
    }
    getData(type, value) {
        let { region, az, ha, host } = this.state
        this.setState({
            region: type === 'Region' ? value : region,
            az: type === 'AZ' ? value : az,
            ha: type === 'HA' ? value : ha,
            host: type === 'Host' ? value : host
        })
    }
    handleClick() {
        let { match } = this.props
        let pageNo = 1
        let { region, az, ha, host, vim_id } = this.state
        let queryObj = { pageNo, region, az, ha, host, vim_id }
        this.props.history.push(`${match.url}/imdsVM?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
    }
    goPage = (num) => {
        let { match } = this.props
        let { region, az, ha, host, vim_id } = this.state
        let pageNo = num
        let queryObj = { pageNo, region, az, ha, vim_id }
        this.props.history.push(`${match.url}/imdsVM?${stringify(queryObj)}`)
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
        let { region, az, ha, host, pageSize, vim_id } = this.state
        this.props.actions.queryList('imdsVM', { pageNo, pageSize, region, az, ha, host, vim_id }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    render() {
        let { match, nodeInfo, list } = this.props;
        const { region, az, ha, host, pageSize, tableLoading } = this.state;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={VirtualInfo} />
                <Route render={() => (
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
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                            </Button>
                            </div>
                            <CompactTable
                                outStyle={{ marginTop: '20px' }}
                                goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                // pageAuth={true}
                                actionAuth={[]}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Virtual;