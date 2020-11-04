import { CPU_THRESHOLD, STREAK_DURATION_MS } from '../constants/consts';
import { LoadType } from '../model/LoadType';

export const generateMessage = (load: LoadType): { title: string; message: string; type: 'danger' | 'success' } => {
    const title = load === LoadType.HIGH ? 'High Load' : 'Recovered';
    const message =
        load === LoadType.HIGH
            ? `The average CPU load has exceeded ${CPU_THRESHOLD} for ${STREAK_DURATION_MS / 60000} minutes`
            : `The average CPU load has dropped below ${CPU_THRESHOLD} for ${STREAK_DURATION_MS / 60000} minutes`;
    const type = load === LoadType.HIGH ? 'danger' : 'success';
    return { title, message, type };
};

export const triggerNotify = (
    previousType: LoadType,
    newType: LoadType,
    callback: (title: string, message: string, type: 'success' | 'danger') => void,
) => {
    if (previousType === LoadType.INCREASING && newType === LoadType.HIGH) {
        const { title, message, type } = generateMessage(LoadType.HIGH);
        callback(title, message, type);
    } else if (previousType === LoadType.RECOVERING && newType === LoadType.NORMAL) {
        const { title, message, type } = generateMessage(LoadType.NORMAL);
        callback(title, message, type);
    }
};

export default { generateMessage, triggerNotify };
