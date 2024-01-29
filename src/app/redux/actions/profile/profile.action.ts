import { createAction, props } from '@ngrx/store';
import { IUserProfile } from 'src/app/chat/models/profile.interface';

export enum ProfileActionTypes {
    GET_PROFILE = '[Profile] Get user profile',
    GET_PROFILE_SUCCESS = '[Profile] Get user profile success',
    GET_PROFILE_FAILURE = '[Profile] Get user profile failure',

    UPDATE_PROFILE = '[Profile] Update user profile',
    UPDATE_PROFILE_SUCCESS = '[Profile] Update user profile success',
    UPDATE_PROFILE_FAILURE = '[Profile] Update user profile failure',

    DELETE_PROFILE = '[Profile] Delete user profile',
    DELETE_PROFILE_SUCCESS = '[Profile] Delete user profile success',
    DELETE_PROFILE_FAILURE = '[Profile] Delete user profile failure',
}

export const getProfile = createAction(
    ProfileActionTypes.GET_PROFILE,
);

export const getProfileSuccess = createAction(
    ProfileActionTypes.GET_PROFILE_SUCCESS,
    props<{ profile: IUserProfile }>(),
);

export const getProfileFailure = createAction(
    ProfileActionTypes.GET_PROFILE_FAILURE,
    props<{ error: string }>(),
);

export const updateProfile = createAction(
    ProfileActionTypes.UPDATE_PROFILE,
    props<{ name: string }>(),
);

export const updateProfileSuccess = createAction(
    ProfileActionTypes.UPDATE_PROFILE_SUCCESS,
    props<{ name: string }>(),
);

export const updateProfileFailure = createAction(
    ProfileActionTypes.UPDATE_PROFILE_FAILURE,
    props<{ error: string }>(),
);

export const deleteProfile = createAction(
    ProfileActionTypes.DELETE_PROFILE,
);

export const deleteProfileSuccess = createAction(
    ProfileActionTypes.DELETE_PROFILE_SUCCESS,
);

export const deleteProfileFailure = createAction(
    ProfileActionTypes.DELETE_PROFILE_FAILURE,
    props<{ error: string }>(),
);
