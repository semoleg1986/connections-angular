import { Injectable } from '@angular/core';
import {
    Actions, createEffect, ofType, concatLatestFrom,
} from '@ngrx/effects';
import {
    catchError, map, mergeMap, withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/core/services/toast.service';
import { Router } from '@angular/router';
import { PeopleMessagesService } from 'src/app/chat/services/people-messages.service';
import { selectGroupMessageState } from '../../selectors/group-message.selectors';
import { getPeopleMessages, getPeopleMessagesFailure, getPeopleMessagesSuccess, sendPeopleMessage, sendPeopleMessageFailure, updatePeopleMessages } from '../../actions/chat-messages/chat-messages.action';
import { selectChatMessageState } from '../../selectors/chat-message.selectors';

@Injectable()
export class PeopleMessageEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router,
        private chatMessagesService: PeopleMessagesService,
        private toast: ToastService,
    ) {}

    loadGroupMessages$ = createEffect(() => this.actions$.pipe(
            ofType(getPeopleMessages),
            concatLatestFrom(() => this.store.select(selectChatMessageState)),
            mergeMap(([{ conversationId }, state]) => this.chatMessagesService.getMessages(conversationId).pipe(
                map((messages) => getPeopleMessagesSuccess({ conversationId, messages })),
                catchError((error) => {
                    const errorMessage = error.error.message || error.message;
                    this.toast.showError(errorMessage);
                    // this.router.navigate(['/']);
                    return of(getPeopleMessagesFailure({ error: error?.message || 'Unknown error' }));
                }),
            )),
        ),);

    updateGroupMessages$ = createEffect(() => this.actions$.pipe(
            ofType(updatePeopleMessages),
            withLatestFrom(this.store.select(selectGroupMessageState)),
            mergeMap(([{ conversationId }, state]) => {
                return this.chatMessagesService.getMessages(conversationId).pipe(
                    map((newMessages) => {
                        this.toast.showSuccess('Group messages updated successfully');
                        return getPeopleMessagesSuccess({ conversationId, messages: newMessages });
                    }),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        this.toast.showError(errorMessage);
                        this.router.navigate(['/']);
                        return of(getPeopleMessagesFailure({ error: error?.message || 'Unknown error' }));
                    }),
                );
            }),
        ));

    sendGroupMessage$ = createEffect(() => this.actions$.pipe(
            ofType(sendPeopleMessage),
            mergeMap(({ conversationId, message, since }) =>
                this.chatMessagesService.sendMessage(conversationId, message).pipe(
                    map(() => {
                        this.toast.showSuccess('Group message sent successfully');
                        return updatePeopleMessages({ conversationId });
                    }),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        this.toast.showError(errorMessage);
                        return of(sendPeopleMessageFailure({ error: error?.message || 'Unknown error' }));
                    })
                )
            )
        ));
}
