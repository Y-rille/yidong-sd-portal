import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './index.less';
import { Row, Col, Tooltip } from 'antd'
declare let global: any;

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
        colNum: 5,
        data: {
            header: [
                {
                    key: 'id',
                    title: 'ID',
                    link: true
                },
                {
                    key: 'name',
                    title: 'imdsAZ',
                    link: false
                },
                {
                    key: 'role',
                    title: '角色',
                    link: false
                },
                {
                    key: 'az',
                    title: '所属AZ',
                    link: false
                },
                {
                    key: 'ha',
                    title: '所属HA',
                    link: false
                }
            ],
            dataList: [
                {
                    az: 'Libby.McGlynn,Modesto_Graham20',
                    ha: 'Janie.Jacobi58,Lucious.Witting24',
                    id: 1,
                    name: '106.40.16.140',
                    role: 'Kamille3'
                },
                {
                    az: 'Thomas_Fadel79,Bailey_Carter',
                    ha: 'Jaylan.Littel50,Adeline_Gerlach',
                    id: 2,
                    name: '66.231.137.210',
                    role: 'Nadia_Waters9'
                },
            ]
        }
    }
    renderContent() {
        const { data, colNum } = this.props;
        const dataValues = _.head(data.dataList);
        const dataKeys = data.header;
        let dataCol = (colNum === 2 ? 12 : (colNum === 3 ? 8 : (colNum === 4 ? 6 : 4)))
        let right = (dataCol === 4 ? '28px' : '0')
        return _.map(dataKeys, (item) => {
            return (
                <Col span={dataCol} style={{ marginBottom: '20px', marginRight: right, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {item.title}:
                <span style={{ display: 'inline-block', width: '10px' }} />
                    <Tooltip title={dataValues[item.key]}><span>{dataValues[item.key]}</span></Tooltip>
                </Col>
            )
        })
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