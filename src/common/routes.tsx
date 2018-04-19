import * as React from 'react'
import * as Loadable from 'react-loadable';
import * as PropTypes from 'prop-types';
import Site from './site'
import Loading from './loading'
import {
  HashRouter as Router,
  Switch,
  Route, Link,
  Redirect
} from 'react-router-dom'

const LoginComponent = Loadable({
  loader: () => import(/* webpackChunkName: "login" */'../modules/login/routes/index'),
  loading: () => { return <Loading /> }
})

const DashboardComponent = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */'../modules/dashboard/routes/index'),
  loading: () => { return <Loading /> }
})

const SettingComponent = Loadable({
  loader: () => import(/* webpackChunkName: "setting" */'../modules/setting/routes/index'),
  loading: () => { return <Loading /> }
})

const ResourceComponent = Loadable({
  loader: () => import(/* webpackChunkName: "resource" */'../modules/resource/routes/index'),
  loading: () => { return <Loading /> }
})

const AlarmComponent = Loadable({
  loader: () => import(/* webpackChunkName: "alarm" */'../modules/alarm/routes/index'),
  loading: () => { return <Loading /> }
})

const PerformanceComponent = Loadable({
  loader: () => import(/* webpackChunkName: "performance" */'../modules/performance/routes/index'),
  loading: () => { return <Loading /> }
})
const LogComponent = Loadable({
  loader: () => import(/* webpackChunkName: "log" */'../modules/log/routes/index'),
  loading: () => { return <Loading /> }
})
const SearchComponent = Loadable({
  loader: () => import(/* webpackChunkName: "search" */'../modules/search/routes/index'),
  loading: () => { return <Loading /> }
})
const OperationComponent = Loadable({
  loader: () => import(/* webpackChunkName: "operation" */'../modules/operation/routes/index'),
  loading: () => { return <Loading /> }
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
            <Redirect from="/" to="/resource" exact />
            <Route path="/login" component={LoginComponent} />
            <Route path="/dashboard" component={DashboardComponent} />
            <Route path="/setting" component={SettingComponent} />
            <Route path="/resource" component={ResourceComponent} />
            <Route path="/alarm" component={AlarmComponent} />
            <Route path="/performance" component={PerformanceComponent} />
            <Route path="/log" component={LogComponent} />
            <Route path="/search" component={SearchComponent} />
            <Route path="/operation" component={OperationComponent} />
          </Switch>
        </Site>
      </Router>
    );
  }
}
