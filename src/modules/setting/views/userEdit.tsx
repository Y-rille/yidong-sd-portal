import * as React from 'react';
import styles from '../style/index.less'
import * as _ from 'lodash';
import UserForm from '../../../components/UserForm/'

export interface UserEditProps {
}

class UserEdit extends React.PureComponent<UserEditProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            // listLoading: false
        };
    }
    render() {
        return (
            <div>
                <UserForm />
            </div>
        )
    }
}
export default UserEdit;