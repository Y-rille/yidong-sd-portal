import * as React from 'react';
import { Button, Upload, message, Icon } from 'antd';
import styles from './index.less';

export interface FindUploadProps {
    disabled?
    onChange?
}
export default class FindUpload extends React.PureComponent<FindUploadProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false
        }
    }
    handleChange(info) {
        // this.setState({
        //     disabled: info.file.status === 'uploading' ? true : false
        // })
        // if (info.file.status !== 'uploading') {
        //     let fileList = info.fileList
        //     this.setState({
        //         disabled: info.fileList.length ? true : false
        //     })
        //     this.props.onChange && this.props.onChange('')
        // }
        // if (info.file.status === 'done') {
        //     let fileList = info.fileList
        //     this.setState({
        //         disabled: info.fileList.length ? true : false
        //     })
        //     message.success('文件上传成功!');
        //     this.props.onChange && this.props.onChange(info.file.response.path)
        // } else if (info.file.status === 'error') {
        //     message.error('文件上传失败!');
        //     this.setState({
        //         disabled: true
        //     })
        // }
    }
    beforeUpload(file) {
        const isXlsx = file.name.indexOf('.xlsx') > -1 ? true : false;
        if (!isXlsx) {
            message.error('只能上传xlsx格式的文件!');
        }
        return isXlsx
    }
    render() {
        let { disabled } = this.state
        return (
            <div className={styles.findUpload}>
                <Upload
                    name="file"
                    action="/api/upload"
                    beforeUpload={this.beforeUpload.bind(this)}
                    onChange={this.handleChange.bind(this)}>
                    <Button icon="upload" disabled={disabled}>上传文件</Button>
                    <span style={{ display: 'inlineBlock', marginLeft: '10px' }}>支持扩展名：.xlsx</span>
                </Upload>
            </div>
        );
    }
}