import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom, filter, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileService } from 'src/app/chat/services/profile.service';
import { 
    deleteProfile, 
    deleteProfileFailure, 
    deleteProfileSuccess, 
    getProfile, 
    getProfileFailure, 
    getProfileSuccess, 
    updateProfile, 
    updateProfileFailure, 
    updateProfileSuccess 
} from '../../actions/profile/profile.action';
import { Store, select } from '@ngrx/store';
import { ProfileState } from '../../reducers/profile/profile.reducer';
import { selectUserProfile } from '../../selectors/profile.selectors';
import { ToastService } from 'src/app/core/services/toast.service';
import { LogService } from 'src/app/auth/services/log.service';
import { Router } from '@angular/router';

@Injectable()
export class ProfileEffects {
    constructor(
        private actions$: Actions,
        private profileService: ProfileService,
        private logService: LogService,
        private store: Store<ProfileState>,
        private router: Router,
        private toats: ToastService,
    ) {}

    loadProfile$ = createEffect(() => { return this.actions$.pipe(
        ofType(getProfile),
        withLatestFrom(this.store.pipe(select(selectUserProfile))),
        filter(([action, userProfile]) => !userProfile),
        mergeMap(() =>
            this.profileService.getProfileData().pipe(
                map(profile => {
                    this.store.dispatch(getProfileSuccess({ profile }));
                    return getProfileSuccess({ profile });
                }),
                catchError(error => {
                    const message = error.error.message || 'Connection error: Please check your internet connection';
                    let action;
                    if (error.status === 400 && error.error && error.error.type === 'InvalidUserDataException') {
                        action = getProfileFailure({ error: 'Invalid user data' });
                    } else if (error.status === 400 && error.error && error.error.type === 'InvalidTokenException') {
                        action = getProfileFailure({ error: 'Invalid token' });
                    } else if (error.status === 400 && error.error && error.error.type === 'InvalidIDException') {
                        action = getProfileFailure({ error: 'User not found' });
                    } else if (error.status === 0) {
                        action = getProfileFailure({ error: 'Connection error: Please check your internet connection' });
                    } else {
                        action = getProfileFailure({ error: 'Unknown error' });
                    }
                    this.toats.showError(message);
                    this.store.dispatch(action);
                    return of(action);
                })
            )
        )) 
    });

    updateProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateProfile),
            mergeMap(({ name }) =>
                this.profileService.updateProfileData({name}).pipe(
                    map(() => {
                        this.store.dispatch(updateProfileSuccess({ name }));
                        this.toats.showSuccess('Name updated successfully')
                        return updateProfileSuccess({ name });
                    }),
                    catchError((error) => {
                        let action;
                        let message = 'Something is wrong';
                    
                        switch (error.status) {
                            case 400:
                                if (error.error && error.error.type) {
                                    switch (error.error.type) {
                                        case 'InvalidTokenException':
                                            message = 'Header should contain "Authorization" parameter with Bearer code.';
                                            break;
                                        case 'InvalidFormDataException':
                                            switch (error.error.message) {
                                                case 'Invalid multipart/form-data request':
                                                    message = 'Invalid multipart/form-data request';
                                                    break;
                                                case 'Invalid post data':
                                                    message = 'Invalid post data';
                                                    break;
                                                case 'You have to pass "name" field.':
                                                    message = 'You have to pass "name" field.';
                                                    break;
                                                default:
                                                    message = 'Sent form data is corrupted';
                                                    break;
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                action = updateProfileFailure({ error: message });
                                break;
                            default:
                                break;
                        }
                    
                        this.toats.showError(message);
                        this.store.dispatch(action || updateProfileFailure({ error: message }));
                        return of(action || updateProfileFailure({ error: message }));
                    })                    
                )
            )
        )
    );

    logoutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProfile),
            mergeMap(() =>
                this.logService.logoutUser().pipe(
                    map(()=>{
                        localStorage.removeItem('userData');
                        localStorage.removeItem('existGroup');
                        this.toats.showSuccess('Logout successful');
                        this.router.navigate(['/auth']);
                        return deleteProfileSuccess();
                    }),
                    catchError((error) => {
                        let errorMessage = error.error.message || error.message;
                       
                        this.toats.showError(errorMessage);
                        localStorage.removeItem('userData');
                        this.router.navigate(['/']);
                        return of(deleteProfileFailure({ error: errorMessage }));
                    })
                )
            )
        )
    )
    

}
