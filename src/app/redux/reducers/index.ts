import { isDevMode } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ProfileState, profileNode, profileReducer } from './profile/profile.reducer';
import { GroupState, groupNode, groupReducer } from './group/group.reducer';
import { TimerState, timerNode, timerReducer } from './timer/timer.reducer';
import { ChatState, chatNode, chatReducer } from './chat/chat.reducers';
import { ConversationState, conversationNode, conversationReducer } from './conversation/conversation.reducer';
import { GroupMessageState, groupMessageNode, groupMessageReducer } from './group-message/group-message.reducer';
import { ChatMessageState, chatMessageNode, chatMessageReducer } from './chat-message/chat-message.reducer';

export interface State {
    [profileNode]: ProfileState,
    [groupNode]: GroupState,
    [chatNode]: ChatState,
    [timerNode]: TimerState,
    [conversationNode]: ConversationState,
    [groupMessageNode]: GroupMessageState,
    [chatMessageNode]: ChatMessageState,
}

export const reducers: ActionReducerMap<State> = {
    [profileNode]: profileReducer as ActionReducer<ProfileState>,
    [groupNode]: groupReducer as ActionReducer<GroupState>,
    [chatNode]: chatReducer as ActionReducer<ChatState>,
    [timerNode]: timerReducer as ActionReducer<TimerState>,
    [conversationNode]: conversationReducer as ActionReducer<ConversationState>,
    [groupMessageNode]: groupMessageReducer as ActionReducer<GroupMessageState>,
    [chatMessageNode]: chatMessageReducer as ActionReducer<ChatMessageState>,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
