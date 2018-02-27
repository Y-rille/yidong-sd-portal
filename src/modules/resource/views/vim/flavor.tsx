import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import FlavorInfo from '../../container/vim/flavorInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
const Option = Select.Option;
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'

class Flavor extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            flavorInputValue: '',
            flavorSelectValue: 'project'
        }
    }
    flavorSelectChange(value) {
        this.setState({
            flavorSelectValue: value
        })
    }
    flavorInputChange(value) {
        this.setState({
            flavorInputValue: value
        })
    }
    handleClick() {
        const { flavorInputValue, flavorSelectValue } = this.state;
        // console.log(flavorInputValue, flavorSelectValue)
    }
    goPage() {

    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/flavor/info`)
    }
    render() {
        let { match } = this.props;
        const { flavorInputValue, flavorSelectValue } = this.state;
        let tdata = {
            'count': 17,
            'header': [{
                key: 'id',
                title: 'Flavor名称',
                link: true,
            }, {
                key: 'vCPU',
                title: 'vCPU',
            }, {
                key: 'storage',
                title: '存储（GB）',
            }, {
                key: 'hardDisk',
                title: '硬盘（GB）'
            }, {
                key: 'flashMemory',
                title: '闪存（GB）'
            }, {
                key: 'swapDisk',
                title: '交换磁盘（MB）'
            }, {
                key: 'rt',
                title: 'RX/TX规格'
            }, {
                key: 'open',
                title: '是否公开'
            }, {
                key: 'Metadata',
                title: 'Metadata'

            }],
            'body': [
                {
                    'id': 'xiaojindian',
                    'vCPU': '1',
                    'storage': '10',
                    'hardDisk': '1',
                    'flashMemory': '0',
                    'swapDisk': 'OMB',
                    'rt': '1.0',
                    'open': '是',
                    'Metadata': '是'
                },
                {
                    'id': '213cluster',
                    'vCPU': '10',
                    'storage': '10',
                    'hardDisk': '3',
                    'flashMemory': '0',
                    'swapDisk': 'OMB',
                    'rt': '1.0',
                    'open': '是',
                    'Metadata': '是'
                },
                {
                    'id': '213cluster-123',
                    'vCPU': '13',
                    'storage': '10',
                    'hardDisk': '3',
                    'flashMemory': '0',
                    'swapDisk': 'OMB',
                    'rt': '1.0',
                    'open': '是',
                    'Metadata': '是'
                },
                {
                    'id': 'lijianguo',
                    'vCPU': '13',
                    'storage': '10',
                    'hardDisk': '4',
                    'flashMemory': '0',
                    'swapDisk': 'OMB',
                    'rt': '1.0',
                    'open': '是',
                    'Metadata': '否'
                },
                {
                    'id': 'zhangjianjun',
                    'vCPU': '13',
                    'storage': '10',
                    'hardDisk': '4',
                    'flashMemory': '0',
                    'swapDisk': 'OMB',
                    'rt': '1.0',
                    'open': '是',
                    'Metadata': '是'
                },
                {
                    'id': 'lijianguo',
                    'vCPU': '13',
                    'storage': '10',
                    'hardDisk': '4',
                    'flashMemory': '0',
                    'swapDisk': 'OMB',
                    'rt': '1.0',
                    'open': '否',
                    'Metadata': '否'
                },
                {
                    'id': 'xiaojindian4',
                    'vCPU': '13',
                    'storage': '10',
                    'hardDisk': '4',
                    'flashMemory': '0',
                    'swapDisk': 'OMB',
                    'rt': '1.0',
                    'open': '是',
                    'Metadata': '是'
                },
                {
                    'id': 'lijianguo',
                    'vCPU': '13',
                    'storage': '10',
                    'hardDisk': '4',
                    'flashMemory': '0',
                    'swapDisk': 'OMB',
                    'rt': '1.0',
                    'open': '否',
                    'Metadata': '否'
                }

            ]
        }
        return (
            <Switch>
                <Route path={`${match.url}/info/:flavorId`} component={FlavorInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>Flavor管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>Flavor管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Select
                                    value={flavorSelectValue}
                                    onChange={this.flavorSelectChange.bind(this)}
                                >
                                    <Option value="project">project</Option>
                                </Select>
                                <Input
                                    placeholder="Flavor名称"
                                    value={flavorInputValue} type="text"
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
                                >管理</Button>
                            </div>
                            <CompactTable
                                goPage={this.goPage.bind(this)}
                                goLink={this.goLink.bind(this)}
                                data={tdata}
                                pageAuth={true}
                                actionAuth={[]}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Flavor;