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
    constructor(props) {
        super(props);
        this.state = {
            kpisValue: [],
            defaultKpisValue: [],
            keyIndex: 0
        }
    }
    static propTypes = {
    };
    static defaultProps = {
    }
    handleOk() {
        let kpisValue = this.state.kpisValue;
        let kpis = this.props.kpis;
        _.map(kpis, (item) => {
            if (kpisValue.indexOf(item.kpiId) > -1) {
                item.active = true;
            } else {
                item.active = false;
            }
        })
        this.props.handleOk(this.state.kpisValue);
    }
    handleCancel() {
        this.setState({
            kpisValue: this.state.defaultKpisValue,
            keyIndex: this.state.keyIndex + 1
        })
        this.props.handleCancel();
    }
    onChange(e) {
        this.setState({
            kpisValue: e
        })
    }
    renderMenuItem() {
        const { kpis } = this.props;
        // console.log(kpis, '00000');
        // console.log(this.state.kpisValue, 'nnmmnnmm');
        // let arr = _.map(menus, (item) => {
        //     if (item.active) {
        //         return item;
        //     }
        // })
        // this.setState({
        //     defaultMenuValue: arr
        // })
        return _.map(this.props.kpis, (item) => {
            return (
                <Col span={12} className={styles.col}>
                    <Checkbox value={item.kpiId}>{item.kpiRealName}</Checkbox>
                </Col>
            )
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.kpis) {
            this.defaultKpisHandler(nextProps.kpis);
        }
    }
    defaultKpisHandler(kpis) {
        let defaultKpis = _.compact(_.map(kpis, (item, index) => {
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
        this.setState({
            defaultKpisValue: defaultValue
        })
    }
    renderCheckGroup() {
        return (
            <Checkbox.Group key={this.state.keyIndex} style={{ width: '100%' }} onChange={this.onChange.bind(this)} defaultValue={this.state.defaultKpisValue}>
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
    render() {
        const { visible } = this.props;
        return (
            <div>
                <Modal visible={visible} title="添加指标" onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)} footer={null} className={styles.modal}>
                    {this.renderCheckGroup()}

                    < div className={styles.handle}>
                        <Button onClick={this.handleOk.bind(this)} type="primary">确定</Button>
                        <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                    </div>
                </Modal>
            </div >
        );
    }
}