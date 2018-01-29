import * as React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../style/antd.aless'

import FactModal from '../'

let menu = [
    {
        name: 'content1',
        value: 'content1'
    },
    {
        name: 'content2',
        value: 'content2'
    },
    {
        name: 'content3',
        value: 'content3'
    },
    {
        name: 'content4',
        value: 'content4'
    },
    {
        name: 'content5',
        value: 'content5'
    },
]

storiesOf('FactModal', module)
    .add('default', () => (
        <div>
            <FactModal menu={menu} />
        </div>
    ));