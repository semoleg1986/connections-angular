import { createAction, props } from '@ngrx/store';
import { IChatItem } from 'src/app/chat/models/chat.interface';

export enum ChatActionTypes {
    GET_CHAT_LIST = '[Chat] Get Chat list',
    GET_CHAT_SUCCESS = '[Chat] Get Chat list success',
    GET_CHAT_FAILURE = '[Chat] Get Chat list failure',

    UPDATE_CHAT = '[Chat] Update Chat',
    UPDATE_CHAT_SUCCESS = '[Chat] Update Chat success',
    UPDATE_CHAT_FAILURE = '[Chat] Update Chat failure',
}

export const getChatList = createAction(
    ChatActionTypes.GET_CHAT_LIST,
);

export const getChatListSuccess = createAction(
    ChatActionTypes.GET_CHAT_SUCCESS,
    props<{ chat: IChatItem[] }>(),
);

export const getChatListFailure = createAction(
    ChatActionTypes.GET_CHAT_FAILURE,
    props<{ error: string }>(),
);

export const updateChatList = createAction(
    ChatActionTypes.UPDATE_CHAT,
);

export const updateChatListSuccess = createAction(
    ChatActionTypes.UPDATE_CHAT_SUCCESS,
    props<{ chat: IChatItem[] }>(),
);

export const updateChatListFailure = createAction(
    ChatActionTypes.UPDATE_CHAT_FAILURE,
    props<{ error: string }>(),
);
