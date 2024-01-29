import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { GroupRoomPageComponent } from './pages/group-room-page/group-room-page.component';
import { ChatRoomPageComponent } from './pages/chat-room-page/chat-room-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
    },
    {
        path: 'group/:groupID',
        component: GroupRoomPageComponent,
    },
    {
        path: 'conversation/:conversationID',
        component: ChatRoomPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChatRoutingModule { }
