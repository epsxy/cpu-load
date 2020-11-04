import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CpuController } from './controllers/cpu.controller';
import { StaticMiddleware } from './middlewares/static.middleware';

@Module({
    imports: [],
    controllers: [AppController, CpuController],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(StaticMiddleware).forRoutes('/**');
    }
}
