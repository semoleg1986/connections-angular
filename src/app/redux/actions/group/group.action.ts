import { createAction, props } from '@ngrx/store';
import { IGroupData, IGroupItem } from 'src/app/chat/models/group.interface';

export enum GroupActionTypes {
    GET_GROUP_LIST = '[Group] Get group list',
    GET_GROUP_SUCCESS = '[Group] Get group list success',
    GET_GROUP_FAILURE = '[Group] Get group list failure',

    CREATE_GROUP = '[Group] Create new group',
    CREATE_GROUP_SUCCESS = '[Group] Create new group success',
    CREATE_GROUP_FAILURE = '[Group] Create new group failure',

    UPDATE_GROUP = '[Group] Update groups',
    UPDATE_GROUP_SUCCESS = '[Group] Update groups success',
    UPDATE_GROUP_FAILURE = '[Group] Update groups failure',

    DELETE_GROUP = '[Group] Delete group',
    DELETE_GROUP_SUCCESS = '[Group] Delete group success',
    DELETE_GROUP_FAILURE = '[Group] Delete group failure',
}

export const getGroupList = createAction(
    GroupActionTypes.GET_GROUP_LIST,
);

export const getGroupListSuccess = createAction(
    GroupActionTypes.GET_GROUP_SUCCESS,
    props<{ group: IGroupData }>(),
);

export const getGroupListFailure = createAction(
    GroupActionTypes.GET_GROUP_FAILURE,
    props<{ error: string }>(),
);

export const createGroup = createAction(
    GroupActionTypes.CREATE_GROUP,
    props<{ name: string }>(),
);

export const createGroupSuccess = createAction(
    GroupActionTypes.CREATE_GROUP_SUCCESS,
    props<{ group: IGroupItem }>(),
);

export const createGroupFailure = createAction(
    GroupActionTypes.CREATE_GROUP_FAILURE,
    props<{ error: string }>(),
);

export const updateGroupList = createAction(
    GroupActionTypes.UPDATE_GROUP,
);

export const updateGroupListSuccess = createAction(
    GroupActionTypes.UPDATE_GROUP_SUCCESS,
    props<{ group: IGroupData }>(),
);

export const updateGroupListFailure = createAction(
    GroupActionTypes.UPDATE_GROUP_FAILURE,
    props<{ error: string }>(),
);

export const deleteGroup = createAction(
    GroupActionTypes.DELETE_GROUP,
    props<{ groupId: string }>(),
);

export const deleteGroupSuccess = createAction(
    GroupActionTypes.DELETE_GROUP_SUCCESS,
    props<{ groupId: string }>(),
);

export const deleteGroupFailure = createAction(
    GroupActionTypes.DELETE_GROUP_FAILURE,
    props<{ error: string }>(),
);
