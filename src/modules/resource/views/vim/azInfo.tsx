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
import styles from '../../style/index.less'
const Option = Select.Option;
class AzInfo extends React.Component < any, any > {
    constructor(props) {
        super(props);
        this.state = {
            HostInputValue: '',
            AZSelectValue: 'AZ'
        }
    }
    handleClick() {
        const {HostInputValue, AZSelectValue} = this.state;
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

    render() {
        const { HostInputValue, AZSelectValue } = this.state;
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>AZ详情</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home"/></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                        <Breadcrumb.Item>AZ管理</Breadcrumb.Item>
                        <Breadcrumb.Item>AZ详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px'}}>
                    <div>
                        {this.renderTitle('基本信息')}
                        <div className={styles.nodeInfo} style={{marginBottom: '20px'}}>
                            <Row className={styles.nodeRow}>
                                <Col span={8}>HA数:&nbsp;&nbsp;12312</Col>
                                <Col span={8}>Host数:&nbsp;&nbsp;12312</Col>
                                <Col span={8}></Col>
                            </Row>
                            <Row className={styles.nodeRow}>
                                <Col span={8}>VCPU（未使用/总）:&nbsp;&nbsp;21GB/26GB</Col>
                                <Col span={8}>内存（未使用/总）:&nbsp;&nbsp;21GB/26GB</Col>
                                <Col span={8}>硬盘（未使用/总）:&nbsp;&nbsp;21GB/26GB</Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        {this.renderTitle('主机')}
                        <div className={styles.queryBar}>
                            <Input
                                value={HostInputValue}
                                type="text"
                                placeholder="主机名称"
                                onChange={this.HostInputChange.bind(this)}
                                style={{
                                width: 120,
                                
                            }}/>    
                            <Select
                                value={AZSelectValue}
                                onChange={this.AZSelectChange.bind(this)}
                                style={{width: 120, marginLeft: 10 }}>
                                <Option value="region">Region</Option>
                            </Select>
                            
                            <Button
                                type="primary"
                                style={{marginLeft: 10}}
                                onClick={this.handleClick.bind(this)}>查询
                            </Button>
                        </div>
                    </div>
                    <div>
                        table区域
                    </div>
                </div>
            </div>
        );
    }
}
export default AzInfo;