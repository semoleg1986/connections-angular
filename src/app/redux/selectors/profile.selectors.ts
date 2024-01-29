import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState, profileNode } from '../reducers/profile/profile.reducer';

export const selectProfileState = createFeatureSelector<ProfileState>(profileNode);

export const selectUserProfile = createSelector(
    selectProfileState,
    (state: ProfileState) => state.userProfile,
);

export const selectProfileLoading = createSelector(
    selectProfileState,
    (state: ProfileState) => state.loading,
);

export const selectProfileError = createSelector(
    selectProfileState,
    (state: ProfileState) => state.error,
);
