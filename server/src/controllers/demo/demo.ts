/**
 * This file is a dirty hack to be able to run a demo mode without stressing for real the CPU.
 * The controller will loop "forever" (until the max int is reached) over demoData array.
 * This is not intended for production be demo usage.
 */

export let demoIdx = -1;

export const incrementDemoIdx = () => {
    demoIdx += 1;
};

export const demoData = [
    0.5,
    0.7,
    1.1,
    1.2,
    0.8,
    0.9,
    1.2,
    1.1,
    1.3,
    1.4,
    1.3,
    1.5,
    1.7,
    1.9,
    1.6,
    1.5,
    1.5,
    1.4,
    1.3,
    1.2,
    1.1,
    0.9,
    1.1,
    0.9,
    1.2,
    0.9,
    1,
    0.8,
    0.6,
    0.7,
    0.9,
    0.8,
    0.9,
    0.9,
    0.78,
    0.75,
    0.72,
    0.8,
    0.65,
    0.9,
    1.2,
    1.3,
    0.96,
    0.88,
    1.12,
    1.18,
    1.3,
    1.2,
    1.3,
    1.42,
    1.45,
    1.5,
    1.49,
    1.56,
    1.43,
    1.23,
    1.17,
    0.7,
    0.6,
    0.5,
];
