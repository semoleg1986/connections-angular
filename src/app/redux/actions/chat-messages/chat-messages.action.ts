import { createAction, props } from '@ngrx/store';
import { IMessageItem } from 'src/app/chat/models/group.interface';

export enum PeopleMessageActionTypes {
    GET_PEOPLE_MESSAGES = '[People Message] Get People Messages',
    GET_PEOPLE_MESSAGES_SUCCESS = '[People Message] Get People Messages Success',
    GET_PEOPLE_MESSAGES_FAILURE = '[People Message] Get People Messages Failure',

    UPDATE_PEOPLE_MESSAGES = '[People Message] Update People Messages',
    UPDATE_PEOPLE_MESSAGES_SUCCESS = '[People Message] Update People Messages Success',
    UPDATE_PEOPLE_MESSAGES_FAILURE = '[People Message] Update People Messages Failure',

    SEND_PEOPLE_MESSAGE = '[People Message] Send People Message',
    SEND_PEOPLE_MESSAGE_SUCCESS = '[People Message] Send People Message Success',
    SEND_PEOPLE_MESSAGE_FAILURE = '[People Message] Send People Message Failure',

    DELETE_PEOPLE_MESSAGE = '[People Message] Send People Message',
    DELETE_PEOPLE_MESSAGE_SUCCESS = '[People Message] Send People Message Success',
    DELETE_PEOPLE_MESSAGE_FAILURE = '[People Message] Send People Message Failure',
}

export const getPeopleMessages = createAction(
    PeopleMessageActionTypes.GET_PEOPLE_MESSAGES,
    props<{ conversationId: string; since?: number }>(),
);

export const getPeopleMessagesSuccess = createAction(
    PeopleMessageActionTypes.GET_PEOPLE_MESSAGES_SUCCESS,
    props<{ conversationId: string; messages: IMessageItem[] }>(),
);

export const getPeopleMessagesFailure = createAction(
    PeopleMessageActionTypes.GET_PEOPLE_MESSAGES_FAILURE,
    props<{ error: string }>(),
);

export const updatePeopleMessages = createAction(
    PeopleMessageActionTypes.UPDATE_PEOPLE_MESSAGES,
    props<{ conversationId: string; since?: number }>(),
);

export const updatePeopleMessagesSuccess = createAction(
    PeopleMessageActionTypes.UPDATE_PEOPLE_MESSAGES_SUCCESS,
    props<{ conversationId: string; updatedMessages: IMessageItem[] }>(),
);

export const updatePeopleMessagesFailure = createAction(
    PeopleMessageActionTypes.UPDATE_PEOPLE_MESSAGES_FAILURE,
    props<{ error: string }>(),
);

export const sendPeopleMessage = createAction(
    PeopleMessageActionTypes.SEND_PEOPLE_MESSAGE,
    props<{ conversationId: string; message: string, since?: number }>(),
);

export const sendPeopleMessageSuccess = createAction(
    PeopleMessageActionTypes.SEND_PEOPLE_MESSAGE_SUCCESS,
    props<{ conversationId: string; message: string; since: string | null }>(),
);

export const sendPeopleMessageFailure = createAction(
    PeopleMessageActionTypes.SEND_PEOPLE_MESSAGE_FAILURE,
    props<{ error: string }>(),
);

export const deletePeopleMessage = createAction(
    PeopleMessageActionTypes.DELETE_PEOPLE_MESSAGE,
    props<{ messageId: string; conversationId: string; }>(),
);

export const deletePeopleMessageSuccess = createAction(
    PeopleMessageActionTypes.DELETE_PEOPLE_MESSAGE_SUCCESS,
    props<{ messageId: string; conversationId: string; }>(),
);

export const deletePeopleMessageFailure = createAction(
    PeopleMessageActionTypes.DELETE_PEOPLE_MESSAGE_FAILURE,
    props<{ error: string }>(),
);
