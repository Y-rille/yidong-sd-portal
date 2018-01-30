import * as React from 'react';
import * as PropTypes from 'prop-types';
import BasicLayout from '../layouts/BasicLayout'
import UserLayout from '../layouts/UserLayout'

const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import { withRouter, matchPath } from 'react-router'
import HomeActionCreatorsMap, { CommonActions } from '../modules/common/actions/index'

import emitter from './emitter'
import { message } from 'antd'

declare let global: any;

function mapProps(state: any) {
    return {
        collapsed: state.commonReducer.collapsed,
        fetchingNotices: state.commonReducer.fetchingNotices,
        notices: state.commonReducer.notices,
        locale: state.commonReducer.locale,
        currentUser: state.commonReducer.currentUser,
        tree: state.commonReducer.tree
    }
}
function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export interface SiteProps {
    children?: any;
    actions?: CommonActions;
    locale: string,
    currentUser?,
    location,
    matchPath,
    match,
    tree
}

class Site extends React.Component<SiteProps, any> {
    static contextTypes = {
        router: PropTypes.object,
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    constructor(props: any) {
        super(props);
        let { pathname } = this.props.location

        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: '/dashboard' }) != null && 'dashboard',
                matchPath(pathname, { path: '/setting' }) != null && 'setting',
                matchPath(pathname, { path: '/resource' }) != null && 'resource',
                matchPath(pathname, { path: '/alarm' }) != null && 'alarm',
                matchPath(pathname, { path: '/performance' }) != null && 'performance',
            ]).toString()
        };
    }
    navClickHandler(key) {
        this.setState({
            activeKey: key
        })
        global.hashHistory.push(`/${key}`)
    }
    exitHandler() {
        global.hashHistory.push(`/login`)
    }
    componentWillMount() {
        emitter.addListener('message', (type, content, duration, onClose) => {
            message.destroy()
            switch (type) {
                case 'success':
                    message.success(content, duration, onClose)
                    break
                case 'error':
                    message.error(content, duration, onClose)
                    break
                case 'warning':
                    message.warning(content, duration, onClose)
                    break
                default:
                    message.success(content, duration, onClose)
            }
        })
        this.props.actions.querytree('0', (err, data) => {
            this.forceUpdate()
        })
    }

    componentWillReceiveProps(nextProps: any) {

    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        // console.log(this.props.tree);
        if (this.props.location.pathname.indexOf('/login') > -1) {
            return (
                <UserLayout>
                    {this.props.children}
                </UserLayout>
            );
        } else {
            let { currentUser } = this.props
            let { activeKey } = this.state
            if (this.props.tree) {
                return (
                    <BasicLayout
                        navClickHandler={this.navClickHandler.bind(this)}
                        activeKey={activeKey}>
                        {this.props.children}
                    </BasicLayout>
                );
            } else {
                return <div>loading</div>
            }
        }
    }
}
export default withRouter(connect(mapProps, mapDispatchToProps)(Site))