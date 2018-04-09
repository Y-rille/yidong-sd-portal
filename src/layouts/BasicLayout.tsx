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
  exitHandler?
  currentUser
  menu?
  goSearch?
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
    let { navClickHandler, activeKey, exitHandler, currentUser, menu, goSearch } = this.props
    return (
      <Layout className={styles['layout']}>
        <HeaderBar navClickHandler={navClickHandler} menu={menu} activeKey={activeKey} exitHandler={exitHandler} currentUser={currentUser} goSearch={goSearch} />
        <Layout className={styles['page-body']}>
          <Content className={styles['page-content']}>{this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
