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
  history?
  moTypeKpis?
  moInstKpiThresholds?
  location?
  tree?
  actions?
  nodeInfo?
  timeFilter?
}

export default class Info extends React.Component<InfoProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      facts: [],
    };
  }
  handleOk(kpis) {
    var str_facts = kpis.join(',')
    this.setState({
      visible: false,
      facts: str_facts,
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
    this.props.history.push(`${match.url}/${path}`)
  }
  getKpisAndThresholds() {
    this.props.actions.getMoTypeKpis(1, 7, (data) => {
    })
    this.props.actions.getMoInstKpiThresholds(1, 1, (data) => {
    })
  }
  componentWillMount() {
    let nodeId = this.props.match.params.nodeId
    this.props.actions.getNodeData(nodeId, this.props.tree)
  }
  componentDidMount() {
    this.getKpisAndThresholds();
  }
  componentWillReceiveProps(nextProps) {
    let { match } = nextProps
    let { pathname } = nextProps.location
    // 设置默认选中的值
    let { moTypeKpis } = nextProps
    if (moTypeKpis) {
      let facts = []
      for (let i = 0; i < 4; i++) {
        if (moTypeKpis[i]) {
          facts.push(moTypeKpis[i].kpiId)
        }
      }
      var str_facts = facts.join(',')
      this.state = {
        facts: str_facts,
      };
    }

  }

  renderTab() {
    let { pathname } = this.props.location
    let tab = [{ key: 'current', name: '当前状态' }, { key: 'history', name: '历史趋势' }]
    return _.map(tab, (item) => {
      let cls = {
        tabItem: true,
        active: pathname.indexOf(item.key) > 0
      }
      return <li className={classNames(cls)} data-path={item.key} onClick={this.tabClick.bind(this)}>{item.name}</li>
    })
  }
  renderFactModel(moTypeKpis) {
    if (moTypeKpis) {
      return (
        <FactModal visible={this.state.visible} handleOk={this.handleOk.bind(this)} handleCancel={this.handleCancel.bind(this)} kpis={moTypeKpis} />
      )
    } else {
      return <div />
    }
  }
  render() {
    let { match, moTypeKpis } = this.props
    let { activeKey } = this.state
    if (this.props.nodeInfo) {
      let lablePathArr = this.props.nodeInfo.lablePath.split('/')
      return (
        <div>
          <div className={styles.header}>
            <h1 className={styles.title}>{this.props.nodeInfo.nodeName}</h1>
            <Breadcrumb>
              {
                lablePathArr.map((item, index) => {
                  return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                })
              }
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
                <Route path={`${match.url}/current`} render={() => <Current kpis={this.state.facts} />} />
                <Route path={`${match.url}/history`} render={() => <History timeFilter={this.props.timeFilter} kpis={this.state.facts} />} />
              </Switch>
            ) : (
                <Spin />
              )
          }
          {this.renderFactModel(moTypeKpis)}
        </div>

      )
    } else {
      return <Spin />
    }
  }
}
