import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import styles from './index.less';
import { Modal, Button, Checkbox, Row, Col } from 'antd';

declare let global: any;

export interface FactModalProps {
    menu?
    visible
    handleOk
    handleCancel
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
    handleOk() {
        this.props.handleOk();
    }
    handleCancel() {
        this.props.handleCancel();
    }
    onChange(checkedValues) {
    }
    renderMenuItem() {
        const { menu } = this.props;
        return _.map(menu, (item) => {
            return (
                <Col span={12} className={styles.col}>
                    <Checkbox value={item.value}>{item.name}</Checkbox>
                </Col>
            )
        })
    }
    render() {
        const { visible } = this.props
        return (
            <div>
                <Modal visible={visible} title="添加指标" onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)} footer={null} className={styles.modal}>

                    <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange.bind(this)}>
                        <Row>
                            <Col span={4}>选择指标：</Col>
                            <Col span={20}>
                                <Row>
                                    {this.renderMenuItem()}
                                </Row>
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