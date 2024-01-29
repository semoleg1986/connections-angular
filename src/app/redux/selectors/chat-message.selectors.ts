import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMessageItem } from 'src/app/chat/models/group.interface';
import { ChatMessageState, chatMessageNode } from '../reducers/chat-message/chat-message.reducer';

export const selectChatMessageState = createFeatureSelector<ChatMessageState>(chatMessageNode);

export const selectMessagesByChatId = createSelector(
    selectChatMessageState,
    (state: ChatMessageState, props: { conversationId: string }): IMessageItem[] | null => {
        const messages = state.messagesByChatId[props.conversationId];

        if (messages) {
            const sortedMessages = messages.slice().sort((a, b) => a.createdAt.S.localeCompare(b.createdAt.S));

            return sortedMessages;
        }

        return null;
    },
);

export const selectLoadingByChatId = createSelector(
    selectChatMessageState,
    (state: ChatMessageState, props: { conversationId: string }): boolean | undefined => state.loading[props.conversationId],
);

export const selectErrorByGroupId = createSelector(
    selectChatMessageState,
    (state: ChatMessageState, props: { conversationId: string }): string | null | undefined => state.error[props.conversationId],
);
