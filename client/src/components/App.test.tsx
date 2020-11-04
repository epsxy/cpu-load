import fetch from 'jest-fetch-mock';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from './App';

beforeEach(() => {
    fetch.resetMocks();
});

test('should render app with first normal value', async () => {
    fetch.mockResponseOnce(JSON.stringify({ value: 0.5 }));

    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Infos
    const value = screen.getByTestId('cpuinfos-value');
    const state = screen.getByTestId('cpuinfos-state');
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent('0.5');
    expect(state).toBeInTheDocument();
    expect(state).toHaveTextContent('NORMAL LOAD');

    // Stats
    const highLoadStats = screen.getByTestId('stats-high');
    const recovStats = screen.getByTestId('stats-recov');
    const tableElements = screen.queryAllByTestId('stats-table');
    expect(highLoadStats).toBeInTheDocument();
    expect(highLoadStats).toHaveTextContent('High load: 0');
    expect(recovStats).toBeInTheDocument();
    expect(recovStats).toHaveTextContent('Recovered: 0');
    expect(tableElements).toHaveLength(0);
});

test('should render app with first high value', async () => {
    fetch.mockResponseOnce(JSON.stringify({ value: 1.5 }));

    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const value = screen.getByTestId('cpuinfos-value');
    const state = screen.getByTestId('cpuinfos-state');
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent('1.5');
    expect(state).toBeInTheDocument();
    expect(state).toHaveTextContent('INCREASING LOAD');

    // Stats
    const highLoadStats = screen.getByTestId('stats-high');
    const recovStats = screen.getByTestId('stats-recov');
    const tableElements = screen.queryAllByTestId('stats-table');
    expect(highLoadStats).toBeInTheDocument();
    expect(highLoadStats).toHaveTextContent('High load: 0');
    expect(recovStats).toBeInTheDocument();
    expect(recovStats).toHaveTextContent('Recovered: 0');
    expect(tableElements).toHaveLength(0);
});
