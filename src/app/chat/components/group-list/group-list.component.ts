import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    Observable, Subject, interval, map, of, startWith, switchMap, takeWhile, tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { getGroupList, updateGroupList } from 'src/app/redux/actions/group/group.action';
import { selectGroup, selectGroupExistsByIdBoolean, selectGroupLoading } from 'src/app/redux/selectors/group.selectors';
import { MatDialog } from '@angular/material/dialog';
import { resetTimer, setStartTime } from 'src/app/redux/actions/timer/timer.action';
import { selectTimerById } from 'src/app/redux/selectors/timer.selectors';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { IGroupItem } from '../../models/group.interface';
import { CreateGroupComponent } from '../modal/create-group/create-group.component';
import { DeleteGroupComponent } from '../modal/delete-group/delete-group.component';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public groupList$: Observable<IGroupItem[] | null > | undefined;

    public loading$: Observable<boolean> | undefined;

    private userData = localStorage.getItem('userData');

    timerData$: Observable<number | null> = new Observable<number | null>();

    currentTimeInSeconds: number = Math.floor(Date.now() / 1000);

    isTimerRunning = false;

    constructor(
        private store: Store,
        private router: Router,
        private dialog: MatDialog,
        private toast: ToastService,
    ) { }

    ngOnInit(): void {
        this.initGroupLoading();
        this.initGroupListSubscription();
        this.initGetGroupList();
        this.initTimer();
    }

    private initTimer() {
        this.timerData$ = this.store.select(selectTimerById('group')).pipe(
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
                                this.initUpdateGroupList();
                                this.initTimerReset();
                            },
                        }),
                    );
                }
                return of(null);
            }),
        );
    }

    private initGetGroupList() {
        this.store.dispatch(getGroupList());
    }

    private initUpdateGroupList() {
        this.store.dispatch(updateGroupList());
    }

    private initTimerReset() {
        this.store.dispatch(resetTimer({ groupId: 'group' }));
    }

    private initGroupListSubscription() {
        this.groupList$ = this.store.select(selectGroup);
    }

    private initGroupLoading() {
        this.loading$ = this.store.select(selectGroupLoading);
    }

    public openCreateDialog(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dialogRef = this.dialog.open(CreateGroupComponent, {
            width: '350px',
            height: '250px',
        });
    }

    public openDeleteDialog(groupId: string): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dialogRef = this.dialog.open(DeleteGroupComponent, {
            width: '350px',
            height: '150px',
            data: {
                groupId,
                caller: true,
            },
        });
        console.log(groupId);
    }

    public updateGroup(): void {
        this.timer();
    }

    private timer() {
        const startTime = Date.now() + 60 * 1000;
        this.isTimerRunning = true;
        this.store.dispatch(setStartTime({ groupId: 'group', startTime }));
    }

    public isCurrentUserOwner(item: IGroupItem): boolean {
        const userDataObj = this.userData ? JSON.parse(this.userData) : null;
        const currentUser = userDataObj ? userDataObj.uid : null;

        return item.createdBy.S === currentUser;
    }

    public navigateToGroupDetails(groupId: IGroupItem): void {
        localStorage.setItem('existGroup', JSON.stringify(groupId));
        // eslint-disable-next-line @ngrx/no-store-subscription
        this.store.select(selectGroupExistsByIdBoolean(groupId.id.S)).subscribe((exists) => {
            if (exists) {
                this.router.navigate(['group', groupId.id.S]);
            } else {
                this.toast.showError('Group with this ID does not exist');
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
