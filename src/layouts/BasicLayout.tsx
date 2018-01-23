import * as React from 'react';
import styles from './BasicLayout.less';
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
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
    const menu = (
      <Menu>
        <Menu.Item>设置</Menu.Item>
        <Menu.Item>退出</Menu.Item>
      </Menu>
    );
    const layout = (
      <Layout>
        <Header className={styles.header}>
          <span className={styles.title}>NFV</span>
          <Menu theme="dark" mode="horizontal" selectedKeys={['1']} className={styles.nav}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
            <Menu.Item key="4">nav 4</Menu.Item>
          </Menu>
          <div className={styles.right}>
            <Avatar icon="user" style={{ backgroundColor: '#1DA57A' }} />
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link"><span style={{ color: '#fff' }}>HPEer</span><Icon type="down" style={{ color: '#fff' }} /></a>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider></Sider>
          <Content></Content>
        </Layout>
      </Layout>
    );
    return (
      <div className={styles.layout}>
        <ul>
          <li><Link to="/dashboard">概览</Link></li>
          <li><Link to="/resource">资源管理</Link></li>
          <li><Link to="/alarm">告警管理</Link></li>
          <li><Link to="/performance">性能管理</Link></li>
        </ul>
        {this.props.children}
        {layout}
      </div>
    );
  }
}
