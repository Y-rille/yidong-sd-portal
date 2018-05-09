import * as React from 'react';
import { Button, Upload, message, Icon } from 'antd';
import styles from './index.less';

export interface FindUploadProps {
    disabled?
    uploadChange?
    moTypeKey
}
export default class FindUpload extends React.PureComponent<FindUploadProps, any> {
    constructor(props) {
        super(props)
        let { disabled } = this.props
        this.state = {
            disabled: disabled ? disabled : false,
            fileList: []
        }
    }
    handleChange(info) {
        let fileList = info.fileList
        if (info.file.status === 'done') {
            this.setState({
                disabled: info.fileList.length ? true : false,
                fileList
            })
            let { uploadChange } = this.props
            message.success('文件上传成功!');
            if (uploadChange) {
                uploadChange(info.file.response.url)
            }
        } else if (info.file.status === 'error') {
            this.setState({
                disabled: info.fileList.length ? true : false,
                fileList
            })
            message.error('文件上传失败!');
        }
    }
    beforeUpload(file) {
        const isCsv = file.name.indexOf('.csv') > -1 ? true : false;
        if (!isCsv) {
            message.error('只能上传csv格式的文件!');
        }
        return isCsv
    }
    removeFileList() {
        this.setState({
            fileList: []
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            disabled: nextProps.disabled
        })
    }
    render() {
        let { disabled, fileList } = this.state
        let { moTypeKey } = this.props
        return (
            <div className={styles.findUpload}>
                <Upload
                    key={Math.random()}
                    name="file"
                    action={`/api_agent/rms-agent/api/findupload/${moTypeKey}`}
                    defaultFileList={fileList}
                    beforeUpload={this.beforeUpload.bind(this)}
                    onChange={this.handleChange.bind(this)}>
                    <Button icon="upload" disabled={disabled}>上传文件</Button>
                    <span style={{ display: 'inlineBlock', marginLeft: '10px', color: '#e2e4e9' }}>支持扩展名：.csv</span>
                </Upload>
            </div >
        );
    }
}