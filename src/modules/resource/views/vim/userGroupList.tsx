import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { matchPath } from 'react-router'
class UserGroupList extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/vim/:id/user_group/:type'
        })
        this.state = {
            type: mp_node ? mp_node.params.type : '',
        }
    }
    render() {
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/vim/:id/user_group/:type'
        })
        let type = mp_node ? mp_node.params.type : ''
        let { match, nodeInfo, config } = this.props
        let src = (type === 'user') ? `${config.vim_manage_link.user}` : `${config.vim_manage_link.group}`
        return (
            <div style={{ paddingTop: '20px', height: window.innerHeight - 284 }}>
                <iframe style={{ width: '100%', height: '100%', border: '1px solid #e2e4e9' }} src={src}></iframe>
            </div>
        );
    }

}
export default UserGroupList;