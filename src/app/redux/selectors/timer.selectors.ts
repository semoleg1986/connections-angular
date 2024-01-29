import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TimerState, timerNode } from '../reducers/timer/timer.reducer';

export const selectTimerState = createFeatureSelector<TimerState>(timerNode);

export const selectAllTimers = createSelector(
    selectTimerState,
    (state: TimerState) => state.timers,
);

export const selectTimerById = (groupId: string) => createSelector(
    selectAllTimers,
    (timers) => (timers ? timers[groupId] : null),
);
