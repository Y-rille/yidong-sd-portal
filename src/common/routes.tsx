import * as React from 'react'
import * as Loadable from 'react-loadable';
import * as PropTypes from 'prop-types';
import Site from './site'
import {
  HashRouter as Router,
  Switch,
  Route, Link
} from 'react-router-dom'

const AlarmComponent = Loadable({
  loader: () => import(/* webpackChunkName: "alarm" */'../modules/alarm/routes/index'),
  loading: (() => null),
})

const ResourceComponent = Loadable({
  loader: () => import(/* webpackChunkName: "resource" */'../modules/resource/routes/index'),
  loading: (() => null),
})

const PerformanceComponent = Loadable({
  loader: () => import(/* webpackChunkName: "performance" */'../modules/performance/routes/index'),
  loading: (() => null),
})

export interface MainRouresProps {
  store?
}

export default class MainRoures extends React.PureComponent<MainRouresProps, any> {

  static contextTypes = {
    store: PropTypes.object,
  }
  static childContextTypes = {
    store: PropTypes.object,
  }
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return (
      <Router>
        <Site>
          <ul>
            <li><Link to="/resource">资源管理</Link></li>
            <li><Link to="/alarm">告警管理</Link></li>
            <li><Link to="/performance">性能管理</Link></li>
          </ul>
          <Switch>
            <Route path="/alarm" component={AlarmComponent} />
            <Route path="/resource" component={ResourceComponent} />
            <Route path="/performance" component={PerformanceComponent} />
          </Switch>
        </Site>
      </Router>
    );
  }
}
