import * as React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../style/antd.aless'

import UserForm from '../'

let userInfo = {
    'id': '10000000',
    'email': '11@11.com',
    'name': '张三',
    'mobile': '13211111111',
    'avatar': 'http://url',
    'remark': '备注信息',
    'roles': 'performance,resource'
}

storiesOf('UserForm', module)
    .add('create', () => (
        <div>
            <UserForm
                wrappedComponentRef={(node) => { this.formRef = node }}
            />
        </div>
    ))
    .add('edit', () => (
        <div>
            <UserForm
                userInfo={userInfo}
                wrappedComponentRef={(node) => { this.formRef = node }}
            />
        </div>
    ));