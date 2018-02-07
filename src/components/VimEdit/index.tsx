import React from 'react';
import { Modal } from 'antd';

import VimForm from '../VimForm/index'

export interface VimEditProps {
    data?
    visible
    handleOk?
    handleCancel?
}

export default class VimEdit extends React.PureComponent<VimEditProps, any> {
    formRef: any;
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleOk() {
        let formdata = this.formRef.getData()
        if (this.props.handleOk) {
            this.props.handleOk(formdata)
        }
    }
    handleCancel() {
        if (this.props.handleCancel) {
            this.props.handleCancel()
        }
    }
    render() {
        const { visible, data } = this.props
        let title = data ? '编辑资源结构组织' : '新建资源结构组织'
        return (
            <Modal
                title={title}
                cancelText="取消"
                okText="确定"
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <VimForm data={data} wrappedComponentRef={(node) => { this.formRef = node }} />
            </Modal>
        );
    }
}