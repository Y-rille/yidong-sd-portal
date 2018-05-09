import React from 'react';
import { Modal } from 'antd';

import UserPasswordForm from '../UserPasswordForm/index'

export interface UserEditPasswordProps {
    visible
    handleOk
    handleCancel
}

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

export default class UserEditPassword extends React.PureComponent<UserEditPasswordProps, any> {
    formRef: any;
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    afterClose() {
        this.formRef.resetForm();
    }
    handleOk() {
        let data = this.formRef.getData();
        if (data) {
            let { handleOk } = this.props
            if (handleOk) {
                handleOk(data)
            }
        }
    }
    handleCancel() {
        let { handleCancel } = this.props
        if (handleCancel) {
            handleCancel()
        }
    }
    render() {
        const { visible } = this.props
        return (
            <Modal
                title="修改密码"
                cancelText="取消"
                okText="确定"
                visible={visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                afterClose={this.afterClose.bind(this)}
            >
                <UserPasswordForm wrappedComponentRef={(node) => { this.formRef = node }} />
            </Modal>
        );
    }
}