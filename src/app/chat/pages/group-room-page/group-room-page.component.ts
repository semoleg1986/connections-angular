import {
    Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
    Observable, Subject, interval, of,
} from 'rxjs';
import {
    map, startWith, switchMap, takeUntil, takeWhile, tap,
} from 'rxjs/operators';
import { ToastService } from 'src/app/core/services/toast.service';
import { selectGroupExistsByIdBoolean, selectGroupNameById } from 'src/app/redux/selectors/group.selectors';
import { getGroupMessages, sendGroupMessage, updateGroupMessages } from 'src/app/redux/actions/group-message/group-message.action';
import { selectMessagesByGroupId } from 'src/app/redux/selectors/group-message.selectors';
import { resetTimer, setStartTime } from 'src/app/redux/actions/timer/timer.action';
import { selectTimerById } from 'src/app/redux/selectors/timer.selectors';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IMessageItem } from '../../models/group.interface';
import { DeleteGroupComponent } from '../../components/modal/delete-group/delete-group.component';

@Component({
    selector: 'app-group-room-page',
    templateUrl: './group-room-page.component.html',
    styleUrls: ['./group-room-page.component.scss'],
})
export class GroupRoomPageComponent implements OnInit, OnDestroy {
    @Input() groupId: string | undefined;

    public groupList$: Observable<IMessageItem[] | null> | undefined;

    public userName$: Observable<string | null> | undefined;

    private destroy$: Subject<void> = new Subject<void>();

    public groupName$: Observable<string | null> | undefined;

    timerData$: Observable<number | null> = new Observable<number | null>();

    currentTimeInSeconds: number = Math.floor(Date.now() / 1000);

    private userData = localStorage.getItem('userData');

    private existGroup = localStorage.getItem('existGroup');

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
        this.getNameGroup();
        this.initTimer();
    }

    private initTimer() {
        this.timerData$ = this.store.select(selectTimerById('groupChat')).pipe(
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
                                this.initUpdateGroupList();
                            },
                        }),
                    );
                }
                return of(null);
            }),
        );
    }

    get message() {
        return this.sendForm?.get('message');
    }

    private initTimerReset() {
        this.store.dispatch(resetTimer({ groupId: 'groupChat' }));
    }

    private initExistRoute() {
        this.route.params.pipe(
            takeUntil(this.destroy$),
        ).subscribe((params) => {
            const groupId = params['groupID'];
            this.store.select(selectGroupExistsByIdBoolean(groupId)).pipe(
                takeUntil(this.destroy$),
            ).subscribe((exists) => {
                if (!exists) {
                    this.router.navigate(['/']);
                    this.toast.showError('This group does not exist');
                } else {
                    this.groupId = groupId;
                    this.getGroupMessagesIfGroupIdDefined();
                }
            });
        });
    }

    private getGroupMessagesIfGroupIdDefined() {
        const since = Date.now();

        if (this.groupId) {
            this.store.dispatch(getGroupMessages({ groupID: this.groupId, since }));
            this.groupList$ = this.store.select(selectMessagesByGroupId, { groupID: this.groupId })
                .pipe(takeUntil(this.destroy$));
        }
    }

    public getNameGroup() {
        if (this.groupId) {
            this.groupName$ = this.store.select(selectGroupNameById(this.groupId));
        }
    }

    public updateGroup(): void {
        this.timer();
    }

    private timer() {
        const startTime = Date.now() + 60 * 1000;
        this.isTimerRunning = true;
        this.store.dispatch(setStartTime({ groupId: 'groupChat', startTime }));
    }

    private initUpdateGroupList() {
        const since = Date.now();

        if (this.groupId) {
            this.store.dispatch(updateGroupMessages({ groupID: this.groupId, since }));
        }
    }

    public send(): void {
        if (this.sendForm.invalid) {
            return;
        }

        const messageGroup = this.sendForm.value.message as string;
        if (this.groupId) {
            const since = Date.now();
            this.store.dispatch(sendGroupMessage({
                groupID: this.groupId,
                message: messageGroup,
                since,
            }));
        }
        this.sendForm.reset();
    }

    public isCurrentUser(id: string): boolean {
        const userDataObj = this.userData ? JSON.parse(this.userData) : null;
        const currentUser = userDataObj ? userDataObj.uid : null;
        return id === currentUser;
    }

    public isCurrentUserOwner(): boolean {
        const userDataObj = this.userData ? JSON.parse(this.userData) : null;
        const existGroupObj = this.existGroup ? JSON.parse(this.existGroup) : null;
        const currentUser = userDataObj ? userDataObj.uid : null;
        const currentGroupOwner = existGroupObj ? existGroupObj.createdBy.S : null;
        return currentUser === currentGroupOwner;
    }

    public openDeleteDialog(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dialogRef = this.dialog.open(DeleteGroupComponent, {
            width: '350px',
            height: '150px',
            data: {
                groupId: this.groupId,
                caller: false,
            },
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.sendForm.reset();
    }
}
