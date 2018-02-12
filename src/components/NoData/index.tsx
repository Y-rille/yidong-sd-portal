import React from 'react';
import styles from './index.less'

export interface NoDataProps {

}

export default class NoData extends React.PureComponent<NoDataProps, any> {
    container: any
    componentDidMount() {
        let mainH = window.innerHeight - 104 // document.getElementById('mainRight').offsetHeight
        let minH = this.container.offsetTop
        this.container.style.height = mainH - minH + 'px'
    }
    render() {
        return (
            <div ref={(node) => { this.container = node }} className={styles.noData}>
                <div>
                    <img src={require('../../img/noData.png')} alt="" />
                    <br />
                    <span>当前页面暂无相关数据！</span>
                </div>

            </div>
        )
    }
}