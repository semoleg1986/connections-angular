import { createReducer, on } from '@ngrx/store';

import { IChatItem } from 'src/app/chat/models/chat.interface';
import {
    getChatList, getChatListFailure, getChatListSuccess, updateChatList, updateChatListFailure, updateChatListSuccess,
} from '../../actions/chat/chat.actions';
import { resetStore } from '../../actions/clear.action';

export const chatNode = 'chat';

export interface ChatState {
    chatList: IChatItem[] | null;
    loading: boolean;
    error: string | null;
}

export const initialChatState: ChatState = {
    chatList: null,
    loading: false,
    error: null,
};

export const chatReducer = createReducer(
    initialChatState,
    on(
        getChatList,
        updateChatList,
        (state: ChatState): ChatState => ({
            ...state,
            loading: true,
        }),
    ),

    on(
        getChatListSuccess,
        (state: ChatState, action): ChatState => ({
            ...state,
            chatList: action.chat,
            loading: false,
            error: null,
        }),
    ),

    on(
        updateChatListSuccess,
        (state: ChatState, action): ChatState => ({
            ...state,
            chatList: action.chat,
            loading: false,
            error: null,
        }),
    ),

    on(
        getChatListFailure,
        updateChatListFailure,
        (state: ChatState, { error }): ChatState => ({
            ...state,
            loading: false,
            error,
        }),
    ),
    on(
        resetStore,
        (): ChatState => initialChatState,
    ),
);
