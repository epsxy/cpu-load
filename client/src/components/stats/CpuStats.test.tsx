import { render, screen } from '@testing-library/react';
import React from 'react';
import { LoadType } from '../../model/LoadType';
import CpuStats from './CpuStats';

test('should render stats with empty value', () => {
    render(<CpuStats history={[]} />);

    const highLoadStats = screen.getByTestId('stats-high');
    const recovStats = screen.getByTestId('stats-recov');
    const tableElements = screen.queryAllByTestId('stats-table');
    expect(highLoadStats).toBeInTheDocument();
    expect(highLoadStats).toHaveTextContent('High load: 0');
    expect(recovStats).toBeInTheDocument();
    expect(recovStats).toHaveTextContent('Recovered: 0');
    expect(tableElements).toHaveLength(0);
});

test('should render stats with several values', () => {
    const history = [
        { state: LoadType.HIGH, begin: '10:02:00', end: '10:02:40' },
        { state: LoadType.NORMAL, begin: '10:04:40', end: '10:04:40' },
        { state: LoadType.HIGH, begin: '10:06:40', end: '10:08:40' },
    ];

    render(<CpuStats history={history} />);

    const highLoadStats = screen.getByTestId('stats-high');
    const recovStats = screen.getByTestId('stats-recov');
    const tableElements = screen.getAllByTestId('stats-table');
    expect(highLoadStats).toBeInTheDocument();
    expect(highLoadStats).toHaveTextContent('High load: 2');
    expect(recovStats).toBeInTheDocument();
    expect(recovStats).toHaveTextContent('Recovered: 1');
    expect(tableElements).toHaveLength(3);
    expect(tableElements[0]).toHaveTextContent('High');
    expect(tableElements[0]).toHaveTextContent('10:02:00 - 10:02:40');
    expect(tableElements[1]).toHaveTextContent('Recov');
    expect(tableElements[1]).toHaveTextContent('10:04:40');
    expect(tableElements[2]).toHaveTextContent('High');
    expect(tableElements[2]).toHaveTextContent('10:06:40 - 10:08:40');
});
