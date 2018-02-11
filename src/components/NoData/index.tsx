import React from 'react';
import styles from './index.less'

export interface NoDataProps {

}

export default class NoData extends React.PureComponent<NoDataProps, any> {

    render() {
        return (
            <div className={styles.noData}>
                <img src={require('../../img/noData.png')} alt="" />
                <br />
                <span>当前页面暂无相关数据！</span>
            </div>
        )
    }
}