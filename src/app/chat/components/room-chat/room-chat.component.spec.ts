import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomChatComponent } from './room-chat.component';

describe('RoomChatComponent', () => {
  let component: RoomChatComponent;
  let fixture: ComponentFixture<RoomChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomChatComponent]
    });
    fixture = TestBed.createComponent(RoomChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
