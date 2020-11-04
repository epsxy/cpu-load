import React from 'react';
import { computeGraphColor } from '../../helpers/colors';
import { LoadEntry } from '../../model/LoadEntry';
import { InfosLabel, LoadValue, Root } from './CpuInfosStyle';

function CpuInfos(props: { current?: LoadEntry }) {
    return (
        <Root
            data-testid="cpuinfos-root"
            style={{ textShadow: `5px 5px ${!!props.current ? computeGraphColor(props.current.state) : 'black'}` }}
        >
            <InfosLabel>Current</InfosLabel>
            <LoadValue data-testid="cpuinfos-value">{!!props.current ? props.current.load : '-'}</LoadValue>
            <InfosLabel data-testid="cpuinfos-state">{!!props.current ? props.current.state : '-'} LOAD</InfosLabel>
        </Root>
    );
}

export default CpuInfos;
