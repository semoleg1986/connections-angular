import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { GroupMessagesService } from 'src/app/chat/services/group-messages.service';
import { Store } from '@ngrx/store';
import { selectGroupMessageState } from '../../selectors/group-message.selectors';
import {
    getGroupMessages,
    getGroupMessagesFailure,
    getGroupMessagesSuccess,
    sendGroupMessage,
    sendGroupMessageFailure,
    sendGroupMessageSuccess,
    updateGroupMessages
} from '../../actions/group-message/group-message.action';
import { ToastService } from 'src/app/core/services/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class GroupMessageEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router,
        private groupMessagesService: GroupMessagesService,
        private toast: ToastService,
    ) {}

    loadGroupMessages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getGroupMessages),
            withLatestFrom(this.store.select(selectGroupMessageState)),
            mergeMap(([{ groupID }, state]) => {
                return this.groupMessagesService.getGroupList(groupID).pipe(
                    map((messages) => {
                        return getGroupMessagesSuccess({ groupID, messages });
                    }),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        this.toast.showError(errorMessage);
                        this.router.navigate(['/']);
                        return of(getGroupMessagesFailure({ error: error?.message || 'Unknown error' }));
                    }),
                );
            }),
        )
    );

    updateGroupMessages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateGroupMessages),
            withLatestFrom(this.store.select(selectGroupMessageState)),
            mergeMap(([{ groupID }, state]) => {
                return this.groupMessagesService.getGroupList(groupID).pipe(
                    map((newMessages) => {
                        this.toast.showSuccess('Group messages updated successfully');
                        return getGroupMessagesSuccess({ groupID, messages: newMessages });
                    }),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        this.toast.showError(errorMessage);
                        this.router.navigate(['/']);
                        return of(getGroupMessagesFailure({ error: error?.message || 'Unknown error' }));
                    }),
                );
            }),
        )
    );

    sendGroupMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendGroupMessage),
            mergeMap(({ groupID, message, since }) =>
                this.groupMessagesService.sendGroupMessage(groupID, message).pipe(
                    map(() => {
                        this.toast.showSuccess('Group message sent successfully');
                        return updateGroupMessages({ groupID });
                    }),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        this.toast.showError(errorMessage);
                        return of(sendGroupMessageFailure({ error: error?.message || 'Unknown error' }));
                    })
                )
            )
        )
    );
}
