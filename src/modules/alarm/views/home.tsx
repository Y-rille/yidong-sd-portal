import * as React from 'react';
import * as _ from 'lodash';

import { Button, Icon, Popover } from 'antd';

class Home extends React.Component<any, any> {
    render() {
        if (!this.props.currentUser) {
            return <div />
        }
        return (
            <div style={{ height: window.innerHeight - 64, width: window.innerWidth }}>
                <iframe style={{ width: '100%', height: '100%' }} src={`http://47.94.4.45:8080/alarm-mntr/flex/main.html?userId=${this.props.currentUser.id}`}></iframe>
            </div>
        );
    }
}

export default Home;