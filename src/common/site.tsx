import * as React from 'react';
import * as PropTypes from 'prop-types';
import BasicLayout from '../layouts/BasicLayout'

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
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    constructor(props: any) {
        super(props);
    }
    componentWillMount() {

    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        let { currentUser } = this.props
        return (
            <BasicLayout>
                {this.props.children}
            </BasicLayout>
        );
    }
}
export default withRouter(connect(mapProps, mapDispatchToProps)(Site))