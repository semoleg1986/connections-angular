import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { NonPageComponent } from './pages/non-page/non-page.component';
import { reducers, metaReducers } from '../redux/reducers';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProfileEffects } from '../redux/effects/profile/profile.effects';
import { GroupEffects } from '../redux/effects/group/group.effects';
import { ChatEffects } from '../redux/effects/chat/chat.effects';
import { GroupMessageEffects } from '../redux/effects/group-message/group-message.effects';
import { PeopleMessageEffects } from '../redux/effects/chat-message/chat-message.effects';

@NgModule({
    declarations: [
        HeaderComponent,
        NonPageComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot(
            reducers,
            {
                metaReducers,
                runtimeChecks: {
                    strictStateImmutability: true,
                    strictActionImmutability: true,
                },
            },
        ),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        EffectsModule.forRoot([
            ProfileEffects,
            GroupEffects,
            ChatEffects,
            GroupMessageEffects,
            PeopleMessageEffects,
        ]),
    ],
    exports: [
        HeaderComponent,
        NonPageComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
})
export class CoreModule { }
