import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Button, Spin } from 'antd';
import qs from 'querystringify'
import CompactTable from '../../../../components/CompactTable/'

class NetworkQos extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { pageNo } = qs.parse(this.props.location.search)
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
        }
    }
    handleManage() {
        let { config } = this.props
        // window.open(config.manage_link.flavor)
    }
    goPage(num) {
        this.setState({
            pageNo: num
        }, () => {
            let { match } = this.props
            let pageNo = num
            let queryObj = { pageNo }
            this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
            this.getTableData()
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
        this.props.actions.queryList('imdsVM', params_obj, () => {
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
        const { pageSize, tableLoading } = this.state;
        let { match, nodeInfo, config, list } = this.props
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
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="primary"
                            onClick={this.handleManage.bind(this)}
                        >管理</Button>
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