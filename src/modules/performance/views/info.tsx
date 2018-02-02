import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'

import styles from '../style/index.less'

import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin } from 'antd';

import FactModal from '../../../components/FactModal/'
import Current from '../container/current'
import History from '../container/history'

declare let global: any;

export interface InfoProps {
  match?
  moTypeKpis?
  moInstKpiThresholds?
  location?
}

export default class Info extends React.Component<InfoProps, any> {
  constructor(props) {
    super(props);
    let { match } = this.props
    let { pathname } = this.props.location
    this.state = {
      activeKey: _.compact([
        matchPath(pathname, { path: `${match.url}/current` }) != null && 'current',
        matchPath(pathname, { path: `${match.url}/history` }) != null && 'history',
      ]).toString(),
      visible: false,
    };
  }
  handleOk() {
    this.setState({
      visible: false
    })
  }
  handleCancel() {
    this.setState({
      visible: false
    })
  }
  showModal() {
    this.setState({
      visible: true
    })
  }
  tabClick(e) {
    let { match } = this.props
    let path = e.target.getAttribute('data-path')
    this.setState({
      activeKey: path
    })
    global.hashHistory.push(`${match.url}/${path}`)
  }

  componentWillReceiveProps(nextProps) {
    let { match } = nextProps
    let { pathname } = nextProps.location
    this.state = {
      activeKey: _.compact([
        matchPath(pathname, { path: `${match.url}/current` }) != null && 'current',
        matchPath(pathname, { path: `${match.url}/history` }) != null && 'history',
      ]).toString()
    };
  }

  renderTab() {
    let { activeKey } = this.state
    let tab = [{ key: 'current', name: '当前状态' }, { key: 'history', name: '历史趋势' }]
    return _.map(tab, (item) => {
      let cls = {
        tabItem: true,
        active: activeKey === item.key ? true : false
      }
      return <li className={classNames(cls)} data-path={item.key} onClick={this.tabClick.bind(this)}>{item.name}</li>
    })
  }

  render() {
    let { match, moTypeKpis } = this.props
    let { activeKey } = this.state
    return (
      <div>
        <div className={styles.header}>
          <h1 className={styles.title}>交换机</h1>
          <Breadcrumb>
            <Breadcrumb.Item>性能监控</Breadcrumb.Item>
            <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
            <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
            <Breadcrumb.Item>四级菜单</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.tabBar}>
          <ul>
            {this.renderTab()}
          </ul>
          <Button onClick={this.showModal.bind(this)}><Icon type="tag-o" />添加指标</Button>
        </div>
        {
          (this.props.moTypeKpis && this.props.moInstKpiThresholds) ? (
            <Switch>
              <Redirect from={`${match.url}`} to={`${match.url}/current`} exact />
              <Route path={`${match.url}/current`} render={() => <Current />} />
              <Route path={`${match.url}/history`} render={() => <History />} />
            </Switch>
          ) : (
              <div><Spin /></div>
            )
        }
        <FactModal visible={this.state.visible} handleOk={this.handleOk.bind(this)} handleCancel={this.handleCancel.bind(this)} kpis={moTypeKpis} />
      </div>
    );
  }
}
