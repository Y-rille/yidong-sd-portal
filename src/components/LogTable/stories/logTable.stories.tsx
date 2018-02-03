import * as React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../style/antd.aless'

import LogTable from '../'

let page_num = 1
let page_size = 8
let logList = {
    'count': 100,
    'rows':
    [
        {
            'id': '10000000',
            'user': {
                'id': '10000000',
                'email': '11@11.com',
                'name': '张三',
                'mobile': '13211111111',
                'avatar': 'http://url',
                'remark': '备注信息'
            },
            'action': 'login',
            'message': '登入系统',
            'create_time': '2018-01-30 10:10:10'
        },
        {
            'id': '10000000',
            'user': {
                'id': '10000000',
                'email': '11@11.com',
                'name': '张三',
                'mobile': '13211111111',
                'avatar': 'http://url',
                'remark': '备注信息'
            },
            'action': 'login',
            'message': '登入系统',
            'create_time': '2018-01-30 10:10:10'
        }
    ]
}
let goPage = (key) => {
    // console.log('route发生改变' + key);
}

storiesOf('LogTable', module)
    .add('table', () => (
        <div>
            <LogTable
                goPage={goPage}
                page_num={page_num}
                page_size={page_size}
                logList={logList}
            />
        </div>
    ));