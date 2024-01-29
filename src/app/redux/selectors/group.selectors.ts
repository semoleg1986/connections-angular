import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupState, groupNode } from '../reducers/group/group.reducer';

export const selectGroupState = createFeatureSelector<GroupState>(groupNode);

export const selectGroup = createSelector(
    selectGroupState,
    (state: GroupState) => state.groupList,
);

export const selectGroupLoading = createSelector(
    selectGroupState,
    (state: GroupState) => state.loading,
);

export const selectGroupError = createSelector(
    selectGroupState,
    (state: GroupState) => state.error,
);

export const selectGroupExistsByIdBoolean = (id: string) => createSelector(
    selectGroupState,
    (state: GroupState) => {
        if (!state || !state.groupList) return false;
        return state.groupList.some((item) => item.id.S === id);
    },
);

export const selectGroupNameById = (id: string) => createSelector(
    selectGroupState,
    (state: GroupState) => {
        if (!state || !state.groupList) return null;
        const group = state.groupList.find((item) => item.id.S === id);
        return group ? group.name.S : null;
    },
);

export const selectCreatedByById = (id: string) => createSelector(
    selectGroupState,
    (state) => {
        if (!state || !state.groupList) return null;
        const group = state.groupList.find((item) => item.id.S === id);
        return group ? group.createdBy : null;
    },
);
