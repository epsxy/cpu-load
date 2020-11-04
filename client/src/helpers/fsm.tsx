import { CPU_THRESHOLD, HISTORY_ARRAY_LENGTH, STREAK_LENGTH } from '../constants/consts';
import { LoadEntry } from '../model/LoadEntry';
import { LoadType } from '../model/LoadType';

export const cpuLoadFsm = (history: LoadEntry[], load: number, date: string): LoadEntry[] => {
    const streak = history.length >= HISTORY_ARRAY_LENGTH ? history.slice(1, HISTORY_ARRAY_LENGTH) : [...history];
    if (history.length < STREAK_LENGTH - 1) {
        if (load > CPU_THRESHOLD) {
            streak.push({ date, load, state: LoadType.INCREASING });
        } else {
            streak.push({ date, load, state: LoadType.NORMAL });
        }
    } else {
        if (load > CPU_THRESHOLD) {
            switch (history[history.length - 1].state) {
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
                    const latest = [...history]
                        .slice(history.length - (STREAK_LENGTH - 1))
                        .filter((h) => h.state === LoadType.INCREASING);
                    if (latest.length === STREAK_LENGTH - 1) {
                        streak.push({ date, load, state: LoadType.HIGH });
                    } else {
                        streak.push({ date, load, state: LoadType.INCREASING });
                    }
                    break;
            }
        } else {
            switch (history[history.length - 1].state) {
                case LoadType.HIGH:
                    streak.push({ date, load, state: LoadType.RECOVERING });
                    break;
                case LoadType.NORMAL:
                    streak.push({ date, load, state: LoadType.NORMAL });
                    break;
                case LoadType.RECOVERING:
                    const latest = history
                        .slice(history.length - (STREAK_LENGTH - 1))
                        .filter((h) => h.state === LoadType.RECOVERING);
                    if (latest.length === STREAK_LENGTH - 1) {
                        streak.push({ date, load, state: LoadType.NORMAL });
                    } else {
                        streak.push({ date, load, state: LoadType.RECOVERING });
                    }
                    break;
                case LoadType.INCREASING:
                    streak.push({ date, load, state: LoadType.NORMAL });
                    break;
            }
        }
    }
    return streak;
};

export default cpuLoadFsm;
