import { LoadType } from '../../model/LoadType';
import { cpuLoadFsm } from '../fsm';

describe('Should compute NewState = fsm(OldState, newLoadValue)', () => {
    it('should transition `null` -> NORMAL', () => {
        const res = cpuLoadFsm([], 1, '10:00:00');

        expect(res).toEqual([{ state: LoadType.NORMAL, load: 1, date: '10:00:00' }]);
    });

    it('should transition `null` -> INCREASING', () => {
        const res = cpuLoadFsm([], 1.1, '10:00:00');

        expect(res).toEqual([{ state: LoadType.INCREASING, load: 1.1, date: '10:00:00' }]);
    });

    it('should transition NORMAL -> NORMAL (small array)', () => {
        const res = cpuLoadFsm([{ state: LoadType.NORMAL, load: 1, date: '10:00:00' }], 1, '10:00:10');

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '10:00:00' },
            { state: LoadType.NORMAL, load: 1, date: '10:00:10' },
        ]);
    });

    it('should transition INCREASING -> INCREASING (small array)', () => {
        const res = cpuLoadFsm([{ state: LoadType.INCREASING, load: 1.1, date: '10:00:00' }], 1.1, '10:00:10');

        expect(res).toEqual([
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:00' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:10' },
        ]);
    });

    it('should transition NORMAL -> INCREASING (small array)', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.NORMAL, load: 1, date: '10:00:00' },
                { state: LoadType.NORMAL, load: 1, date: '10:00:10' },
                { state: LoadType.NORMAL, load: 1, date: '10:00:20' },
                { state: LoadType.NORMAL, load: 1, date: '10:00:30' },
            ],
            1.1,
            '10:00:40',
        );

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '10:00:00' },
            { state: LoadType.NORMAL, load: 1, date: '10:00:10' },
            { state: LoadType.NORMAL, load: 1, date: '10:00:20' },
            { state: LoadType.NORMAL, load: 1, date: '10:00:30' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:40' },
        ]);
    });

    it('should transition INCREASING -> NORMAL (small array)', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.INCREASING, load: 1.1, date: '10:00:00' },
                { state: LoadType.INCREASING, load: 1.1, date: '10:00:10' },
                { state: LoadType.INCREASING, load: 1.1, date: '10:00:20' },
                { state: LoadType.INCREASING, load: 1.1, date: '10:00:30' },
            ],
            1,
            '10:00:40',
        );

        expect(res).toEqual([
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:00' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:10' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:20' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:30' },
            { state: LoadType.NORMAL, load: 1, date: '10:00:40' },
        ]);
    });

    it('should transition NORMAL -> INCREASING -> HIGH', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.NORMAL, load: 1, date: '' },
                ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            ],
            1.1,
            '',
        );

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '' },
            ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            { state: LoadType.HIGH, load: 1.1, date: '' },
        ]);
    });

    it('should transition at the beginning INCREASING -> HIGH', () => {
        const input = Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' });
        const res = cpuLoadFsm(input, 1.1, '');

        expect(res).toEqual([
            ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            { state: LoadType.HIGH, load: 1.1, date: '' },
        ]);
    });

    it('should transition HIGH -> HIGH', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.NORMAL, load: 1, date: '' },
                ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
                { state: LoadType.HIGH, load: 1.1, date: '' },
            ],
            1.1,
            '',
        );

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '' },
            ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.HIGH, load: 1.1, date: '' },
        ]);
    });

    it('should transition HIGH -> RECOVERING', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.NORMAL, load: 1, date: '' },
                ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
                { state: LoadType.HIGH, load: 1.1, date: '' },
                { state: LoadType.HIGH, load: 1.1, date: '' },
            ],
            0.9,
            '',
        );

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '' },
            ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.RECOVERING, load: 0.9, date: '' },
        ]);
    });

    it('should transition RECOVERING -> HIGH', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.NORMAL, load: 1, date: '' },
                ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
                { state: LoadType.HIGH, load: 1.1, date: '' },
                { state: LoadType.HIGH, load: 1.1, date: '' },
                { state: LoadType.RECOVERING, load: 0.9, date: '' },
            ],
            1.2,
            '',
        );

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '' },
            ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.RECOVERING, load: 0.9, date: '' },
            { state: LoadType.HIGH, load: 1.2, date: '' },
        ]);
    });

    it('should transition RECOVERING -> RECOVERING', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.NORMAL, load: 1, date: '' },
                ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
                { state: LoadType.HIGH, load: 1.1, date: '' },
                { state: LoadType.HIGH, load: 1.1, date: '' },
                { state: LoadType.RECOVERING, load: 0.9, date: '' },
            ],
            0.8,
            '',
        );

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '' },
            ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.RECOVERING, load: 0.9, date: '' },
            { state: LoadType.RECOVERING, load: 0.8, date: '' },
        ]);
    });

    it('should transition RECOVERING -> NORMAL', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.NORMAL, load: 1, date: '' },
                ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
                { state: LoadType.HIGH, load: 1.1, date: '' },
                { state: LoadType.HIGH, load: 1.1, date: '' },
                ...Array(11).fill({ state: LoadType.RECOVERING, load: 0.9, date: '' }),
            ],
            0.9,
            '',
        );

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '' },
            ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.HIGH, load: 1.1, date: '' },
            ...Array(11).fill({ state: LoadType.RECOVERING, load: 0.9, date: '' }),
            { state: LoadType.NORMAL, load: 0.9, date: '' },
        ]);
    });

    it('should transition NORMAL -> NORMAL (big array)', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.NORMAL, load: 1, date: '' },
                ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
                { state: LoadType.HIGH, load: 1.1, date: '' },
                { state: LoadType.HIGH, load: 1.1, date: '' },
                ...Array(11).fill({ state: LoadType.RECOVERING, load: 0.9, date: '' }),
                { state: LoadType.NORMAL, load: 0.9, date: '' },
            ],
            0.7,
            '',
        );

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '' },
            ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.HIGH, load: 1.1, date: '' },
            ...Array(11).fill({ state: LoadType.RECOVERING, load: 0.9, date: '' }),
            { state: LoadType.NORMAL, load: 0.9, date: '' },
            { state: LoadType.NORMAL, load: 0.7, date: '' },
        ]);
    });

    it('should transition NORMAL -> INCREASING (big array)', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.NORMAL, load: 1, date: '' },
                ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
                { state: LoadType.HIGH, load: 1.1, date: '' },
                { state: LoadType.HIGH, load: 1.1, date: '' },
                ...Array(11).fill({ state: LoadType.RECOVERING, load: 0.9, date: '' }),
                { state: LoadType.NORMAL, load: 0.9, date: '' },
                { state: LoadType.NORMAL, load: 0.7, date: '' },
            ],
            1.1,
            '',
        );

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '' },
            ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.HIGH, load: 1.1, date: '' },
            ...Array(11).fill({ state: LoadType.RECOVERING, load: 0.9, date: '' }),
            { state: LoadType.NORMAL, load: 0.9, date: '' },
            { state: LoadType.NORMAL, load: 0.7, date: '' },
            { state: LoadType.INCREASING, load: 1.1, date: '' },
        ]);
    });

    it('should transition INCREASING -> INCREASING (big array)', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.NORMAL, load: 1, date: '' },
                ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
                { state: LoadType.HIGH, load: 1.1, date: '' },
                { state: LoadType.HIGH, load: 1.1, date: '' },
                ...Array(11).fill({ state: LoadType.RECOVERING, load: 0.9, date: '' }),
                { state: LoadType.NORMAL, load: 0.9, date: '' },
                { state: LoadType.NORMAL, load: 0.7, date: '' },
                { state: LoadType.INCREASING, load: 1.1, date: '' },
            ],
            1.2,
            '',
        );

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '' },
            ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.HIGH, load: 1.1, date: '' },
            ...Array(11).fill({ state: LoadType.RECOVERING, load: 0.9, date: '' }),
            { state: LoadType.NORMAL, load: 0.9, date: '' },
            { state: LoadType.NORMAL, load: 0.7, date: '' },
            { state: LoadType.INCREASING, load: 1.1, date: '' },
            { state: LoadType.INCREASING, load: 1.2, date: '' },
        ]);
    });

    it('should transition INCREASING -> NORMAL (big array)', () => {
        const res = cpuLoadFsm(
            [
                { state: LoadType.NORMAL, load: 1, date: '' },
                ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
                { state: LoadType.HIGH, load: 1.1, date: '' },
                { state: LoadType.HIGH, load: 1.1, date: '' },
                ...Array(11).fill({ state: LoadType.RECOVERING, load: 0.9, date: '' }),
                { state: LoadType.NORMAL, load: 0.9, date: '' },
                { state: LoadType.NORMAL, load: 0.7, date: '' },
                { state: LoadType.INCREASING, load: 1.1, date: '' },
                { state: LoadType.INCREASING, load: 1.2, date: '' },
            ],
            0.9,
            '',
        );

        expect(res).toEqual([
            { state: LoadType.NORMAL, load: 1, date: '' },
            ...Array(11).fill({ state: LoadType.INCREASING, load: 1.1, date: '' }),
            { state: LoadType.HIGH, load: 1.1, date: '' },
            { state: LoadType.HIGH, load: 1.1, date: '' },
            ...Array(11).fill({ state: LoadType.RECOVERING, load: 0.9, date: '' }),
            { state: LoadType.NORMAL, load: 0.9, date: '' },
            { state: LoadType.NORMAL, load: 0.7, date: '' },
            { state: LoadType.INCREASING, load: 1.1, date: '' },
            { state: LoadType.INCREASING, load: 1.2, date: '' },
            { state: LoadType.NORMAL, load: 0.9, date: '' },
        ]);
    });

    it('should never exceed a length HISTORY_ARRAY_LENGTH(=60 default value)', () => {
        const input = Array(60).fill({ state: LoadType.NORMAL, load: 0.9, date: '10:04:30' });

        const res = cpuLoadFsm(input, 1.9, '');

        expect(input).toHaveLength(60);
        expect(res).toHaveLength(60);
        expect(res[59]).toEqual({ state: LoadType.INCREASING, load: 1.9, date: '' });
    });
});
