import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './index.less';

declare let global: any;

export interface HeadlineProps {
    title?
}

/**
 * 详情信息
 * 
 * @export
 * @class Headline
 * @extends {React.PureComponent<HeadlineProps, any>}
 */

export default class Headline extends React.PureComponent<HeadlineProps, any> {
    constructor(props) {
        super(props);

    }

    render() {
        let { title } = this.props;
        return (
            <div className={styles.nodeTitle}>
                <span className={styles.nodeTitle1}></span>
                <span className={styles.nodeTitle2}>{title}</span>
            </div>
        );
    }
}