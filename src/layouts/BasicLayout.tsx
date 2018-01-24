import * as React from 'react';
import styles from './BasicLayout.less';
import HeaderBar from '../components/HeaderBar/';
import { Layout } from 'antd';
const { Sider, Content } = Layout;
import {
  HashRouter as Router,
  Switch,
  Route, Link
} from 'react-router-dom'
export interface BasicLayoutProps {
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

    const layout = (
      <Layout>
        <HeaderBar />
        <Layout>
          <Sider></Sider>
          <Content></Content>
        </Layout>
      </Layout>
    );
    return (
      <div className={styles.layout}>
        {layout}
        <ul>
          <li><Link to="/dashboard">概览</Link></li>
          <li><Link to="/resource">资源管理</Link></li>
          <li><Link to="/alarm">告警管理</Link></li>
          <li><Link to="/performance">性能管理</Link></li>
        </ul>
        {this.props.children}

      </div>
    );
  }
}
