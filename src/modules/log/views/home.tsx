import * as React from 'react';
import * as _ from 'lodash';

import { Button, Icon, Popover } from 'antd';

class Home extends React.Component<any, any> {
    render() {
        let { config } = this.props
        if (!this.props.currentUser) {
            return <div />
        }
        return (
            <div style={{ height: window.innerHeight - 68, width: '100%' }}>
                <iframe style={{ width: '100%', height: '100%', border: '0px' }} src={config.log}></iframe>
            </div>
        );
    }
}

export default Home;