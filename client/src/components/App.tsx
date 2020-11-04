import React, { useEffect, useState } from 'react';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { REFRESH_TIMER_MS } from './../constants/consts';
import { cpuLoadFsm } from './../helpers/fsm';
import { triggerNotify } from './../helpers/notifications';
import { computeLoadEvents } from './../helpers/stats';
import { LoadEvent } from './../model/LoadEvent';
import { LoadEntry } from '../model/LoadEntry';
import { LoadType } from './../model/LoadType';
import { Content, Root } from './AppStyle';
import CpuChart from './graph/CpuChart';
import CpuInfos from './infos/CpuInfos';
import CpuStats from './stats/CpuStats';
import TopBar from './topbar/TopBar';

function App() {
    const [loadHistory, setLoadHistory] = useState([] as LoadEntry[]);
    const [currentType, setCurrentType] = useState(LoadType.NORMAL as LoadType);
    const [loadEvents, setLoadEvents] = useState([] as LoadEvent[]);

    const notify = (title: string, message: string, type: 'success' | 'danger') => {
        store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
                duration: 5000,
                onScreen: true,
            },
        });
    };

    const fetchData = () => {
        const port = process.env.NODE_ENV === 'development' ? 3000 : window.location.port;
        fetch(`${window.location.protocol}//${window.location.hostname}:${port}/api/cpu/load`)
            .then((res) => res.json())
            .then((json) => Math.round(parseFloat(json.value) * 100) / 100)
            .then((load) => {
                const newState = cpuLoadFsm(loadHistory, load, new Date().toLocaleTimeString());
                const newType = newState[newState.length - 1].state;
                triggerNotify(currentType, newType, notify);
                setCurrentType(newType);
                setLoadHistory(newState);
                setLoadEvents(computeLoadEvents(newState));
            });
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            fetchData();
        }, REFRESH_TIMER_MS);
        return () => clearInterval(timer);
    });

    return (
        <Root>
            <ReactNotification />
            <TopBar />
            <Content>
                <CpuInfos current={loadHistory[loadHistory.length - 1]} />
                <CpuChart data={loadHistory} />
                <CpuStats history={loadEvents} />
            </Content>
        </Root>
    );
}

export default App;
