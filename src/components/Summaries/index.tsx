import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './index.less';
import { Row, Col, Tooltip } from 'antd'
declare let global: any;
import moment from '../../common/moment'
export interface SummariesProps {
    data?
    colNum?
}

/**
 * 详情信息
 * 
 * @export
 * @class Summaries
 * @extends {React.PureComponent<SummariesProps, any>}
 */

export default class Summaries extends React.PureComponent<SummariesProps, any> {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
    }
    renderContent() {
        let { data, colNum } = this.props;
        let values = _.head(data ? data.dataList : '');
        let dataValues = _.merge({}, values)
        if (dataValues.createdat) {
            dataValues.createdat = moment.tz(dataValues.createdat, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
        }
        if (dataValues.updatedat) {
            dataValues.updatedat = moment.tz(dataValues.updatedat, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
        }
        const dataKeys = data ? data.header : '';
        let dataCol = (colNum === 2 ? 12 : (colNum === 3 ? 8 : (colNum === 4 ? 6 : 4)))
        let right = (dataCol === 4 ? '28px' : '0')
        if (dataValues) {
            return _.map(dataKeys, (item) => {
                return (
                    <Col span={dataCol} style={{ marginBottom: '20px', marginRight: right, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {item.title}:
                    <span style={{ display: 'inline-block', width: '10px' }} />
                        <Tooltip title={dataValues[item.key]}><span>{dataValues[item.key]}</span></Tooltip>
                    </Col>
                )
            })
        } else {
            return (
                <div style={{ height: '50px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginTop: '5px' }}>No Data</div>
                </div>
            );
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