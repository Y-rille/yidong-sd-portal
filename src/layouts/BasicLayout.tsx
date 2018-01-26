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
  navClickHandler?
  isActive?
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
    let { navClickHandler, isActive } = this.props
    const layout = (
      <Layout>
        <HeaderBar navClickHandler={navClickHandler} isActive={isActive} />
        <Layout>
          <Sider></Sider>
          <Content></Content>
        </Layout>
      </Layout>
    );
    return (
      <div className={styles.layout}>
        {layout}
        {this.props.children}
      </div>
    );
  }
}
