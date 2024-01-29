import { createReducer, on } from '@ngrx/store';
import { IConversationItem } from 'src/app/chat/models/chat.interface';
import {
    getConversationList,
    getConversationListSuccess,
    getConversationListFailure,
    updateConversationList,
    updateConversationListSuccess,
    createConversation,
    updateConversationListFailure,
    createConversationFailure,
    createConversationSuccess,
} from '../../actions/conversation/conversation.action';

export const conversationNode = 'conv';

export interface ConversationState {
    conversationList: IConversationItem[] | null;
    loading: boolean;
    error: string | null;
}

export const initialConversationState: ConversationState = {
    conversationList: null,
    loading: false,
    error: null,
};

export const conversationReducer = createReducer(
    initialConversationState,
    on(
        getConversationList,
        updateConversationList,
        createConversation,
        (state: ConversationState):ConversationState => ({
            ...state,
            loading: true,
        }),
    ),
    on(
        getConversationListSuccess,
        updateConversationListSuccess,
        (state: ConversationState, { conversations }):ConversationState => ({
            ...state,
            conversationList: conversations,
            loading: false,
            error: null,
        }),
    ),
    on(
        createConversationSuccess,
        (state: ConversationState, { conversationItem }):ConversationState => ({
            ...state,
            conversationList: state.conversationList
                ? [...state.conversationList, conversationItem]
                : [conversationItem],
            loading: false,
            error: null,
        }),
    ),
    on(
        getConversationListFailure,
        updateConversationListFailure,
        createConversationFailure,
        (state: ConversationState, { error }):ConversationState => ({
            ...state,
            loading: false,
            error,
        }),
    ),
);
