import { createAction, props } from '@ngrx/store';
import { IConversationItem } from 'src/app/chat/models/chat.interface';

export enum ConversationActionTypes {
    GET_CONVERSATION_LIST = '[Conversation] Get Conversation List',
    GET_CONVERSATION_LIST_SUCCESS = '[Conversation] Get Conversation List Success',
    GET_CONVERSATION_LIST_FAILURE = '[Conversation] Get Conversation List Failure',

    UPDATE_CONVERSATION_LIST = '[Conversation] Update Conversation List',
    UPDATE_CONVERSATION_LIST_SUCCESS = '[Conversation] Update Conversation List Success',
    UPDATE_CONVERSATION_LIST_FAILURE = '[Conversation] Update Conversation List Failure',

    CREATE_CONVERSATION = '[Conversation] Create Conversation',
    CREATE_CONVERSATION_SUCCESS = '[Conversation] Create Conversation Success',
    CREATE_CONVERSATION_FAILURE = '[Conversation] Create Conversation Failure',
}

export const getConversationList = createAction(
    ConversationActionTypes.GET_CONVERSATION_LIST,
);

export const getConversationListSuccess = createAction(
    ConversationActionTypes.GET_CONVERSATION_LIST_SUCCESS,
    props<{ conversations: IConversationItem[] }>(),
);

export const getConversationListFailure = createAction(
    ConversationActionTypes.GET_CONVERSATION_LIST_FAILURE,
    props<{ error: string }>(),
);

export const updateConversationList = createAction(
    ConversationActionTypes.UPDATE_CONVERSATION_LIST,
);

export const updateConversationListSuccess = createAction(
    ConversationActionTypes.UPDATE_CONVERSATION_LIST_SUCCESS,
    props<{ conversations: IConversationItem[] }>(),
);

export const updateConversationListFailure = createAction(
    ConversationActionTypes.UPDATE_CONVERSATION_LIST_FAILURE,
    props<{ error: string }>(),
);

export const createConversation = createAction(
    ConversationActionTypes.CREATE_CONVERSATION,
    props<{ companion: string }>(),
);

export const createConversationSuccess = createAction(
    ConversationActionTypes.CREATE_CONVERSATION_SUCCESS,
    props<{ conversationItem: IConversationItem }>(),
);

export const createConversationFailure = createAction(
    ConversationActionTypes.CREATE_CONVERSATION_FAILURE,
    props<{ error: string }>(),
);
