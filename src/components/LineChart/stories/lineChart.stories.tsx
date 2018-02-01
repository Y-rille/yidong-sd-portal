import * as React from 'react';
import { storiesOf } from '@storybook/react';
import LineChart from '../'

let data = [{
    name: '2018-1-30',
    color: '#5CCBAE',
    data: [34, 40, 77, 58, 41, 31, 33, 75, 43, 82, 21, 4]
}]
storiesOf('LineChart', module)
    .add('default', () => (
        <div>
            <LineChart data={data} />
        </div>
    ));