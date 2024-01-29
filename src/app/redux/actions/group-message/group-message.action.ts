import { createAction, props } from '@ngrx/store';
import { IMessageItem } from 'src/app/chat/models/group.interface';

export enum GroupMessageActionTypes {
    GET_GROUP_MESSAGES = '[Group Message] Get Group Messages',
    GET_GROUP_MESSAGES_SUCCESS = '[Group Message] Get Group Messages Success',
    GET_GROUP_MESSAGES_FAILURE = '[Group Message] Get Group Messages Failure',

    UPDATE_GROUP_MESSAGES = '[Group Message] Update Group Messages',
    UPDATE_GROUP_MESSAGES_SUCCESS = '[Group Message] Update Group Messages Success',
    UPDATE_GROUP_MESSAGES_FAILURE = '[Group Message] Update Group Messages Failure',

    SEND_GROUP_MESSAGE = '[Group Message] Send Group Message',
    SEND_GROUP_MESSAGE_SUCCESS = '[Group Message] Send Group Message Success',
    SEND_GROUP_MESSAGE_FAILURE = '[Group Message] Send Group Message Failure',
}

export const getGroupMessages = createAction(
    GroupMessageActionTypes.GET_GROUP_MESSAGES,
    props<{ groupID: string; since?: number }>(),
);

export const getGroupMessagesSuccess = createAction(
    GroupMessageActionTypes.GET_GROUP_MESSAGES_SUCCESS,
    props<{ groupID: string; messages: IMessageItem[] }>(),
);

export const getGroupMessagesFailure = createAction(
    GroupMessageActionTypes.GET_GROUP_MESSAGES_FAILURE,
    props<{ error: string }>(),
);

export const updateGroupMessages = createAction(
    GroupMessageActionTypes.UPDATE_GROUP_MESSAGES,
    props<{ groupID: string; since?: number }>(),
);

export const updateGroupMessagesSuccess = createAction(
    GroupMessageActionTypes.UPDATE_GROUP_MESSAGES_SUCCESS,
    props<{ groupID: string; updatedMessages: IMessageItem[] }>(),
);

export const updateGroupMessagesFailure = createAction(
    GroupMessageActionTypes.UPDATE_GROUP_MESSAGES_FAILURE,
    props<{ error: string }>(),
);

export const sendGroupMessage = createAction(
    GroupMessageActionTypes.SEND_GROUP_MESSAGE,
    props<{ groupID: string; message: string, since?: number }>(),
);

export const sendGroupMessageSuccess = createAction(
    GroupMessageActionTypes.SEND_GROUP_MESSAGE_SUCCESS,
    props<{ groupID: string; message: string; since: string | null }>(),
);

export const sendGroupMessageFailure = createAction(
    GroupMessageActionTypes.SEND_GROUP_MESSAGE_FAILURE,
    props<{ error: string }>(),
);
