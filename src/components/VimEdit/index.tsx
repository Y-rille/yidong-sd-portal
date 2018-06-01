import React from 'react';
import { Modal, Button } from 'antd';
import * as _ from 'lodash';

import VimForm from '../VimForm/index'

export interface VimEditProps {
    data?
    visible
    handleOk?
    handleCancel?
    loading?
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
        if (formdata) {
            let { handleOk } = this.props
            if (handleOk) {
                handleOk(formdata)
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
        const { visible, data } = this.props
        let title = data ? '编辑资源结构组织' : '新建资源结构组织'
        let _data = {}
        if (data) {
            data.columns.map((item, index) => {
                const key = data.columns[index];
                const values = data.values[0][index];
                _data[key] = values
            });
        }
        return (
            <Modal
                title={title}
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                width="60%"
                // style={{ top: '8%' }}
                footer={[
                    <Button key="back" onClick={this.handleCancel.bind(this)}>取消</Button>,
                    <Button key="submit" type="primary" loading={this.props.loading}
                        onClick={this.handleOk.bind(this)}>确定</Button>,
                ]}
            >
                <VimForm
                    data={_data}
                    wrappedComponentRef={(node) => { this.formRef = node }}
                />
            </Modal>
        );
    }
}