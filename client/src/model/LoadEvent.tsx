import { LoadType } from './LoadType';

export interface LoadEvent {
    begin: string;
    end: string;
    state: LoadType;
}
