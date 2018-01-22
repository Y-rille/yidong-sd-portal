import * as React from 'react'
import * as Loadable from 'react-loadable';
import * as PropTypes from 'prop-types';
import Site from './site'
import {
  HashRouter as Router,
  Switch,
  Route, Link
} from 'react-router-dom'

// import demoRoutes from '../modules/demo/routes/index'
const Home = () => (
  <div>
    <h2>首页</h2>
  </div>
)

const About = () => (
  <div>
    <h2>关于</h2>
  </div>
)

const LoadableComponent = Loadable({
  loader: () => import('../modules/demo/routes/index'),
  loading: (() => null),
})

// const Main = Loadable({
//   loader: () => import('../components/Music/Music'),
//   loading: (() => null),
// })

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
            <li><Link to="/">首页</Link></li>
            <li><Link to="/about">关于</Link></li>
            <li><Link to="/demo">主题列表</Link></li>
          </ul>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/demo" component={LoadableComponent} />
          </Switch>
        </Site>
      </Router>
    );
  }
}
