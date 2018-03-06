import * as React from 'react';
import * as _ from 'lodash';

import { Button, Icon, Popover } from 'antd';

class Home extends React.Component<any, any> {
    render() {
        if (!this.props.currentUser) {
            return <div />
        }
        return (
            <div style={{ height: window.innerHeight - 64, width: '100%' }}>
                <iframe style={{ width: '100%', height: '100%' }} src={`http://47.94.4.45:5601/app/kibana#/discover?_g=()`}></iframe>
                {/* <iframe style={{ width: '100%', height: '100%' }} src={`http://47.94.4.45:5601/app/kibana#?_g=()`}></iframe> */}
            </div>
        );
    }
}

export default Home;