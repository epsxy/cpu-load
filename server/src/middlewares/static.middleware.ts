import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { join, resolve } from 'path';

const allowedExt = ['.js', '.map', '.css', '.ico', '.png', '.jpg', '.svg', '.woff2', '.woff', '.ttf', '.json'];

/**
 * Behavior is the following:
 * - Continue if baseUrl is starting with `/api`
 * - Resolve file if the extension is valid
 * - Fallback to `index.html` in any other case
 */
@Injectable()
export class StaticMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: any) {
        const url = req.baseUrl;
        if (/^\/api/.test(url)) {
            next();
        } else if (allowedExt.map(ext => url.endsWith(ext)).filter(entry => entry).length > 0) {
            res.sendFile(resolve(join('..', 'client', 'build', `${url}`)));
        } else {
            res.sendFile(resolve(join('..', 'client', 'build', 'index.html')));
        }
    }
}
