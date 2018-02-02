import React from 'react';
import { Modal, Button } from 'antd';
import styles from './index.less';
import UserForm from '../UserForm/'

export interface UserEditProps {
    data?
    // showModal?
    visible
    handleOk
    handleCancel
    modalTitle?
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
                    title={this.props.modalTitle}
                    cancelText="取消"
                    okText="确定"
                    visible={visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <UserForm />
                </Modal>
            </div>
        );
    }
}