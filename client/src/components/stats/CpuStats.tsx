import React from 'react';
import { LoadEvent } from '../../model/LoadEvent';
import { LoadType } from '../../model/LoadType';
import { Container, InfosContainer, InfosLabel, InfosValue, Root, Table, TBody, Td, Th, Tr } from './CpuStatsStyle';

function CpuStats(props: { history: LoadEvent[] }) {
    return (
        <Root>
            <Container>
                <InfosLabel>Stats</InfosLabel>
            </Container>
            <InfosContainer>
                <InfosValue data-testid="stats-high">
                    High load: {props.history.filter((e) => e.state === LoadType.HIGH).length}
                </InfosValue>
                <InfosValue data-testid="stats-recov">
                    Recovered: {props.history.filter((e) => e.state === LoadType.NORMAL).length}
                </InfosValue>
            </InfosContainer>
            <div>
                <Table>
                    <thead>
                        <Tr>
                            <Th>State</Th>
                            <Th>Time interval</Th>
                        </Tr>
                    </thead>
                    <TBody>
                        {props.history.map((s) => {
                            return (
                                <Tr
                                    data-testid="stats-table"
                                    key={props.history.indexOf(s)}
                                    style={{
                                        backgroundColor: s.state === LoadType.HIGH ? 'indianred' : 'lightblue',
                                    }}
                                >
                                    <Td>{s.state === LoadType.HIGH ? 'High' : 'Recov'}</Td>
                                    <Td>{s.state === LoadType.HIGH ? `${s.begin} - ${s.end}` : `${s.begin}`}</Td>
                                </Tr>
                            );
                        })}
                    </TBody>
                </Table>
            </div>
        </Root>
    );
}

export default CpuStats;
