import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import styles from './index.less';
import { Modal, Button, Checkbox, Row, Col } from 'antd';

declare let global: any;

export interface FactModalProps {
    kpis?
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
    kpis
    constructor(props) {
        super(props);
        this.state = {
            kpisValue: [], // onchange checkgroup 选中的值
            keyIndex: 0  // key的值，点击取消按钮默认+1 解决checkgrop 默认值不渲染的问题
        }
    }
    handleOk() {
        let { kpisValue } = this.state;
        _.map(this.kpis, (item) => {
            if (kpisValue.indexOf(item.kpiId) > -1) {
                item.active = true;
            } else {
                item.active = false;
            }
        })
        this.props.handleOk(kpisValue);
    }
    handleCancel() {
        this.props.handleCancel();
        this.setState({
            keyIndex: this.state.keyIndex + 1
        })

    }
    onChange(e) {
        this.setState({
            kpisValue: e
        })
    }
    getDefaultKpi() {
        let defaultKpis = _.compact(_.map(this.kpis, (item, index) => {
            if (!item.hasOwnProperty('active')) {
                item.active = false;
                if (index < 4) {
                    item.active = true;
                    return item;
                }
            } else {
                if (item.active) {
                    return item
                }
            }
        }))
        let defaultValue = _.map(defaultKpis, (item) => {
            return item.kpiId;
        })
        return defaultValue
    }
    componentWillMount() {
        this.kpis = _.merge({}, this.props.kpis)
    }
    componentDidMount() {
        this.setState({
            kpisValue: this.getDefaultKpi()
        })
    }
    renderCheckGroup() {
        let defaultValue = this.getDefaultKpi()

        return (
            <Checkbox.Group key={this.state.keyIndex} style={{ width: '100%' }} onChange={this.onChange.bind(this)} defaultValue={defaultValue}>
                <Row>
                    <Col span={4}>选择指标：</Col>
                    <Col span={20}>
                        <Row>
                            {this.renderMenuItem()}
                        </Row>
                    </Col>
                </Row>
            </Checkbox.Group>

        )
    }
    renderMenuItem() {
        return _.map(this.kpis, (item) => {
            return (
                <Col span={12} className={styles.col}>
                    <Checkbox value={item.kpiId}>{item.kpiRealName}</Checkbox>
                </Col>
            )
        })
    }
    render() {
        const { visible } = this.props;
        return (
            <Modal visible={visible} title="添加指标" onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)} footer={null}>
                {this.renderCheckGroup()}
                < div className={styles.handle}>
                    <Button onClick={this.handleOk.bind(this)} type="primary">确定</Button>
                    <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                </div>
            </Modal>
        );
    }
}