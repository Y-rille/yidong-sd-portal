import * as React from 'react';
import * as _ from 'lodash';

import { Row, Col, Breadcrumb } from 'antd';
import SideBar from '../../../components/SideBar'
import DynamicPropertiesPanel from '../../../components/DynamicPropertiesPanel'
import SearchResultPanel from '../../../components/SearchResultPanel'
import SplitPane from 'react-split-pane'
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import Dashboard from './dashboard'
import Vim from './vim/vim'
import Pim from './pim/pim'
import styles from '../style/index.less'

declare let global: any;

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    goPath = (e) => {
        let path = e.target.getAttribute('data-target')
        if (path === 'vim') {
            path = 'vim/1'
        }
        this.props.history.push(`/resource/${path}`)
    }
    componentDidMount() {

    }
    render() {
        let { match } = this.props
        return (
            <Row className={styles.resource}>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={300}
                    defaultSize={200} >
                    <div>
                        <SideBar />
                    </div>
                    <div className={styles.main} style={{ minHeight: window.innerHeight - 104 }}>
                        <Switch>
                            <Redirect from={`${match.url}`} to={`${match.url}/dashboard`} exact />
                            <Route path={`${match.url}/dashboard`} component={Dashboard} />
                            <Route path={`${match.url}/vim/1`} component={Vim} />
                            {/* <Route path={`${match.url}/1/pim`} component={Pim} /> */}
                        </Switch>
                    </div>
                </SplitPane>
            </Row >
        );
    }
}

export default Home;