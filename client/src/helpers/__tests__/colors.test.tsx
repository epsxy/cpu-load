import { LoadType } from '../../model/LoadType';
import computeGraphColor from '../colors';

describe('Should compute colors', () => {
    it('should return right color for LoadType.NORMAL', () => {
        const res = computeGraphColor(LoadType.NORMAL);

        expect(res).toEqual('lightblue');
    });

    it('should return right color for LoadType.INCREASING', () => {
        const res = computeGraphColor(LoadType.INCREASING);

        expect(res).toEqual('#FFC107');
    });

    it('should return right color for LoadType.HIGH', () => {
        const res = computeGraphColor(LoadType.HIGH);

        expect(res).toEqual('indianred');
    });

    it('should return right color for LoadType.RECOVERING', () => {
        const res = computeGraphColor(LoadType.RECOVERING);

        expect(res).toEqual('#FFC107');
    });

    it('should return default color', () => {
        const res = computeGraphColor(null as any);

        expect(res).toEqual('lightblue');
    });
});
