import React from 'react';
import { Col, Icon } from 'antd'
import InstrumentPanel from '../InstrumentPanel'
const merge = require('lodash/merge')
const compact = require('lodash/compact')
import styles from './index.less'

export interface InstrumentCardProps {
    data,
    gradient?
}

/**
 * 仪表盘
 * 
 * @export
 * @class InstrumentPanel
 * @extends {React.PureComponent<InstrumentPanelProps, any>}
 */

export default class InstrumentCard extends React.PureComponent<InstrumentCardProps, any> {
    instrumentPanel: any

    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }
    componentDidMount() {

    }
    printInstrumentPane() {
        this.instrumentPanel.chartExport()
    }
    hideOne() {
        this.setState({
            show: false
        })
    }
    render() {
        if (!this.state.show) {
            return <div />
        }
        let { data } = this.props
        return (
            <Col className="gutter-row" span={6} >
                <div className="gutter-box">
                    <div className={styles.instrumentHead}>
                        <div className={styles.title}>{data.title}</div>
                        <div className={styles.cardIcon}>
                            <Icon type="download" onClick={this.printInstrumentPane.bind(this)} />|
                            <Icon type="close" onClick={this.hideOne.bind(this)} />
                        </div>
                    </div>
                    <InstrumentPanel
                        ref={(node) => { this.instrumentPanel = node }}
                        data={data}
                    />
                </div>
            </Col>
        );
    }

}
