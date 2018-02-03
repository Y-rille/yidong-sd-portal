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
      facts: '',
      changeFacts: ''
    };
  }
  handleOk(kpis) {
    var str_facts = kpis.join(',')
    this.setState({
      visible: false,
      facts: str_facts,
      changeFacts: str_facts
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
  getKpisAndThresholds(nodeInfo) {
    this.props.actions.getMoTypeKpis(nodeInfo.bizFields.moTypeId, 7, (moTypeKpis) => {
      // 设置默认选中的值
      if (moTypeKpis) {
        let facts = []
        if (this.state.facts.length === 0) {
          for (let i = 0; i < 4; i++) {
            if (moTypeKpis[i]) {
              facts.push(moTypeKpis[i].kpiId)
            }
          }
          var str_facts = facts.join(',')
          this.setState({
            facts: str_facts,
            changeFacts: str_facts
          })
        }

      }

    })
    this.props.actions.getMoInstKpiThresholds(nodeInfo.bizFields.moTypeId, nodeInfo.bizFields.moInstId, (data) => {
    })
  }

  getNodeInfo(nodeId) {
    this.props.actions.getNodeData(nodeId, this.props.tree, (err, nodeInfo) => {
      this.getKpisAndThresholds(nodeInfo);
    })
  }

  deleteCard(id) {
    let { facts } = this.state
    facts = _.compact(facts.replace(id, '').split(',')).toString()
    this.setState({ facts })
  }

  componentWillMount() {
    let nodeId = this.props.match.params.nodeId
    this.getNodeInfo(nodeId)
  }
  componentWillReceiveProps(nextProps) {
    let { match } = nextProps
    let { pathname } = nextProps.location
    // check nodeid is changed
    let pre_nodeId = this.props.match.params.nodeId
    let next_nodeId = nextProps.match.params.nodeId
    if (pre_nodeId === next_nodeId) {
    } else {
      this.setState({
        facts: '',
        changeFacts: ''
      })
      this.props.actions.cleanMoTypeKpisAndMoInstKpiThresholds()
      this.getNodeInfo(next_nodeId)

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
        <FactModal visible={this.state.visible} handleOk={this.handleOk.bind(this)} handleCancel={this.handleCancel.bind(this)} kpis={moTypeKpis} facts={this.state.facts} />
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
              <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
              <Breadcrumb.Item>性能监控</Breadcrumb.Item>
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
                <Route path={`${match.url}/current`} render={() => <Current kpis={this.state.changeFacts} deleteCard={this.deleteCard.bind(this)} />} />
                <Route path={`${match.url}/history`} render={() => <History timeFilter={this.props.timeFilter} kpis={this.state.changeFacts} deleteCard={this.deleteCard.bind(this)} />} />
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
