import * as React from 'react';
import { Spin } from 'antd';

class Loading extends React.Component<any, any> {
    render() {
        return (
            <Spin />
        );
    }
}

export default Loading;