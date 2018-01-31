import * as React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../style/antd.aless'

import InstrumentCard from '../../../components/InstrumentCard'

let data = {
    title: '速度',
    min: 0,
    max: 100,
    current: 65,
    gradient: false
}

storiesOf('InstrumentCard', module)
    .add('default', () => (
        <div>
            <InstrumentCard data={data} />
        </div>
    ));