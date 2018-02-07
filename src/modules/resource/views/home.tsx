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
import Vim from '../container/vim/vim'
import Pim from '../container/pim/pim'
import styles from '../style/index.less'

declare let global: any;

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    handleClick = (key) => {
        this.props.history.push(`/resource/${key}`)
    }
    componentDidMount() {

    }
    render() {
        let { match } = this.props
        return (
            <Row className={styles.resource}>
                <Col span={4}>
                    <SideBar onLinkHandleClick={this.handleClick} />
                </Col>
                <Col span={20}>
                    <div className={styles.main} style={{ minHeight: window.innerHeight - 104 }}>
                        <Switch>
                            <Redirect from={`${match.url}`} to={`${match.url}/dashboard`} exact />
                            <Route path={`${match.url}/dashboard`} component={Dashboard} />
                            <Route path={`${match.url}/vim/:vimId`} component={Vim} />
                            <Route path={`${match.url}/pim/:pimId`} component={Pim} />
                        </Switch>
                    </div>
                </Col>
            </Row >
        );
    }
}

export default Home;