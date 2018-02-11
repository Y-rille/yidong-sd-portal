import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import HaInfo from '../../container/vim/haInfo'
import AzInfo from '../../container/vim/azInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
import styles from '../../style/index.less';
import CompactTable from '../../../../components/CompactTable/'
const Option = Select.Option;
class Ha extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            HAInputValue: '',
            HASelectValue: 'region'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/ha/info`)
    }
    HASelectChange(value) {
        this.setState({
            HASelectValue: value
        })
    }
    HAInputChange(value) {
        this.setState({
            HAInputValue: value
        })
    }
    handleClick() {
        const { HAInputValue, HASelectValue } = this.state;
        // console.log(HAInputValue, HASelectValue)
    }
    goPage() {

    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    render() {
        let { match } = this.props;
        const { HAInputValue, HASelectValue } = this.state;
        let tdata = {
            'count': 17,
            'header': [{
                key: 'id',
                title: 'HA名称',
                // fixed: true,
                link: true,
            }, {
                key: 'name',
                title: 'Metadata',
                // fixed: true,
            }, {
                key: 'mobile',
                title: '所属AZ',
            }, {
                key: 'vm',
                title: '主机数'
                }
            ],
            'body': [
                {
                    'id': 'xiaojindian1',
                    'name': 'availability_zone = hw-volte-test-px1',
                    'mobile': 'XXXX',
                    'vm': '15',
                },
                {
                    'id': 'xiaojindian2',
                    'name': 'availability_zone = hw-volte-test-px1',
                    'mobile': 'XXXX',
                    'vm': '15',
                },
                {
                    'id': 'xiaojindian3',
                    'name': 'availability_zone = hw-volte-test-px1',
                    'mobile': 'XXXX',
                    'vm': '15',
                },
                {
                    'id': 'xiaojindian4',
                    'name': 'availability_zone = hw-volte-test-px1',
                    'mobile': 'XXXX',
                    'vm': '15',
                },
                {
                    'id': 'xiaojindian5',
                    'name': 'availability_zone = hw-volte-test-px1',
                    'mobile': 'XXXX',
                    'vm': '15',
                },
                {
                    'id': 'xiaojindian6',
                    'name': 'availability_zone = hw-volte-test-px1',
                    'mobile': 'XXXX',
                    'vm': '15',
                },
                {
                    'id': 'xiaojindian7',
                    'name': 'availability_zone = hw-volte-test-px1',
                    'mobile': 'XXXX',
                    'vm': '15',
                },
                {
                    'id': 'xiaojindian8',
                    'name': 'availability_zone = hw-volte-test-px1',
                    'mobile': 'XXXX',
                    'vm': '15',
                },
            ]
        }
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={AzInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>HA管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>HA管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Select
                                    value={HASelectValue}
                                    onChange={this.HASelectChange.bind(this)}
                                >
                                    <Option value="region">Region</Option>
                                </Select>
                                <Input
                                    placeholder="HA名称"
                                    value={HAInputValue} type="text"
                                    onChange={e => this.HAInputChange(e.target.value)}
                                />
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                            </Button>
                            </div>
                            <CompactTable
                                goPage={this.goPage.bind(this)} // 翻页
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
export default Ha;