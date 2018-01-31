import * as React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../style/antd.aless'

import HeaderBar from '../'

let menu = [
    {
        name: '首页',
        route: 'dashboard',
    },
    {
        name: '系统管理',
        route: 'setting',
    },
    {
        name: '资源管理',
        route: 'resource',
    },
    {
        name: '告警监控',
        route: 'alarm',
    },
    {
        name: '性能监控',
        route: 'performance',
    }
]
let handler = () => {
    // console.log('点击退出');
}

let key1 = 'dashboard';
let navClickHandler = (key) => {
    // console.log('route发生改变' + key);
}
storiesOf('HeaderBar', module)
    .add('default', () => (
        <div>
            <HeaderBar menu={menu} activeKey={key1} exitHandler={handler} currentUser={{}} navClickHandler={navClickHandler} />
        </div>
    ));