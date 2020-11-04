import { Test, TestingModule } from '@nestjs/testing';
import { CpuController } from './cpu.controller';

describe('CpuController', () => {
    let cpuController: CpuController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CpuController],
        }).compile();

        cpuController = app.get<CpuController>(CpuController);
    });

    describe('root', () => {
        it('should return CPU Load', () => {
            const load = cpuController.getCpuLoad();

            expect(load).toBeDefined();
            expect(load.value).toBeDefined();
            expect(load.value).toBeGreaterThanOrEqual(0);
        });
    });
});
