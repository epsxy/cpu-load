import React from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { computeGraphColor } from '../../helpers/colors';
import { LoadEntry } from '../../model/LoadEntry';
import { LoadType } from '../../model/LoadType';
import { GraphResponsiveContainer } from './CpuChartStyle';

function CpuChart(props: { data: LoadEntry[] }) {
    const getLatestState = () => (props.data.length > 0 ? props.data[props.data.length - 1].state : LoadType.NORMAL);
    return (
        <GraphResponsiveContainer data-testid="chart-container" width="90%" height={500}>
            <AreaChart data={props.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis data-testid="chart-xaxis" dataKey="date" />
                <YAxis />
                <Tooltip wrapperStyle={{ border: '2px solid black' }} contentStyle={{ border: 'none' }} />
                <Area
                    type="linear"
                    dataKey="load"
                    stroke={computeGraphColor(getLatestState())}
                    fill={computeGraphColor(getLatestState())}
                />
            </AreaChart>
        </GraphResponsiveContainer>
    );
}

export default CpuChart;
