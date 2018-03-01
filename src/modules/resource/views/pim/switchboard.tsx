import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SwitchboardInfo from '../../container/pim/switchboardInfo'
import CompactTable from '../../../../components/CompactTable'
import FilterSwitchBoardForm from '../../../../components/FilterSwitchBoardForm'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Cascader, Input, Modal } from 'antd';
import styles from '../../style/index.less'

class Switchboard extends React.Component<any, any> {
    formRef: any;
    constructor(props) {
        super(props);
        this.state = {
            dataValue: ['数据中心'],
            nameValue: '',
            visible: false,
            dataVisible: false
        };
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/1/switchboard/info`)
    }
    onDataChange(value) {
        this.setState({
            dataValue: value
        })
    }
    onNameChange(value) {
        this.setState({
            nameValue: value
        })
    }
    handleClick() {
        const { dataValue, nameValue } = this.state;
        // console.log(dataValue, nameValue)
    }
    goPage = () => {

    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            dataVisible: false
        });
        this.formRef.handleReset()
    }
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
                title: '型号'
            }, {
                key: 'status',
                title: '添加状态'
            }],
            'body': [{
                'id': '0',
                'ip': '10.4.152.60',
                'name': 'admin',
                'password': 'xiaojindian4@1234',
                'brand': 'hp',
                'number': '6cu611xd9v',
                'status': '成功发现',
            }]
        }
        const { dataVisible } = this.state;
        if (dataVisible === true) {
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
            return null;
        }

    }
    selectRow = () => { }
    addData = () => {
        this.setState({
            visible: false,
        });
        this.formRef.handleReset()
    }
    getData(data) {
        this.setState({
            dataVisible: true
        })
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
                title: '磁阵名称',
            }, {
                key: 'mobile',
                title: '资产编号',
            }, {
                key: 'ip',
                title: '管理IP'
            },
            {
                key: 'email',
                title: '设备类型',
            }, {
                key: 'cpu',
                title: '型号'
            }],
            'body': [
                {
                    'id': 1,
                    'name': 'D19-COMP06',
                    'mobile': '0000',
                    'ip': '188.103.21',
                    'email': '123124124214214',
                    'cpu': 'HPProLlant DL380',
                }, {
                    'id': 2,
                    'name': 'D19-COMP06',
                    'mobile': '0000',
                    'ip': '188.103.21',
                    'email': '123124124214214',
                    'cpu': 'HPProLlant DL380',
                }, {
                    'id': 3,
                    'name': 'D19-COMP06',
                    'mobile': '0000',
                    'ip': '188.103.21',
                    'email': '123124124214214',
                    'cpu': 'HPProLlant DL380',
                }, {
                    'id': 4,
                    'name': 'D19-COMP06',
                    'mobile': '0000',
                    'ip': '188.103.21',
                    'email': '123124124214214',
                    'cpu': 'HPProLlant DL380',
                }, {
                    'id': 5,
                    'name': 'D19-COMP06',
                    'mobile': '0000',
                    'ip': '188.103.21',
                    'email': '123124124214214',
                    'cpu': 'HPProLlant DL380',
                }, {
                    'id': 6,
                    'name': 'D19-COMP06',
                    'mobile': '0000',
                    'ip': '188.103.21',
                    'email': '123124124214214',
                    'cpu': 'HPProLlant DL380',
                }, {
                    'id': 7,
                    'name': 'D19-COMP06',
                    'mobile': '0000',
                    'ip': '188.103.21',
                    'email': '123124124214214',
                    'cpu': 'HPProLlant DL380',
                }
            ]
        }
        let { match } = this.props;
        const { dataValue, nameValue } = this.state;
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
                <Route path={`${match.url}/info/:id`} component={SwitchboardInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>交换机管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>物理部署组织</Breadcrumb.Item>
                                <Breadcrumb.Item>交换机管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Cascader
                                    options={DataCenter}
                                    onChange={this.onDataChange.bind(this)}
                                    placeholder={dataValue}
                                />
                                <Input
                                    placeholder="名称，编号"
                                    value={nameValue} type="text"
                                    onChange={this.onNameChange.bind(this)}
                                />
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
                                    <FilterSwitchBoardForm getData={this.getData.bind(this)} wrappedComponentRef={(node) => { this.formRef = node }} />
                                    {this.renderAddData()}
                                </Modal>
                            </div>
                            <CompactTable
                                outStyle={{ marginTop: '20px' }}
                                goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                data={tdata}
                                pageAuth={true}
                                actionAuth={['delete']}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Switchboard;