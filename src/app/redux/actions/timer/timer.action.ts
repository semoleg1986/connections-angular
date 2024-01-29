import { createAction, props } from '@ngrx/store';

export enum TimerActionTypes {
    SET_START_TIME = '[Timer] Set start time',
    RESET_TIMER = '[Timer] Reset timer',
}

export const setStartTime = createAction(
    TimerActionTypes.SET_START_TIME,
    props<{ groupId: string, startTime: number }>(),
);

export const resetTimer = createAction(
    TimerActionTypes.RESET_TIMER,
    props<{ groupId: string }>(),
);
