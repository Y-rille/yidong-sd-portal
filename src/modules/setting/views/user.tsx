import * as React from 'react';
import * as _ from 'lodash';
import styles from '../style/index.less'
import { Switch, Route, Redirect } from 'react-router-dom'
import UserTable from '../../../components/UserTable/'
import UserEditPassword from '../../../components/UserEditPassword/'
import UserEdit from '../container/userEdit'
import UserList from '../container/userList'

class User extends React.PureComponent<UserProps, any> {
    constructor(props) {
        super(props);
    }
    render() {
        let { match } = this.props
        return (
            <Switch>
                <Route path={`${match.url}/create`} component={UserEdit} />
                <Route path={`${match.url}/edit/:userId`} component={UserEdit} />
                <Route path={`${match.url}`} component={UserList} />
            </Switch>
        );
    }
}

export default User;