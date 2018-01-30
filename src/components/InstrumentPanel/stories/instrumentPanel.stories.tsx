import * as React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../style/antd.aless'

import InstrumentPanel from '../'

let data = {
    title: '速度',
    min: 0,
    max: 100,
    current: 60
}

storiesOf('InstrumentPanel', module)
    .add('default', () => (
        <div>
            <InstrumentPanel data={data} />
        </div>
    ));