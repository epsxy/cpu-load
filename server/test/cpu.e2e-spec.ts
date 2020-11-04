import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CpuController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/api/cpu/load (GET)', async () => {
        const res = await request(app.getHttpServer()).get('/api/cpu/load');

        expect(res.status).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body.value).toBeDefined();
        expect(res.body.value).toBeGreaterThanOrEqual(0);
    });
});
