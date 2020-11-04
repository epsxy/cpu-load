import { render, screen } from '@testing-library/react';
import React from 'react';
import { LoadType } from '../../model/LoadType';
import CpuInfos from './CpuInfos';

test('should render infos with undefined value', () => {
    render(<CpuInfos current={undefined} />);

    const value = screen.getByTestId('cpuinfos-value');
    const state = screen.getByTestId('cpuinfos-state');
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent('-');
    expect(state).toBeInTheDocument();
    expect(state).toHaveTextContent('- LOAD');
});

test('should render LoadType.NORMAL infos', () => {
    render(<CpuInfos current={{ date: '00:00:00', state: LoadType.NORMAL, load: 0.5 }} />);

    const root = screen.getByTestId('cpuinfos-root');
    const value = screen.getByTestId('cpuinfos-value');
    const state = screen.getByTestId('cpuinfos-state');
    expect(root).toHaveStyle('text-shadow: 5px 5px lightblue');
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent('0.5');
    expect(state).toBeInTheDocument();
    expect(state).toHaveTextContent('NORMAL LOAD');
});

test('should render LoadType.INCREASING infos', () => {
    render(<CpuInfos current={{ date: '00:00:00', state: LoadType.INCREASING, load: 1.5 }} />);

    const root = screen.getByTestId('cpuinfos-root');
    const value = screen.getByTestId('cpuinfos-value');
    const state = screen.getByTestId('cpuinfos-state');
    expect(root).toHaveStyle('text-shadow: 5px 5px #FFC107');
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent('1.5');
    expect(state).toBeInTheDocument();
    expect(state).toHaveTextContent('INCREASING LOAD');
});

test('should render LoadType.HIGH infos', () => {
    render(<CpuInfos current={{ date: '00:00:00', state: LoadType.HIGH, load: 1.5 }} />);

    const root = screen.getByTestId('cpuinfos-root');
    const value = screen.getByTestId('cpuinfos-value');
    const state = screen.getByTestId('cpuinfos-state');
    expect(root).toHaveStyle('text-shadow: 5px 5px indianred');
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent('1.5');
    expect(state).toBeInTheDocument();
    expect(state).toHaveTextContent('HIGH LOAD');
});

test('should render LoadType.RECOVERING infos', () => {
    render(<CpuInfos current={{ date: '00:00:00', state: LoadType.RECOVERING, load: 0.5 }} />);

    const root = screen.getByTestId('cpuinfos-root');
    const value = screen.getByTestId('cpuinfos-value');
    const state = screen.getByTestId('cpuinfos-state');
    expect(root).toHaveStyle('text-shadow: 5px 5px #FFC107');
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent('0.5');
    expect(state).toBeInTheDocument();
    expect(state).toHaveTextContent('RECOVERING LOAD');
});
