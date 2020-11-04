import { LoadType } from './LoadType';

export interface LoadEntry {
    date: string;
    load: number;
    state: LoadType;
}
