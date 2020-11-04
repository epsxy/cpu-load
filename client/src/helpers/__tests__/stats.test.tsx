import { LoadEntry } from '../../model/LoadEntry';
import { LoadType } from '../../model/LoadType';
import {
    computeLoadEvents,
    isContinuingHeavyState,
    isFreshHeavyState,
    isFreshNormalState,
    isHeavyStateAfterRecoveringFailed,
} from '../stats';

describe('Should compute stats', () => {
    it('should computeLoadEvents from history', () => {
        const res = computeLoadEvents([
            { state: LoadType.NORMAL, load: 1, date: '10:00:00' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:10' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:20' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:30' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:40' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:00:50' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:01:00' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:01:10' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:01:20' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:01:30' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:01:40' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:01:50' },
            { state: LoadType.HIGH, load: 1.1, date: '10:02:00' },
            { state: LoadType.HIGH, load: 1.1, date: '10:02:10' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:02:20' },
            { state: LoadType.HIGH, load: 1.1, date: '10:02:30' },
            { state: LoadType.HIGH, load: 1.1, date: '10:02:40' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:02:50' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:03:00' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:03:10' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:03:20' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:03:30' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:03:40' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:03:50' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:04:00' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:04:10' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:04:20' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:04:30' },
            { state: LoadType.NORMAL, load: 0.9, date: '10:04:40' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:04:50' },
            { state: LoadType.NORMAL, load: 0.9, date: '10:05:00' },
            { state: LoadType.NORMAL, load: 0.9, date: '10:05:10' },
            { state: LoadType.NORMAL, load: 0.9, date: '10:05:20' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:05:30' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:05:40' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:05:50' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:06:00' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:06:10' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:06:20' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:06:30' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:06:40' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:06:50' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:07:00' },
            { state: LoadType.INCREASING, load: 1.1, date: '10:07:10' },
            { state: LoadType.HIGH, load: 1.1, date: '10:07:20' },
            { state: LoadType.HIGH, load: 1.1, date: '10:07:30' },
            { state: LoadType.HIGH, load: 1.1, date: '10:07:40' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:07:50' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:08:00' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:08:10' },
            { state: LoadType.HIGH, load: 1.1, date: '10:08:20' },
            { state: LoadType.HIGH, load: 1.1, date: '10:08:30' },
            { state: LoadType.HIGH, load: 1.1, date: '10:08:40' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:08:50' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:00' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:10' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:20' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:30' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:40' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:50' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:10:00' },
        ]);

        expect(res).toEqual([
            { state: LoadType.HIGH, begin: '10:02:00', end: '10:02:40' },
            { state: LoadType.NORMAL, begin: '10:04:40', end: '10:04:40' },
            { state: LoadType.HIGH, begin: '10:07:20', end: '10:08:40' },
        ]);
    });

    it('should computeLoadEvents from history when starting by HIGH values', () => {
        const res = computeLoadEvents([
            { state: LoadType.HIGH, load: 1.1, date: '10:07:20' },
            { state: LoadType.HIGH, load: 1.1, date: '10:07:30' },
            { state: LoadType.HIGH, load: 1.1, date: '10:07:40' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:07:50' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:08:00' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:08:10' },
            { state: LoadType.HIGH, load: 1.1, date: '10:08:20' },
            { state: LoadType.HIGH, load: 1.1, date: '10:08:30' },
            { state: LoadType.HIGH, load: 1.1, date: '10:08:40' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:08:50' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:00' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:10' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:20' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:30' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:40' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:50' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:10:00' },
        ]);

        expect(res).toEqual([{ state: LoadType.HIGH, begin: '10:07:20', end: '10:08:40' }]);
    });

    it('should computeLoadEvents from history when starting by INCREASING values', () => {
        const res = computeLoadEvents([
            { state: LoadType.INCREASING, load: 1.1, date: '10:07:20' },
            { state: LoadType.HIGH, load: 1.1, date: '10:07:30' },
            { state: LoadType.HIGH, load: 1.1, date: '10:07:40' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:07:50' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:08:00' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:08:10' },
            { state: LoadType.HIGH, load: 1.1, date: '10:08:20' },
            { state: LoadType.HIGH, load: 1.1, date: '10:08:30' },
            { state: LoadType.HIGH, load: 1.1, date: '10:08:40' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:08:50' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:00' },
            { state: LoadType.RECOVERING, load: 0.9, date: '10:09:10' },
        ]);

        expect(res).toEqual([{ state: LoadType.HIGH, begin: '10:07:30', end: '10:08:40' }]);
    });

    it('should compute isFreshHeavyState(NORMAL, NORMAL)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isFreshHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshHeavyState(NORMAL, INCREASING)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const res = isFreshHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshHeavyState(INCREASING, NORMAL)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isFreshHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshHeavyState(INCREASING, HIGH)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isFreshHeavyState(previous, current);

        expect(res).toBeTruthy();
    });

    it('should compute isFreshHeavyState(HIGH, HIGH)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isFreshHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshHeavyState(RECOVERING, HIGH)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isFreshHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshHeavyState(HIGH, RECOVERING)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const res = isFreshHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshHeavyState(RECOVERING, NORMAL)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isFreshHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isContinuingHeavyState(NORMAL, NORMAL)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isContinuingHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isContinuingHeavyState(NORMAL, INCREASING)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const res = isContinuingHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isContinuingHeavyState(INCREASING, NORMAL)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isContinuingHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isContinuingHeavyState(INCREASING, HIGH)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isContinuingHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isContinuingHeavyState(HIGH, HIGH)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isContinuingHeavyState(previous, current);

        expect(res).toBeTruthy();
    });

    it('should compute isContinuingHeavyState(RECOVERING, HIGH)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isContinuingHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isContinuingHeavyState(HIGH, RECOVERING)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const res = isContinuingHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isContinuingHeavyState(RECOVERING, NORMAL)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isContinuingHeavyState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isHeavyStateAfterRecoveringFailed(NORMAL, NORMAL)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isHeavyStateAfterRecoveringFailed(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isHeavyStateAfterRecoveringFailed(NORMAL, INCREASING)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const res = isHeavyStateAfterRecoveringFailed(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isHeavyStateAfterRecoveringFailed(INCREASING, NORMAL)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isHeavyStateAfterRecoveringFailed(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isHeavyStateAfterRecoveringFailed(INCREASING, HIGH)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isHeavyStateAfterRecoveringFailed(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isHeavyStateAfterRecoveringFailed(HIGH, HIGH)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isHeavyStateAfterRecoveringFailed(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isHeavyStateAfterRecoveringFailed(RECOVERING, HIGH)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isHeavyStateAfterRecoveringFailed(previous, current);

        expect(res).toBeTruthy();
    });

    it('should compute isHeavyStateAfterRecoveringFailed(HIGH, RECOVERING)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const res = isHeavyStateAfterRecoveringFailed(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isHeavyStateAfterRecoveringFailed(RECOVERING, NORMAL)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isHeavyStateAfterRecoveringFailed(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshNormalState(NORMAL, NORMAL)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isFreshNormalState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshNormalState(NORMAL, INCREASING)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const res = isFreshNormalState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshNormalState(INCREASING, NORMAL)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isFreshNormalState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshNormalState(INCREASING, HIGH)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.INCREASING, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isFreshNormalState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshNormalState(HIGH, HIGH)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isFreshNormalState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshNormalState(RECOVERING, HIGH)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const current: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const res = isFreshNormalState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshNormalState(HIGH, RECOVERING)', () => {
        const previous: LoadEntry = { load: 1.5, state: LoadType.HIGH, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const res = isFreshNormalState(previous, current);

        expect(res).toBeFalsy();
    });

    it('should compute isFreshNormalState(RECOVERING, NORMAL)', () => {
        const previous: LoadEntry = { load: 0.5, state: LoadType.RECOVERING, date: '' };
        const current: LoadEntry = { load: 0.5, state: LoadType.NORMAL, date: '' };
        const res = isFreshNormalState(previous, current);

        expect(res).toBeTruthy();
    });
});
