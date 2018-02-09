import * as React from 'react';
import * as _ from 'lodash';
import {
    Breadcrumb,
    Icon,
    Tabs,
    Row,
    Col,
    Select,
    Button,
    Input
} from 'antd';
import CompactTable from '../../../../components/CompactTable/'
import Headline from '../../../../components/Headline/'
import Summaries from '../../../../components/Summaries/'
import styles from '../../style/index.less'
const Option = Select.Option;
class AzInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            HostInputValue: '',
            AZSelectValue: 'AZ'
        }
    }
    handleClick() {
        const { HostInputValue, AZSelectValue } = this.state;
        // console.log(HostInputValue, AZSelectValue)
    }
    AZSelectChange(value) {
        this.setState({
            AZSelectValue: value
        })
    }
    HostInputChange(e) {
        this.setState({
            HostInputValue: e.target.value
        })
    }
    renderTitle = (title) => {
        return (
            <div className={styles.nodeTitle}>
                <span className={styles.nodeTitle1}></span>
                <span className={styles.nodeTitle2}>{title}</span>
            </div>
        )
    }
    goPage() { }
    render() {
        const { HostInputValue, AZSelectValue } = this.state;
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>AZ详情</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                        <Breadcrumb.Item>AZ管理</Breadcrumb.Item>
                        <Breadcrumb.Item>AZ详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <div>
                        <Headline title="系统信息" />
                        <Summaries colNum={5} />
                        <Headline title="主机" />
                        <div className={styles.queryBar}>
                            <Input
                                value={HostInputValue}
                                type="text"
                                placeholder="主机名称"
                                onChange={this.HostInputChange.bind(this)}
                            />
                            <Select
                                value={AZSelectValue}
                                onChange={this.AZSelectChange.bind(this)}
                            >
                                <Option value="region">Region</Option>
                            </Select>

                            <Button
                                type="primary"
                                onClick={this.handleClick.bind(this)}>查询
                            </Button>
                        </div>
                    </div>

                    <div>
                        <CompactTable
                            goPage={this.goPage.bind(this)} // 翻页
                            // goLink={this.goLink.bind(this)}
                            // data={null}
                            actionAuth={[]}
                            pageAuth={true}
                            footInfoAuth={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default AzInfo;