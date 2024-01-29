import { createReducer, on } from '@ngrx/store';
import { IUserProfile } from 'src/app/chat/models/profile.interface';
import {
    deleteProfile,
    deleteProfileFailure,
    deleteProfileSuccess,
    getProfile, getProfileFailure, getProfileSuccess, updateProfile, updateProfileFailure, updateProfileSuccess,
} from '../../actions/profile/profile.action';

export const profileNode = 'profile';

export interface ProfileState {
    userProfile: IUserProfile | null;
    loading: boolean;
    error: string | null;
}

export const initialProfileState: ProfileState = {
    userProfile: null,
    loading: false,
    error: null,
};

export const profileReducer = createReducer(
    initialProfileState,

    on(
        getProfile,
        updateProfile,
        deleteProfile,
        (state: ProfileState): ProfileState => ({
            ...state,
            loading: true,
            error: null,
        }),
    ),

    on(getProfileSuccess, (state: ProfileState, { profile }): ProfileState => ({
        ...state,
        userProfile: profile,
        loading: false,
    })),

    on(
        getProfileFailure,
        updateProfileFailure,
        deleteProfileFailure,
        (state: ProfileState, { error }): ProfileState => ({
            ...state,
            loading: false,
            error,
        }),
    ),

    on(
        updateProfileSuccess,
        (state, { name }): ProfileState => ({
            ...state,
            userProfile: state.userProfile ? { ...state.userProfile, name: { S: name } } : null,
            loading: false,
            error: null,
        }),
    ),

    on(
        deleteProfileSuccess,
        (state): ProfileState => ({
            ...state,
            userProfile: null,
            loading: false,
        }),
    ),

    on(
        deleteProfileFailure,
        (state: ProfileState, { error }): ProfileState => ({
            ...state,
            loading: false,
            userProfile: null,
            error,
        }),
    ),
);
