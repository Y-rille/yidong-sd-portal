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
    facts
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
            keyIndex: 1  // key的值，点击取消按钮默认+1 解决checkgrop 默认值不渲染的问题
        }
    }
    handleOk() {
        let { kpisValue } = this.state;
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
        let facts = this.props.facts.split(',');
        let defaultKpis = _.compact(_.map(this.kpis, (item, index) => {
            if (facts.indexOf(item.kpiId.toString()) > -1) {
                return item;
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.facts !== this.props.facts) { // 解决删除表格时 指标不重新渲染的问题
            this.setState({
                keyIndex: this.state.keyIndex + 1,
                kpisValue: nextProps.facts.split(',')
            })
        }
    }
    renderCheckGroup() {
        let defaultValue = this.getDefaultKpi()
        return (
            <Checkbox.Group key={this.state.keyIndex} style={{ width: '100%', minHeight: '100px' }} onChange={this.onChange.bind(this)} defaultValue={defaultValue}>
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
                onCancel={this.handleCancel.bind(this)} okText="确认" cancelText="取消">
                {this.renderCheckGroup()}
            </Modal>
        );
    }
}