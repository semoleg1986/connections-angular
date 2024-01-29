import { createReducer, on } from '@ngrx/store';
import { IGroupItem } from 'src/app/chat/models/group.interface';
import {
    createGroup,
    createGroupFailure,
    createGroupSuccess,
    deleteGroup,
    deleteGroupFailure,
    deleteGroupSuccess,
    getGroupList,
    getGroupListFailure,
    getGroupListSuccess,
    updateGroupList,
    updateGroupListFailure,
    updateGroupListSuccess,
} from '../../actions/group/group.action';
import { resetStore } from '../../actions/clear.action';

export const groupNode = 'group';

export interface GroupState {
    groupList: IGroupItem[] | null;
    loading: boolean;
    error: string | null;
}

export const initialGroupState: GroupState = {
    groupList: null,
    loading: false,
    error: null,
};

export const groupReducer = createReducer(
    initialGroupState,
    on(
        getGroupList,
        createGroup,
        updateGroupList,
        deleteGroup,
        (state: GroupState): GroupState => ({
            ...state,
            loading: true,
        }),
    ),

    on(
        getGroupListSuccess,
        updateGroupListSuccess,
        (state: GroupState, { group }): GroupState => ({
            ...state,
            groupList: group.Items,
            loading: false,
        }),
    ),

    on(
        createGroupSuccess,
        (state: GroupState, { group }): GroupState => ({
            ...state,
            groupList: state.groupList ? [...state.groupList, group] : [group],
            error: null,
            loading: false,
        }),
    ),

    on(
        deleteGroupSuccess,
        (state: GroupState, { groupId }): GroupState => {
            const updatedGroupList = state.groupList?.filter((group) => group.id.S !== groupId) || null;

            return {
                ...state,
                groupList: updatedGroupList,
                error: null,
                loading: false,
            };
        },
    ),

    on(
        getGroupListFailure,
        createGroupFailure,
        updateGroupListFailure,
        deleteGroupFailure,
        (state: GroupState, { error }): GroupState => ({
            ...state,
            loading: false,
            error,
        }),
    ),
    on(
        resetStore,
        (): GroupState => initialGroupState,
    ),
);
