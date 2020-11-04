import { render, screen } from '@testing-library/react';
import React from 'react';
import TopBar from './TopBar';

test('should render topbar', () => {
    render(<TopBar />);

    const siteName = screen.getByTestId('topbar-sitename');
    const gitUrl = screen.getByTestId('topbar-giturl');
    expect(siteName).toBeInTheDocument();
    expect(siteName).toHaveTextContent('Cpu Load Monitoring');
    expect(gitUrl).toBeInTheDocument();
    expect(gitUrl).toHaveTextContent('Github');
    expect(gitUrl).toHaveAttribute('href', 'https://github.com/epsxy/cpu-load');
});
