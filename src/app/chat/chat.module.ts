import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { CreateGroupComponent } from './components/modal/create-group/create-group.component';
import { DeleteGroupComponent } from './components/modal/delete-group/delete-group.component';
import { ChatRoomPageComponent } from './pages/chat-room-page/chat-room-page.component';
import { GroupRoomPageComponent } from './pages/group-room-page/group-room-page.component';

@NgModule({
    declarations: [
        HomePageComponent,
        ProfileComponent,
        ProfilePageComponent,
        GroupListComponent,
        ChatListComponent,
        CreateGroupComponent,
        DeleteGroupComponent,
        ChatRoomPageComponent,
        GroupRoomPageComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ChatRoutingModule,
    ],
})
export class ChatModule { }
