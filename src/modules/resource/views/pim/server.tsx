import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import ServerInfo from '../../container/pim/serverInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Modal, Cascader } from 'antd';
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import FilterServerForm from '../../../../components/FilterServerForm'
const Option = Select.Option;
class Server extends React.Component<any, any> {
    formRef: any;
    constructor(props) {
        super(props);
        this.state = {
            dataSelectValue: '',
            supplierSelectValue: '1',
            visible: false,
            filterData: null

        }
    }
    getData(data) {
        // console.log(data, '=======================>data');
        this.setState({
            filterData: data
        })
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/3/server/info`)
    }
    dataSelectChange(value) {
        this.setState({
            dataSelectValue: value
        })
    }
    supplierSelectChange(value) {
        this.setState({
            supplierSelectValue: value
        })
    }
    handleClick() {
        const { dataSelectValue, supplierSelectValue } = this.state;
        // console.log(dataSelectValue, supplierSelectValue);
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            filterData: null,
        });
        this.formRef.resetForm()
    }
    addData = () => {
        this.setState({
            visible: false,
            filterData: null,
        });
        this.formRef.resetForm()
    }
    goPage = () => {
        // this.props.history.push(`/resource/pim/1/server/info`)
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    selectRow = () => { }
    renderAddData() {
        let filterDate = {
            'count': 17,
            'header': [{
                key: 'ip',
                title: '管理Ip',
            }, {
                key: 'name',
                title: '用户名',
            }, {
                key: 'password',
                title: '用户密码',
            }, {
                key: 'brand',
                title: '品牌',
            }, {
                key: 'number',
                title: '序列号'
            }, {
                key: 'status',
                title: '添加状态'
            }],
            'body': [{
                'id': '0',
                'ip': '10.4.152.2',
                'name': 'admin',
                'password': '123123',
                'brand': 'hp',
                'number': 'hhhh2',
                'status': '成功发现',
            }]
        }
        if (this.state.filterData) {
            return (
                <div style={{ padding: '20px 0 0 0', borderTop: '1px dashed #ddd', marginTop: '20px' }}>
                    <CompactTable
                        // goPage={this.goPage.bind(this)} // 翻页
                        data={filterDate}
                        actionAuth=""
                        selectAuth={true}
                        selectRow={this.selectRow.bind(this)}
                    />
                    <div className="btn" style={{ textAlign: 'right', marginTop: '20px' }}>
                        <Button type="primary" onClick={this.addData.bind(this)}>添加</Button>
                        <Button onClick={this.handleCancel} style={{ marginLeft: '10px' }}>取消</Button>
                    </div>
                </div >
            )
        } else {
            return <div />
        }

    }
    render() {
        let tdata = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '序号',
                link: true,
            }, {
                key: 'name',
                title: '服务器A',
            }, {
                key: 'assets',
                title: '1083',
            }, {
                key: 'ip',
                title: '188.103.2.123'
            }, {
                key: 'cpu',
                title: 'HPProLlant DL380'
            }, {
                key: 'suppliert',
                title: '华为'
            }, {
                key: 'equipment',
                title: '机架式服务器'
            },
            {
                key: 'distribution',
                title: '待用',
            },
            {
                key: 'power',
                title: '开机',
            }],
            'body': [
                {
                    'id': 1,
                    'name': 'D19-COMP06',
                    'assets': '0000',
                    'ip': '188.103.21',
                    'cpu': 'HPProLlant DL380',
                    'suppliert': 'HPProLlant DL380',
                    'equipment': 'HPProLlant DL380',
                    'distribution': 'HPProLlant DL380',
                    'power': 'HPProLlant DL380',
                    'action': ' ',
                },
                {
                    'id': 2,
                    'name': 'D19-COMP06',
                    'assets': '0000',
                    'ip': '188.103.21',
                    'cpu': 'HPProLlant DL380',
                    'suppliert': 'HPProLlant DL380',
                    'equipment': 'HPProLlant DL380',
                    'distribution': 'HPProLlant DL380',
                    'power': 'HPProLlant DL380',
                    'action': ' ',
                },
                {
                    'id': 3,
                    'name': 'D19-COMP06',
                    'assets': '0000',
                    'ip': '188.103.21',
                    'cpu': 'HPProLlant DL380',
                    'suppliert': 'HPProLlant DL380',
                    'equipment': 'HPProLlant DL380',
                    'distribution': 'HPProLlant DL380',
                    'power': 'HPProLlant DL380',
                    'action': ' ',
                }, {
                    'id': 4,
                    'name': 'D19-COMP06',
                    'assets': '0000',
                    'ip': '188.103.21',
                    'cpu': 'HPProLlant DL380',
                    'suppliert': 'HPProLlant DL380',
                    'equipment': 'HPProLlant DL380',
                    'distribution': 'HPProLlant DL380',
                    'power': 'HPProLlant DL380',
                    'action': ' ',
                }
                , {
                    'id': 5,
                    'name': 'D19-COMP06',
                    'assets': '0000',
                    'ip': '188.103.21',
                    'cpu': 'HPProLlant DL380',
                    'suppliert': 'HPProLlant DL380',
                    'equipment': 'HPProLlant DL380',
                    'distribution': 'HPProLlant DL380',
                    'power': 'HPProLlant DL380',
                    'action': ' ',
                }
            ]
        }

        let { match } = this.props;
        const { dataSelectValue, supplierSelectValue } = this.state;
        const DataCenter = [{
            value: '数据中心1',
            label: '数据中心1',
            children: [{
                value: '机房1',
                label: '机房1',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房2',
                label: '机房2',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房3',
                label: '机房3',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }],
        }, {
            value: '数据中心2',
            label: '数据中心2',
            children: [{
                value: '机房1',
                label: '机房1',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房2',
                label: '机房2',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房3',
                label: '机房3',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }],
        }];
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={ServerInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>服务器管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>物理部署组织</Breadcrumb.Item>
                                <Breadcrumb.Item>服务器管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Cascader
                                    value={dataSelectValue}
                                    options={DataCenter}
                                    onChange={this.dataSelectChange.bind(this)}
                                    placeholder="数据中心"
                                />
                                <Select
                                    value={supplierSelectValue}
                                    onChange={this.supplierSelectChange.bind(this)}
                                >
                                    <Option value="1">供应商</Option>
                                </Select>
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                            </Button>
                                <Button type="primary" style={{ float: 'right' }} onClick={this.showModal}>发现</Button>
                                <Modal
                                    title="发现"
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    footer={null}
                                    width="70%"
                                >
                                    <FilterServerForm
                                        wrappedComponentRef={(node) => { this.formRef = node }}
                                        getData={this.getData.bind(this)}
                                    />
                                    {this.renderAddData()}
                                </Modal>
                            </div>
                            <CompactTable
                                // goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                data={tdata}
                                actionAuth={['delete']}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Server;