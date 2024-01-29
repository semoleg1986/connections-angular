import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, catchError, map, withLatestFrom, filter, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { ChatService } from 'src/app/chat/services/chat.service';
import { getChatList, getChatListFailure, getChatListSuccess, updateChatList, updateChatListFailure, updateChatListSuccess } from '../../actions/chat/chat.actions';
import { ToastService } from 'src/app/core/services/toast.service';
import { selectChat } from '../../selectors/chat.selectors';
import { Store, select } from '@ngrx/store';
import { IChat, IConversationItem, IConversationList } from 'src/app/chat/models/chat.interface';
import { createConversation, createConversationFailure, createConversationSuccess, getConversationList, getConversationListFailure, getConversationListSuccess, updateConversationList, updateConversationListFailure, updateConversationListSuccess } from '../../actions/conversation/conversation.action';
import { selectConversationList } from '../../selectors/conv.selectors';

@Injectable()
export class ChatEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private chatService: ChatService,
        private toast: ToastService,
        ) {}

    loadChat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getChatList),
            withLatestFrom(this.store.pipe(select(selectChat))),
            filter(([action, chatList]) => !chatList),
            mergeMap(() =>
                this.chatService.getChatList().pipe(
                    map((chatData: IChat) => getChatListSuccess({ chat: chatData.Items })),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        this.toast.showError(errorMessage);
                        return of(getChatListFailure({ error }));
                        }),
                    ),
                ),
            )
        );

    loadConversationList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getConversationList),
            withLatestFrom(this.store.pipe(select(selectConversationList))),
            filter(([action, conversationList]) => !conversationList),
            mergeMap(() =>
                this.chatService.getConvList().pipe(
                    map((convData: IConversationList) =>
                        getConversationListSuccess({ conversations: convData.Items })
                    ),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        return of(getConversationListFailure({ error: errorMessage }))
                    })
                )
            )
        )
    );

    updateChat$ = createEffect(() =>
        this.actions$.pipe(ofType(updateChatList),
        mergeMap(() =>
            this.chatService.getChatList().pipe(
                map((chatData: IChat) =>  {
                    this.toast.showSuccess('Chat list update')
                    return updateChatListSuccess({ chat: chatData.Items })}),
                catchError((error) => {
                    const errorMessage = error.error.message || error.message;
                    this.toast.showError(errorMessage);
                    return of(updateChatListFailure({ error }));
                    }),
                ),
            ),
        )
    );

    updateConversationList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateConversationList),
            mergeMap(() =>
                this.chatService.getConvList().pipe(
                    map((convData) =>
                        updateConversationListSuccess(
                            { conversations: convData.Items})
                    ),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        return of(updateConversationListFailure({ error: errorMessage}))
                    })
                )
            )
        ))

    createConversation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createConversation),
            mergeMap(({ companion }) =>
                this.chatService.createConversation(companion).pipe(
                    map(({conversationID})=> {
                        const conversationItem: IConversationItem = {
                            id: { S: conversationID},
                            companionID: {S: companion}
                        }
                        return createConversationSuccess({ conversationItem })
                    }),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        return of(createConversationFailure({ error: errorMessage}))
                    })
                )
            )
        )
    
    ) 
}
