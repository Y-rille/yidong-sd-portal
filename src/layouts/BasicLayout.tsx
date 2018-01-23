import * as React from 'react';
import styles from './BasicLayout.less';
import HeaderBar from '../components/HeaderBar/';
import { Layout } from 'antd';
const { Sider, Content } = Layout;
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
        {/* {this.props.children} */}
        {layout}
      </div>
    );
  }
}
