import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
    Observable, Subject, interval, map, of, startWith, switchMap, takeUntil, takeWhile, tap,
} from 'rxjs';
import { getPeopleMessages, sendPeopleMessage, updatePeopleMessages } from 'src/app/redux/actions/chat-messages/chat-messages.action';
import { selectMessagesByChatId } from 'src/app/redux/selectors/chat-message.selectors';
import { selectExistsByIdBoolean } from 'src/app/redux/selectors/conv.selectors';
import { ToastService } from 'src/app/core/services/toast.service';
import { selectTimerById } from 'src/app/redux/selectors/timer.selectors';
import { resetTimer, setStartTime } from 'src/app/redux/actions/timer/timer.action';
import { IMessageItem } from '../../models/group.interface';

@Component({
    selector: 'app-chat-room-page',
    templateUrl: './chat-room-page.component.html',
    styleUrls: ['./chat-room-page.component.scss'],
})
export class ChatRoomPageComponent implements OnInit, OnDestroy {
    conversationId: string | undefined;

    public messagesList$: Observable<IMessageItem[] | null> | undefined;

    private destroy$: Subject<void> = new Subject<void>();

    private userData = localStorage.getItem('userData');

    timerData$: Observable<number | null> = new Observable<number | null>();

    currentTimeInSeconds: number = Math.floor(Date.now() / 1000);

    isTimerRunning = false;

    sendForm = this.fb.group({
        message: ['', [
            Validators.required,
            Validators.minLength(2),
        ]],
    });

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store,
        private fb: FormBuilder,
        private toast: ToastService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.initExistRoute();
        // this.getNameGroup();
        this.initTimer();
        // this.scrollToBottom();
    }

    private initTimer() {
        this.timerData$ = this.store.select(selectTimerById('privateChat')).pipe(
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
                                this.initTimerReset();
                                this.initMessages();
                            },
                        }),
                    );
                }
                return of(null);
            }),
        );
    }

    private initTimerReset() {
        this.store.dispatch(resetTimer({ groupId: 'privateChat' }));
    }

    private initMessages() {
        const since = Date.now();

        if (this.conversationId) {
            this.store.dispatch(updatePeopleMessages({ conversationId: this.conversationId, since }));
            this.messagesList$ = this.store.select(selectMessagesByChatId, { conversationId: this.conversationId })
                .pipe(takeUntil(this.destroy$));
        }
    }

    private initExistRoute() {
        this.route.params.pipe(
            takeUntil(this.destroy$),
        ).subscribe((params) => {
            const conversationId = params['conversationID'];
            this.store.select(selectExistsByIdBoolean(conversationId)).pipe(
                takeUntil(this.destroy$),
            ).subscribe((exists) => {
                if (!exists) {
                    this.router.navigate(['/']);
                    this.toast.showError('This chat does not exist');
                } else {
                    this.conversationId = conversationId;
                    this.getChatMessagesIfGroupIdDefined();
                }
            });
        });
    }

    private getChatMessagesIfGroupIdDefined() {
        const since = Date.now();

        if (this.conversationId) {
            this.store.dispatch(getPeopleMessages({ conversationId: this.conversationId, since }));
            this.messagesList$ = this.store.select(selectMessagesByChatId, { conversationId: this.conversationId })
                .pipe(takeUntil(this.destroy$));
        }
    }

    public isCurrentUser(id: string): boolean {
        const userDataObj = this.userData ? JSON.parse(this.userData) : null;
        const currentUser = userDataObj ? userDataObj.uid : null;
        return id === currentUser;
    }

    public send(): void {
        if (this.sendForm.invalid) {
            return;
        }

        const messageGroup = this.sendForm.value.message as string;
        if (this.conversationId) {
            const since = Date.now();
            this.store.dispatch(sendPeopleMessage({
                conversationId: this.conversationId,
                message: messageGroup,
                since,
            }));
        }
        this.sendForm.reset();
    }

    public updateGroup(): void {
        this.timer();
    }

    private timer() {
        const startTime = Date.now() + 60 * 1000;
        this.isTimerRunning = true;
        this.store.dispatch(setStartTime({ groupId: 'privateChat', startTime }));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.sendForm.reset();
    }
}
