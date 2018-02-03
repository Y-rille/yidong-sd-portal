import * as React from 'react';
import { storiesOf } from '@storybook/react';
import LineChartCard from '../'

let data = {
    kpiId: 4,
    kpiName: '主机.可用内存',
    kpiUnit: 'MB',
    maxValue: '131072',
    minValue: '0',
    threshold: {
        criticalThresholdOperator: '>',
        criticalThresholdValue: '30000',
        kpiId: 4,
        majorThresholdOperator: '>',
        majorThresholdValue: '25000',
        minorThresholdOperator: '>',
        minorThresholdValue: '20000',
        normalThresholdOperator: '>',
        normalThresholdValue: '10000',
        state: 1,
        thresholdId: 1
    },
    val: [13072, 12543, 32121, 13072, 13072, 13072, 13072, 12345, 13072, 13072, 11111, 13221, 13072],
    x_value: ['2018/01/03 19:00', '2018/01/03 19:15', '2018/01/03 19:30', '2018/01/03 19:45', '2018/01/03 20:00',
        '2018/01/03 20:15', '2018/01/03 20:30', '2018/01/03 20:30', '2018/01/03 20:45', '2018/01/03 21:00', '2018/01/03 21:15',
        '2018/01/03 21:30', '2018/01/03 21:45']
}
let deleteCard = () => {
    alert('删除')
}
storiesOf('LineChartCard', module)
    .add('default', () => (
        <div>
            <LineChartCard data={data} deleteCard={deleteCard} />
        </div>
    ))