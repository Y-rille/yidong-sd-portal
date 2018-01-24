import * as React from 'react'
import * as Loadable from 'react-loadable';
import * as PropTypes from 'prop-types';
import Site from './site'
import {
  HashRouter as Router,
  Switch,
  Route, Link
} from 'react-router-dom'

const LoginComponent = Loadable({
  loader: () => import(/* webpackChunkName: "login" */'../modules/login/routes/index'),
  loading: (() => null),
})

const DashboardComponent = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */'../modules/dashboard/routes/index'),
  loading: (() => null),
})

const ResourceComponent = Loadable({
  loader: () => import(/* webpackChunkName: "resource" */'../modules/resource/routes/index'),
  loading: (() => null),
})

const AlarmComponent = Loadable({
  loader: () => import(/* webpackChunkName: "alarm" */'../modules/alarm/routes/index'),
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
          <Switch>
            <Route path="/login" component={LoginComponent} />
            <Route path="/dashboard" component={DashboardComponent} />
            <Route path="/resource" component={ResourceComponent} />
            <Route path="/alarm" component={AlarmComponent} />
            <Route path="/performance" component={PerformanceComponent} />
          </Switch>
        </Site>
      </Router>
    );
  }
}
