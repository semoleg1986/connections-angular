import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState, chatNode } from '../reducers/chat/chat.reducers';

export const selectChatState = createFeatureSelector<ChatState>(chatNode);

export const selectChat = createSelector(
    selectChatState,
    (state: ChatState) => state.chatList,
);

export const selectChatLoading = createSelector(
    selectChatState,
    (state: ChatState) => state.loading,
);

export const selectChatError = createSelector(
    selectChatState,
    (state: ChatState) => state.error,
);

export const selectUserNameByUID = (uid: string) => createSelector(
    selectChatState,
    (state) => {
        if (state.chatList === null) {
            return null;
        }

        const user = state.chatList.find((chatItem) => chatItem.uid.S === uid);
        return user ? user.name.S : null;
    },
);
export const selectUserExistsByIdBoolean = (id: string) => createSelector(
    selectChatState,
    (state: ChatState) => {
        if (!state || !state.chatList) return false;
        return state.chatList.some((item) => item.uid.S === id);
    },
);
