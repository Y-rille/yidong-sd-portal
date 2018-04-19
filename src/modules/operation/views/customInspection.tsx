import * as React from 'react';
import styles from '../style/index.less'
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, DatePicker, LocaleProvider } from 'antd';
export interface CustomInspectionProps {
    config?
}
class CustomInspection extends React.PureComponent<CustomInspectionProps, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let { config } = this.props
        let H = window.innerHeight - 210 + 'px'
        return (
            <Row className={styles.operation}>
                <div className={styles.header}>
                    <h1 className={styles.title}>自定义巡检</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>运维工具</Breadcrumb.Item>
                        <Breadcrumb.Item>自定义巡检</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={styles.tb} style={{ height: H }}>
                    <iframe style={{ width: '100%', height: '100%', border: '0px' }} src={config.custom_inspection}></iframe>
                </div>
            </Row>
        );
    }
}

export default CustomInspection;