import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeminiChatComponent } from './gemini-chat.component';

describe('GeminiChatComponent', () => {
  let component: GeminiChatComponent;
  let fixture: ComponentFixture<GeminiChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeminiChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeminiChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
