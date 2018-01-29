import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import styles from './index.less';

import { Modal, Button, Checkbox, Row, Col } from 'antd';

declare let global: any;

export interface FactModalProps {
    menu?
}

/**
 * 指标添加
 * 
 * @export
 * @class FactModal
 * @extends {React.PureComponent<FactModalProps, any>}
 */

export default class FactModal extends React.PureComponent<FactModalProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    static propTypes = {
    };
    static defaultProps = {
        menu: [
            {
                name: 'content1',
                value: 'content1'
            },
            {
                name: 'content2',
                value: 'content2'
            },
            {
                name: 'content3',
                value: 'content3'
            },
            {
                name: 'content4',
                value: 'content4'
            },
            {
                name: 'content5',
                value: 'content5'
            },
        ]
    }
    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleOk() {
        this.setState({ visible: false });
    }
    handleCancel() {
        this.setState({ visible: false });
    }
    onChange(checkedValues) {
        // console.log('checked = ', checkedValues);
    }
    renderMenuItem() {
        const { menu } = this.props;
        return _.map(menu, (item) => {
            return (
                <Col span={12} style={{ marginBottom: '20px' }}>
                    <Checkbox value={item.value}>{item.name}</Checkbox>
                </Col>
            )
        })
    }
    render() {
        const { visible } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal.bind(this)}>
                    添加指标
            </Button>
                <Modal visible={visible} title="添加指标" onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)} footer={null} className={styles.modal}>

                    <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange.bind(this)}>
                        <Row>
                            <Col span={4}>选择指标：</Col>
                            <Col span={20}>
                                <Row>
                                    {/* <Col span={12}><Checkbox value="CPU使用率">CPU使用率</Checkbox></Col>
                                <Col span={12}><Checkbox value="内存使用率">内存使用率</Checkbox></Col> */}
                                    {this.renderMenuItem()}
                                </Row>

                                {/* <Row style={{ marginTop: '20px' }}>
                                <Col span={12}><Checkbox value="周平均CPU使用率">周平均CPU使用率</Checkbox></Col>
                                <Col span={12}><Checkbox value="周平均内存使用率">周平均内存使用率</Checkbox></Col>
                            </Row>
                            <Row style={{ marginTop: '20px' }}>
                                <Col span={12}><Checkbox value="周平均可用内存">周平均可用内存</Checkbox></Col>
                                <Col span={12}><Checkbox value="周平均总内存">周平均总内存</Checkbox></Col>
                            </Row>
                            <Row style={{ marginTop: '20px' }}>
                                <Col span={12}><Checkbox value="周平均网络端口发送速率">周平均网络端口发送速率</Checkbox></Col>
                                <Col span={12}><Checkbox value="周平均交换机内存利用率">周平均交换机内存利用率</Checkbox></Col>
                            </Row>
                            <Row style={{ marginTop: '20px' }}>
                                <Col span={12}><Checkbox value="网络端口接收速率">网络端口接收速率</Checkbox></Col>
                            </Row> */}
                            </Col>
                        </Row>
                    </Checkbox.Group>

                    <div className={styles.handle}>
                        <Button onClick={this.handleOk.bind(this)} type="primary">确定</Button>
                        <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}