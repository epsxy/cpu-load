import { LoadEvent } from '../model/LoadEvent';
import { LoadEntry } from '../model/LoadEntry';
import { LoadType } from '../model/LoadType';

export const isFreshHeavyState = (previous: LoadEntry, current: LoadEntry): boolean => {
    return previous.state === LoadType.INCREASING && current.state === LoadType.HIGH;
};

export const isContinuingHeavyState = (previous: LoadEntry, current: LoadEntry): boolean => {
    return previous.state === LoadType.HIGH && current.state === LoadType.HIGH;
};

export const isHeavyStateAfterRecoveringFailed = (previous: LoadEntry, current: LoadEntry): boolean => {
    return previous.state === LoadType.RECOVERING && current.state === LoadType.HIGH;
};

export const isFreshNormalState = (previous: LoadEntry, current: LoadEntry): boolean => {
    return previous.state === LoadType.RECOVERING && current.state === LoadType.NORMAL;
};

export const computeLoadEvents = (history: LoadEntry[]): LoadEvent[] => {
    const res: LoadEvent[] = [];
    history.forEach((entry) => {
        const currentIdx = history.indexOf(entry);
        if (currentIdx >= 1) {
            if (entry.state === LoadType.HIGH) {
                if (res.length === 0 || res[res.length - 1].state !== LoadType.HIGH) {
                    res.push({ begin: entry.date, state: LoadType.HIGH, end: entry.date });
                } else {
                    res[res.length - 1].end = entry.date;
                }
            } else if (isFreshNormalState(history[currentIdx - 1], entry)) {
                res.push({ begin: entry.date, state: LoadType.NORMAL, end: entry.date });
            }
        } else {
            if (entry.state === LoadType.HIGH) {
                res.push({ begin: entry.date, state: LoadType.HIGH, end: entry.date });
            }
        }
    });
    return res;
};

export default {
    isFreshHeavyState,
    isContinuingHeavyState,
    isHeavyStateAfterRecoveringFailed,
    isFreshNormalState,
    computeLoadEvents,
};
