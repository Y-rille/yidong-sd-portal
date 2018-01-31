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
            // menuValue: _.map(this.props.defaultMenu, (item) => {
            //     return item.value;
            // })
        }
    }
    static propTypes = {
    };
    static defaultProps = {
    }
    handleOk() {
        this.props.handleOk(this.state.menuValue);
    }
    handleCancel() {
        this.props.handleCancel();
    }
    onChange(e) {
        this.setState({
            menuValue: e
        })
    }
    renderMenuItem() {
        const { kpis } = this.props;
        // let menus = _.map(menu, (item) => {
        //     item.activeKey = false;
        //     return item;
        // })
        return _.map(kpis, (item) => {

            return (
                <Col span={12} className={styles.col}>
                    <Checkbox value={item.id}>{item.kpiRealName}</Checkbox>
                </Col>
            )
        })
    }
    // renderDefaultMenuItem() {
    //     // const { defaultMenu } = this.props;
    //     // return _.map(defaultMenu, (item) => {
    //     //     return item.value;
    //     // })
    //     const { menu } = this.props;
    //     let arr = [];
    //     if (arr.length >= 4) {
    //         arr = menu.slice(0, 4);
    //     } else {
    //         arr = menu;
    //     }
    //     return _.map(arr, (item) => {
    //         return item.id;
    //     })
    // }
    render() {
        const { visible } = this.props
        // let menu = _.map(this.props.menu, (item) => {
        //     item.activeKey = false;
        //     return item;
        // })
        return (
            <div>
                <Modal visible={visible} title="添加指标" onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)} footer={null} className={styles.modal}>

                    {/* <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange.bind(this)} defaultValue={this.renderDefaultMenuItem()}> */}
                    <Row>
                        <Col span={4}>选择指标：</Col>
                        <Col span={20}>
                            <Row>
                                {this.renderMenuItem()}
                            </Row>
                        </Col>
                    </Row>
                    {/* </Checkbox.Group> */}

                    <div className={styles.handle}>
                        <Button onClick={this.handleOk.bind(this)} type="primary">确定</Button>
                        <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}