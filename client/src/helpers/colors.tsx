import { LoadType } from '../model/LoadType';

export const computeGraphColor = (type: LoadType): string => {
    switch (type) {
        case LoadType.HIGH:
            return 'indianred';
        case LoadType.NORMAL:
            return 'lightblue';
        case LoadType.INCREASING:
            return '#FFC107';
        case LoadType.RECOVERING:
            return '#FFC107';
        default:
            return 'lightblue';
    }
};

export default computeGraphColor;
