import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMessageItem } from 'src/app/chat/models/group.interface';
import { GroupMessageState, groupMessageNode } from '../reducers/group-message/group-message.reducer';

export const selectGroupMessageState = createFeatureSelector<GroupMessageState>(groupMessageNode);

export const selectMessagesByGroupId = createSelector(
    selectGroupMessageState,
    (state: GroupMessageState, props: { groupID: string }): IMessageItem[] | null => {
        const messages = state.messagesByGroupId[props.groupID];

        if (messages) {
            const sortedMessages = messages.slice().sort((a, b) => a.createdAt.S.localeCompare(b.createdAt.S));

            return sortedMessages;
        }

        return null;
    },
);

export const selectLoadingByGroupId = createSelector(
    selectGroupMessageState,
    (state: GroupMessageState, props: { groupID: string }): boolean | undefined => state.loading[props.groupID],
);

export const selectErrorByGroupId = createSelector(
    selectGroupMessageState,
    (state: GroupMessageState, props: { groupID: string }): string | null | undefined => state.error[props.groupID],
);
