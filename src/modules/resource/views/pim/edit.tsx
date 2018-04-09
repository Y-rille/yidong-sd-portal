import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'

import styles from '../../style/index.less'

class Edit extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    render() {
        let { match, subDataCenter, subDataVendor } = this.props
        return (
            <div>
                批量更新
            </div>
        )

    }
}
export default Edit;