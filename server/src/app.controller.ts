import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class AppController {
    constructor() {}

    @Get()
    serverGreetings(): string {
        return 'Cpu load server is up & running!';
    }
}
