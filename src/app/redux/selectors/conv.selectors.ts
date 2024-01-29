import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConversationState, conversationNode } from '../reducers/conversation/conversation.reducer';

export const selectConversationState = createFeatureSelector<ConversationState>(conversationNode);

export const selectConversationList = createSelector(
    selectConversationState,
    (state: ConversationState) => state.conversationList,
);

export const selectConversationLoading = createSelector(
    selectConversationState,
    (state: ConversationState) => state.loading,
);

export const selectConversationError = createSelector(
    selectConversationState,
    (state: ConversationState) => state.error,
);

export const selectCompanionById = (id: string) => createSelector(
    selectConversationState,
    (conversationState: ConversationState) => {
        if (!conversationState || !conversationState.conversationList) return null;
        return conversationState.conversationList.find((item) => item.companionID.S === id) || null;
    },
);

export const selectCompanionExistsByIdBoolean = (id: string) => createSelector(
    selectConversationState,
    (conversationState: ConversationState) => {
        if (!conversationState || !conversationState.conversationList) return false;
        return conversationState.conversationList.some((item) => item.companionID.S === id);
    },
);

export const selectExistsByIdBoolean = (id: string) => createSelector(
    selectConversationState,
    (conversationState: ConversationState) => {
        if (!conversationState || !conversationState.conversationList) return false;
        return conversationState.conversationList.some((item) => item.id.S === id);
    },
);
