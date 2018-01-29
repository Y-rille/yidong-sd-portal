import * as React from 'react';
import styles from './BasicLayout.less';
import HeaderBar from '../components/HeaderBar/';
import FactModal from '../components/FactModal/'
import { Layout } from 'antd';
const { Content } = Layout;
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
    return (
      <Layout className={styles['layout']}>
        <HeaderBar navClickHandler={navClickHandler} isActive={isActive} />
        <Layout className={styles['page-body']}>
          <Content className={styles['page-content']}>{this.props.children}
            <FactModal />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
