import * as React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../style/antd.aless'

import FactModal from '../'
import { Button } from 'antd/lib/radio';

let menu = [
    {
        name: 'content1',
        value: 'value1'
    },
    {
        name: 'content2',
        value: 'value2'
    },
    {
        name: 'content3',
        value: 'value3'
    },
    {
        name: 'content4',
        value: 'value4'
    },
    {
        name: 'content5',
        value: 'value5'
    },
]
let defaultMenu = [
    {
        name: 'content1',
        value: 'value1'
    },
    {
        name: 'content3',
        value: 'value3'
    }
]

storiesOf('FactModal', module)
    .add('default', () => (
        <div>
            <FactModal menu={menu} defaultMenu={defaultMenu} visible={true} handleOk={false} handleCancel={false} />
        </div>
    ));