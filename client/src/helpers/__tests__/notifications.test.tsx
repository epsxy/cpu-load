import { LoadType } from '../../model/LoadType';
import { generateMessage, triggerNotify } from '../notifications';

describe('Should trigger notifications', () => {
    it('Should generate HIGH load message', () => {
        const { title, message, type } = generateMessage(LoadType.HIGH);

        expect(title).toEqual('High Load');
        expect(message).toEqual('The average CPU load has exceeded 1 for 2 minutes');
        expect(type).toEqual('danger');
    });

    it('Should generate RECOVERED load message', () => {
        const { title, message, type } = generateMessage(LoadType.NORMAL);

        expect(title).toEqual('Recovered');
        expect(message).toEqual('The average CPU load has dropped below 1 for 2 minutes');
        expect(type).toEqual('success');
    });

    it('Should trigger HIGH load notification', () => {
        const notify = jest.fn();

        triggerNotify(LoadType.INCREASING, LoadType.HIGH, notify);

        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith('High Load', 'The average CPU load has exceeded 1 for 2 minutes', 'danger');
    });

    it('Should trigger RECOVERED notification', () => {
        const notify = jest.fn();

        triggerNotify(LoadType.RECOVERING, LoadType.NORMAL, notify);

        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith(
            'Recovered',
            'The average CPU load has dropped below 1 for 2 minutes',
            'success',
        );
    });
});
