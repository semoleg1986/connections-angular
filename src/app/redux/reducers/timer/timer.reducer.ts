import { createReducer, on } from '@ngrx/store';
import { setStartTime, resetTimer } from '../../actions/timer/timer.action';

export const timerNode = 'timer';

export interface TimerState {
    timers: { [groupId: string]: number | null };
}

export const initialTimerState: TimerState = {
    timers: {},
};

export const timerReducer = createReducer(
    initialTimerState,
    on(
        setStartTime,
        (state: TimerState, { groupId, startTime }):TimerState => ({
            ...state,
            timers: {
                ...state.timers,
                [groupId]: startTime,
            },
        }),
    ),

    on(
        resetTimer,
        (state: TimerState, { groupId }):TimerState => {
            const { [groupId]: deletedTimer, ...updatedTimers } = state.timers;
            return {
                ...state,
                timers: updatedTimers,
            };
        },
    ),
);
