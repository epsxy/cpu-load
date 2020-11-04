// CPU is under heavy load when load > THRESHOLD == 1
export const CPU_THRESHOLD = 1;
// Refresh data every 10s=10000ms
export const REFRESH_TIMER_MS = 10000;
// Heavy/Recovering loads are counted after 2min=120000ms
export const STREAK_DURATION_MS = 120000;
// We register data for 10min=600000ms
export const HISTORY_DURATION_MS = 600000;

export const HISTORY_ARRAY_LENGTH = HISTORY_DURATION_MS / REFRESH_TIMER_MS;
export const STREAK_LENGTH = STREAK_DURATION_MS / REFRESH_TIMER_MS;
