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

storiesOf('HeaderBar', module)
    .add('default', () => (
        <div>
            <HeaderBar menu={menu} />
        </div>
    ));