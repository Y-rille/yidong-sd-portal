import * as React from 'react';
import * as PropTypes from 'prop-types';
import BasicLayout from '../layouts/BasicLayout'
import UserLayout from '../layouts/UserLayout'

const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import { Spin, message } from 'antd';

import _ from 'lodash';
import { withRouter, matchPath } from 'react-router'
import HomeActionCreatorsMap, { CommonActions } from '../modules/common/actions/index'

import emitter from './emitter'

declare let global: any;

function mapProps(state: any) {
    return {
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
    currentUser?,
    location,
    matchPath,
    match,
    tree
}

message.config({
    top: 100,
    duration: 2,
});

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
        this.props.actions.logout((currentUser) => {
            if (!currentUser) {
                global.hashHistory.push(`/login`)
            }
        })
    }
    componentWillMount() {
        emitter.addListener('message', (type, content, duration, onClose) => {
            message.destroy()
            switch (type) {
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
        if (!matchPath('/login', { path: this.props.location.pathname })
            && !this.props.tree) {
            this.props.actions.querytree('0')
        }
        if (!this.props.currentUser) {
            if (this.props.location.pathname.indexOf('/login') < 0) {
                this.props.actions.touch((user) => {
                    if (!user) {
                        global.hashHistory.replace('/login')
                    }
                })
            }
        }
    }

    componentWillReceiveProps(nextProps: any) {
        let { pathname } = nextProps.location
        if (!nextProps.tree && nextProps.currentUser) {
            this.props.actions.querytree('0')
        }
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
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const menu = [
            // {
            //     name: '首页',
            //     route: 'dashboard',
            // },
            {
                name: '系统管理',
                route: 'setting',
            },
            {
                name: '资源管理',
                route: 'resource',
            },
            {
                name: '告警监控',
                route: 'alarm',
            },
            {
                name: '性能监控',
                route: 'performance',
            }
        ]
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
                        exitHandler={this.exitHandler.bind(this)}
                        activeKey={activeKey}
                        menu={menu}
                        currentUser={currentUser ? currentUser : ''}>
                        {this.props.children}
                    </BasicLayout>
                );
            } else {
                return <Spin />
            }
        }
    }
}
export default withRouter(connect(mapProps, mapDispatchToProps)(Site))