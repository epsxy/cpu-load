import React from 'react';
import { Root, TopBarElement } from './TopBarStyle';

function TopBar() {
    return (
        <Root>
            <TopBarElement
                data-testid="topbar-sitename"
                href={`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}
            >
                Cpu Load Monitoring
            </TopBarElement>
            <TopBarElement data-testid="topbar-giturl" href="https://github.com/epsxy/cpu-load">
                Github
            </TopBarElement>
        </Root>
    );
}

export default TopBar;
