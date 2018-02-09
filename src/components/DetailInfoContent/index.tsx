import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './index.less';
import { Row, Col } from 'antd'
declare let global: any;

export interface DetailInfoContentProps {
    data?
    colNum?
}

/**
 * 详情信息
 * 
 * @export
 * @class DetailInfoTitle
 * @extends {React.PureComponent<DetailInfoContentProps, any>}
 */

export default class DetailInfoContent extends React.PureComponent<DetailInfoContentProps, any> {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        data: [
            {
                attr: '平均IO时延: ',
                value: 0.367
            }, {
                attr: '总带宽(Mbps): ',
                value: 3.798
            }, {
                attr: '读带宽(Mbps): ',
                value: 3.798
            }, {
                attr: '写带宽(Mbps): ',
                value: 3.798
            }, {
                attr: '总次数(IOps): ',
                value: 153
            }, {
                attr: '读次数(IOps): ',
                value: 153
            }, {
                attr: '写次数(IOps): ',
                value: 153
            }
        ]
    }
    renderContent() {
        const { data, colNum } = this.props;
        if (colNum === 4) {
            return _.map(data, (item) => {
                return <Col span={6}>{item.attr}{item.value}</Col>
            })
        }
        if (colNum === 3) {
            return _.map(data, (item) => {
                return <Col span={8}>{item.attr}{item.value}</Col>
            })
        }

    }
    render() {
        return (
            <div className={styles.nodeInfo}>
                {/* <Row className={styles.nodeRow}>
                    <Col span={6}>平均IO时延:&nbsp;&nbsp;0.367</Col>
                    <Col span={6}>总带宽(Mbps):&nbsp;&nbsp;3.798</Col>
                    <Col span={6}>读带宽(Mbps):&nbsp;&nbsp;3.798</Col>
                    <Col span={6}>写带宽(Mbps):&nbsp;&nbsp;3.798</Col>
                </Row>
                <Row className={styles.nodeRow}>
                    <Col span={6}></Col>
                    <Col span={6}>总次数(IOps):&nbsp;&nbsp;153</Col>
                    <Col span={6}>读次数(IOps):&nbsp;&nbsp;153</Col>
                    <Col span={6}>写次数(IOps):&nbsp;&nbsp;153</Col>
                </Row> */}
                <Row className={styles.nodeRow}>
                    {this.renderContent()}
                </Row>
            </div>

        );
    }
}