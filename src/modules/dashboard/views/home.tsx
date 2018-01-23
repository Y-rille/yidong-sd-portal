import * as React from 'react';
import * as _ from 'lodash';

import { Button, Icon, Popover } from 'antd';

class Home extends React.Component<any, any> {
    render() {
        return (
            <div>
                <div>
                    dashboard{this.props.name}
                </div>
            </div>
        );
    }
}

export default Home;