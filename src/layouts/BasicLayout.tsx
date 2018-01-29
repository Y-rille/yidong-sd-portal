import * as React from 'react';
import styles from './BasicLayout.less';
import HeaderBar from '../components/HeaderBar/';
import { Layout } from 'antd';
const { Content } = Layout;
import {
  HashRouter as Router,
  Switch,
  Route, Link
} from 'react-router-dom'
export interface BasicLayoutProps {
  navClickHandler?
  activeKey?
}

export default class BasicLayout extends React.Component<BasicLayoutProps, any> {

  static contextTypes = {
  }
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }
  render() {
    let { navClickHandler, activeKey } = this.props
    return (
      <Layout className={styles['layout']}>
        <HeaderBar navClickHandler={navClickHandler} activeKey={activeKey} />
        <Layout className={styles['page-body']}>
          <Content className={styles['page-content']}>{this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
