import { createReducer, on } from '@ngrx/store';
import { IMessageItem } from 'src/app/chat/models/group.interface';
import {
    getGroupMessages,
    getGroupMessagesSuccess,
    getGroupMessagesFailure,
    updateGroupMessages,
    updateGroupMessagesSuccess,
    updateGroupMessagesFailure,
    sendGroupMessageFailure,
    sendGroupMessageSuccess,
    sendGroupMessage,
} from '../../actions/group-message/group-message.action';
import { resetStore } from '../../actions/clear.action';

export const groupMessageNode = 'groupMessage';

export interface GroupMessageState {
    messagesByGroupId: { [groupId: string]: IMessageItem[] };
    loading: { [groupId: string]: boolean };
    error: { [groupId: string]: string | null };
}

export const initialGroupMessageState: GroupMessageState = {
    messagesByGroupId: {},
    loading: {},
    error: {},
};

export const groupMessageReducer = createReducer(
    initialGroupMessageState,
    on(
        getGroupMessages,
        (state:GroupMessageState, { groupID }):GroupMessageState => ({
            ...state,
            loading: {
                ...state.loading,
                [groupID]: true,
            },
            error: {
                ...state.error,
                [groupID]: null,
            },
        }),
    ),
    on(
        getGroupMessagesSuccess,
        (state: GroupMessageState, { groupID, messages }):GroupMessageState => ({
            ...state,
            loading: {
                ...state.loading,
                [groupID]: false,
            },
            error: {
                ...state.error,
                [groupID]: null,
            },
            messagesByGroupId: {
                ...state.messagesByGroupId,
                [groupID]: messages,
            },
        }),
    ),
    on(
        getGroupMessagesFailure,
        (state:GroupMessageState, { error }):GroupMessageState => ({
            ...state,
            loading: {
                ...state.loading,
            },
            error: {
                ...state.error,
                defaultGroupID: error,
            },
        }),
    ),
    on(
        updateGroupMessages,
        (state: GroupMessageState, { groupID }): GroupMessageState => ({
            ...state,
            loading: {
                ...state.loading,
                [groupID]: true,
            },
            error: {
                ...state.error,
                [groupID]: null,
            },
        }),
    ),

    on(
        updateGroupMessagesSuccess,
        (state: GroupMessageState, { groupID, updatedMessages }): GroupMessageState => ({
            ...state,
            loading: {
                ...state.loading,
                [groupID]: false,
            },
            error: {
                ...state.error,
                [groupID]: null,
            },
            messagesByGroupId: {
                ...state.messagesByGroupId,
                [groupID]: updatedMessages,
            },
        }),
    ),

    on(
        updateGroupMessagesFailure,
        sendGroupMessageFailure,
        (state: GroupMessageState, { error }): GroupMessageState => ({
            ...state,
            loading: {
                ...state.loading,
            },
            error: {
                ...state.error,
                defaultGroupID: error,
            },
        }),
    ),

    on(
        resetStore,
        (): GroupMessageState => initialGroupMessageState,
    ),
    on(
        sendGroupMessage,
        (state: GroupMessageState, { groupID }): GroupMessageState => ({
            ...state,
            loading: {
                ...state.loading,
                [groupID]: true,
            },
            error: {
                ...state.error,
                [groupID]: null,
            },
        }),
    ),
    on(
        sendGroupMessageSuccess,
        (state: GroupMessageState, { groupID, message }): GroupMessageState => {
            const updatedMessages = state.messagesByGroupId[groupID]
                ? [...state.messagesByGroupId[groupID], message]
                : [message];

            return {
                ...state,
                loading: {
                    ...state.loading,
                    [groupID]: false,
                },
                error: {
                    ...state.error,
                    [groupID]: null,
                },
                messagesByGroupId: {
                    ...state.messagesByGroupId,
                    [groupID]: updatedMessages as IMessageItem[],
                },
            };
        },
    ),

);
