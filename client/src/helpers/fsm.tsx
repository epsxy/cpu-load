import { CPU_THRESHOLD, HISTORY_ARRAY_LENGTH, STREAK_LENGTH } from '../constants/consts';
import { LoadEntry } from '../model/LoadEntry';
import { LoadType } from '../model/LoadType';

const sliceHistory = (history: LoadEntry[]) => {
    return history.length >= HISTORY_ARRAY_LENGTH
        ? history.slice(1, HISTORY_ARRAY_LENGTH)
        : [...history];
};

const computeFirstStates = (history: LoadEntry[], load: number, date: string) => {
    const streak = [...history];
    if (load > CPU_THRESHOLD) {
        streak.push({ date, load, state: LoadType.INCREASING });
    } else {
        streak.push({ date, load, state: LoadType.NORMAL });
    }
    return streak;
};

const cpuAboveThreshold = (history: LoadEntry[], load: number, date: string): LoadEntry[] => {
    const streak = [...history];
    const last = streak[streak.length - 1];

    switch (last.state) {
        case LoadType.HIGH:
            streak.push({ date, load, state: LoadType.HIGH });
            break;
        case LoadType.NORMAL:
            streak.push({ date, load, state: LoadType.INCREASING });
            break;
        case LoadType.RECOVERING:
            streak.push({ date, load, state: LoadType.HIGH });
            break;
        case LoadType.INCREASING:
            const currentIncreasingStreak = [...history]
                .slice(history.length - (STREAK_LENGTH - 1))
                .filter((h) => h.state === LoadType.INCREASING);
            if (currentIncreasingStreak.length === STREAK_LENGTH - 1) {
                streak.push({ date, load, state: LoadType.HIGH });
            } else {
                streak.push({ date, load, state: LoadType.INCREASING });
            }
            break;
    }

    return streak;
};

const cpuBelowThreshold = (history: LoadEntry[], load: number, date: string): LoadEntry[] => {
    const streak = [...history];
    const last = streak[streak.length - 1];

    switch (last.state) {
        case LoadType.HIGH:
            streak.push({ date, load, state: LoadType.RECOVERING });
            break;
        case LoadType.NORMAL:
            streak.push({ date, load, state: LoadType.NORMAL });
            break;
        case LoadType.RECOVERING:
            const currentRecoveringStreak = history
                .slice(history.length - (STREAK_LENGTH - 1))
                .filter((h) => h.state === LoadType.RECOVERING);
            if (currentRecoveringStreak.length === STREAK_LENGTH - 1) {
                streak.push({ date, load, state: LoadType.NORMAL });
            } else {
                streak.push({ date, load, state: LoadType.RECOVERING });
            }
            break;
        case LoadType.INCREASING:
            streak.push({ date, load, state: LoadType.NORMAL });
            break;
    }

    return streak;
};

export const cpuLoadFsm = (history: LoadEntry[], load: number, date: string): LoadEntry[] => {
    const streak = sliceHistory(history);
    if (streak.length < STREAK_LENGTH - 1) {
        return computeFirstStates(streak, load, date);
    }

    if (load > CPU_THRESHOLD) {
        return cpuAboveThreshold(streak, load, date);
    } else {
        return cpuBelowThreshold(streak, load, date);
    }
};

export default cpuLoadFsm;
