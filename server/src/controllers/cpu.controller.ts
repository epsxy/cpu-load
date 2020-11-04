import { Controller, Get } from '@nestjs/common';
import { demoData, demoIdx, incrementDemoIdx } from './demo/demo';
const os = require('os');

@Controller('/api/cpu')
export class CpuController {
    @Get('load')
    getCpuLoad() {
        /**
         * This is a dirty hack to be able to run a demo mode without stressing for real the CPU.
         * see ./demo/demo.ts
         */
        if (process.env.MODE === 'DEMO') {
            incrementDemoIdx();
            return { value: demoData[demoIdx % demoData.length] };
        }
        /** Real behavior */
        const cpus = os.cpus().length;
        return { value: os.loadavg()[0] / cpus };
    }
}
