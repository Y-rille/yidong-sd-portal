import * as React from 'react';
import * as _ from 'lodash';

import { Button, Icon, Popover } from 'antd';

declare let global: any;

class Home extends React.Component<any, any> {
    handle() {
        global.hashHistory.push('/alarm')
    }
    render() {
        return (
            <div>
                <div>
                    资源{this.props.name}
                    <Button type="primary" onClick={this.handle}>+</Button>
                </div>
            </div>
        );
    }
}

export default Home;