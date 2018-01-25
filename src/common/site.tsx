import * as React from 'react';
import * as PropTypes from 'prop-types';
import BasicLayout from '../layouts/BasicLayout'
import UserLayout from '../layouts/UserLayout'

const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router'
import HomeActionCreatorsMap, { CommonActions } from '../modules/common/actions/index'

import emitter from './emitter'

declare let global: any;

function mapProps(state: any) {
    return {
        collapsed: state.commonReducer.collapsed,
        fetchingNotices: state.commonReducer.fetchingNotices,
        notices: state.commonReducer.notices,
        locale: state.commonReducer.locale,
        currentUser: state.commonReducer.currentUser,
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
    currentUser?
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
        this.state = {
            curRouter: this.props.location.pathname
        }
    }
    navClickHandler(key) {
        global.hashHistory.push(`/${key}`)
    }
    componentWillMount() {

    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        if (this.props.location.pathname.indexOf('/login') > -1) {
            return (
                <UserLayout>
                    {this.props.children}
                </UserLayout>
            );
        } else {
            let { currentUser } = this.props
            let { pathname } = this.props.location
            pathname = pathname.split('/')
            // console.log(pathname, 'qqqq');
            // console.log(pathname[1], 'wwww');
            return (
                <BasicLayout
                    navClickHandler={this.navClickHandler}
                    isActive={pathname.length > 1 ? pathname[1] : ''}>
                    {this.props.children}
                </BasicLayout>
            );
        }
    }
}
export default withRouter(connect(mapProps, mapDispatchToProps)(Site))