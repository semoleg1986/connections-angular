import { createReducer, on } from '@ngrx/store';
import { IMessageItem } from 'src/app/chat/models/group.interface';
import {
    getPeopleMessages,
    getPeopleMessagesFailure,
    getPeopleMessagesSuccess,
    sendPeopleMessage, sendPeopleMessageFailure,
    sendPeopleMessageSuccess,
    updatePeopleMessages,
    updatePeopleMessagesFailure,
    updatePeopleMessagesSuccess,
} from '../../actions/chat-messages/chat-messages.action';
import { resetStore } from '../../actions/clear.action';

export const chatMessageNode = 'chatMessage';

export interface ChatMessageState {
    messagesByChatId: { [conversationId: string]: IMessageItem[] };
    loading: { [conversationId: string]: boolean };
    error: { [conversationId: string]: string | null };
}

export const initialChatMessageState: ChatMessageState = {
    messagesByChatId: {},
    loading: {},
    error: {},
};

export const chatMessageReducer = createReducer(
    initialChatMessageState,
    on(
        getPeopleMessages,
        (state:ChatMessageState, { conversationId }):ChatMessageState => ({
            ...state,
            loading: {
                ...state.loading,
                [conversationId]: true,
            },
            error: {
                ...state.error,
                [conversationId]: null,
            },
        }),
    ),
    on(
        getPeopleMessagesSuccess,
        (state: ChatMessageState, { conversationId, messages }):ChatMessageState => ({
            ...state,
            loading: {
                ...state.loading,
                [conversationId]: false,
            },
            error: {
                ...state.error,
                [conversationId]: null,
            },
            messagesByChatId: {
                ...state.messagesByChatId,
                [conversationId]: messages,
            },
        }),
    ),
    on(
        getPeopleMessagesFailure,
        (state:ChatMessageState, { error }):ChatMessageState => ({
            ...state,
            loading: {
                ...state.loading,
            },
            error: {
                ...state.error,
                defaultChatID: error,
            },
        }),
    ),
    on(
        updatePeopleMessages,
        (state: ChatMessageState, { conversationId }): ChatMessageState => ({
            ...state,
            loading: {
                ...state.loading,
                [conversationId]: true,
            },
            error: {
                ...state.error,
                [conversationId]: null,
            },
        }),
    ),

    on(
        updatePeopleMessagesSuccess,
        (state: ChatMessageState, { conversationId, updatedMessages }): ChatMessageState => ({
            ...state,
            loading: {
                ...state.loading,
                [conversationId]: false,
            },
            error: {
                ...state.error,
                [conversationId]: null,
            },
            messagesByChatId: {
                ...state.messagesByChatId,
                [conversationId]: updatedMessages,
            },
        }),
    ),

    on(
        updatePeopleMessagesFailure,
        sendPeopleMessageFailure,
        (state: ChatMessageState, { error }): ChatMessageState => ({
            ...state,
            loading: {
                ...state.loading,
            },
            error: {
                ...state.error,
                defaultChatID: error,
            },
        }),
    ),

    on(
        resetStore,
        (): ChatMessageState => initialChatMessageState,
    ),
    on(
        sendPeopleMessage,
        (state: ChatMessageState, { conversationId }): ChatMessageState => ({
            ...state,
            loading: {
                ...state.loading,
                [conversationId]: true,
            },
            error: {
                ...state.error,
                [conversationId]: null,
            },
        }),
    ),
    on(
        sendPeopleMessageSuccess,
        (state: ChatMessageState, { conversationId, message }): ChatMessageState => {
            const updatedMessages = state.messagesByChatId[conversationId]
                ? [...state.messagesByChatId[conversationId], message]
                : [message];

            return {
                ...state,
                loading: {
                    ...state.loading,
                    [conversationId]: false,
                },
                error: {
                    ...state.error,
                    [conversationId]: null,
                },
                messagesByChatId: {
                    ...state.messagesByChatId,
                    [conversationId]: updatedMessages as IMessageItem[],
                },
            };
        },
    ),

);
