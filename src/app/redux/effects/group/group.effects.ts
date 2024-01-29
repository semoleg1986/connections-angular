import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { GroupService } from 'src/app/chat/services/group.service';
import { Store, select } from '@ngrx/store';
import { ToastService } from 'src/app/core/services/toast.service';
import { ICreateGroupResponse, IGroupData } from 'src/app/chat/models/group.interface';
import {
    createGroup,
    createGroupFailure,
    createGroupSuccess,
    deleteGroup,
    deleteGroupFailure,
    deleteGroupSuccess,
    getGroupList,
    getGroupListFailure,
    getGroupListSuccess,
    updateGroupList,
    updateGroupListFailure,
    updateGroupListSuccess,
} from '../../actions/group/group.action';
import { GroupState } from '../../reducers/group/group.reducer';
import { selectGroup } from '../../selectors/group.selectors';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupService } from 'src/app/chat/services/create-group.service';

@Injectable()
export class GroupEffects {
    constructor(
        private actions$: Actions,
        private groupService: GroupService,
        private createService: CreateGroupService,
        private store: Store<GroupState>,
        private dialogRef: MatDialog,
        private toast: ToastService,
    ) {}

    loadGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getGroupList),
            withLatestFrom(this.store.pipe(select(selectGroup))),
            filter(([action, groupList]) => !groupList),
            mergeMap(() =>
                this.groupService.getGroupList().pipe(
                    map((groupData: IGroupData) => getGroupListSuccess({ group: groupData })),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        this.toast.showError(errorMessage);
                        return of(getGroupListFailure({ error }));
                    }),
                ),
            ),
        )
    );

    updateGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateGroupList),
            mergeMap(() =>
                this.groupService.getGroupList().pipe(
                    map((groupData: IGroupData) => {
                        this.toast.showSuccess('Group list update');
                        
                        return updateGroupListSuccess({ group: groupData })
                    }
                    ),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        this.toast.showError(errorMessage);
                        return of(updateGroupListFailure({ error }));
                    }),
                ),
            ),
        )
    );

    createGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createGroup),
            mergeMap((action) =>
                this.groupService.createGroup(action.name).pipe(
                    map(({groupID}) => {
                        this.toast.showSuccess('Group created successfully');
                        this.dialogRef.closeAll();
                        return createGroupSuccess({
                            group: this.createService.createGroupItem(groupID, action.name)
                        });
                    }),
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        this.toast.showError(errorMessage);
                        return of(createGroupFailure({ error }));
                    }),
                ),
            ),
        )
    );

    deleteGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteGroup),
            mergeMap(({ groupId }) =>
                this.groupService.deleteGroup(groupId).pipe(
                    map(() => {
                        this.toast.showSuccess('Group deleted successfully');
                        return deleteGroupSuccess({ groupId })
                    }), 
                    catchError((error) => {
                        const errorMessage = error.error.message || error.message;
                        this.toast.showError(errorMessage);
                        return of(deleteGroupFailure({ error }))
                    }) 
                )
            )
        )
    );
}
