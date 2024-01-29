import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getChatList, updateChatList } from 'src/app/redux/actions/chat/chat.actions';
import { selectChat } from 'src/app/redux/selectors/chat.selectors';
import {
    Observable, Subject, interval, map, of, startWith, switchMap, takeWhile, tap,
} from 'rxjs';
import { resetTimer, setStartTime } from 'src/app/redux/actions/timer/timer.action';
import { selectTimerById } from 'src/app/redux/selectors/timer.selectors';
import { createConversation, getConversationList, updateConversationList } from 'src/app/redux/actions/conversation/conversation.action';
import { selectCompanionById, selectConversationList } from 'src/app/redux/selectors/conv.selectors';
import { Router } from '@angular/router';
import { IChatItem } from '../../models/chat.interface';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit, OnDestroy {
    private userData = localStorage.getItem('userData');

    timerData$: Observable<number | null> = new Observable<number | null>();

    public chatList$: Observable<IChatItem[] | null > | undefined;

    private destroy$: Subject<void> = new Subject<void>();

    isTimerRunning = false;

    constructor(
        private store: Store,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.initGetChatList();
        this.initGetConvList();
        this.initGroupListSubscription();
        this.initTimer();
    }

    private initTimer() {
        this.timerData$ = this.store.select(selectTimerById('chat')).pipe(
            switchMap((startTime) => {
                if (startTime) {
                    return interval(1000).pipe(
                        map(() => {
                            const currentTime = Date.now();
                            const remainingTime = Math.floor((startTime - currentTime) / 1000);
                            return Math.max(0, remainingTime);
                        }),
                        takeWhile((remainingTime) => remainingTime > 0),
                        startWith(Math.floor((startTime - Date.now()) / 1000)),
                        tap({
                            complete: () => {
                                this.initUpdateChatList();
                                this.initUpdateConvList();
                                this.initTimerReset();
                            },
                        }),
                    );
                }
                return of(null);
            }),
        );
    }

    private initGetChatList() {
        this.store.dispatch(getChatList());
    }

    private initGetConvList() {
        this.store.dispatch(getConversationList());
    }

    private initUpdateConvList() {
        this.store.dispatch(updateConversationList());
    }

    private initGroupListSubscription() {
        this.chatList$ = this.store.select(selectChat);
    }

    private initUpdateChatList() {
        this.store.dispatch(updateChatList());
    }

    private initTimerReset() {
        this.store.dispatch(resetTimer({ groupId: 'chat' }));
    }

    public updateChat(): void {
        this.timer();
    }

    private timer() {
        const startTime = Date.now() + 60 * 1000;
        this.isTimerRunning = true;
        this.store.dispatch(setStartTime({ groupId: 'chat', startTime }));
    }

    public isCurrentUser(item: IChatItem): boolean {
        const userDataObj = this.userData ? JSON.parse(this.userData) : null;
        const currentUser = userDataObj ? userDataObj.uid : null;
        return item.uid.S !== currentUser;
    }

    public isMatchingConversation(uid: string): boolean {
        const convList = this.store.select(selectConversationList);
        let exists = false;

        convList.subscribe((conversations) => {
            if (conversations) {
                exists = conversations.some((conversation) => conversation.companionID.S === uid);
            }
        });

        return exists;
    }

    public conversationCreate(companion: string):void {
        // eslint-disable-next-line @ngrx/no-store-subscription
        this.store.select(selectCompanionById(companion)).subscribe((exist) => {
            if (exist) {
                this.router.navigate(['conversation', exist.id.S]);
            } else {
                this.store.dispatch(createConversation({ companion }));
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
