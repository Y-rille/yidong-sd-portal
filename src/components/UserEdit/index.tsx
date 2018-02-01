import React from 'react';
import { Modal, Button } from 'antd';
import styles from './index.less';

export interface UserEditProps {
    data?
    // showModal?
    visible
    handleOk
    handleCancel
}

export default class UserEdit extends React.PureComponent<UserEditProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    handleOk() {
        this.props.handleOk();
    }
    handleCancel() {
        this.props.handleCancel();
    }
    render() {
        const { visible } = this.props
        return (
            <div className={styles.useredit}>
                <Modal
                    title="新建用户"
                    visible={visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}