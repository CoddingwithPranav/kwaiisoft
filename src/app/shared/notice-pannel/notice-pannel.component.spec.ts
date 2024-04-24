import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticePannelComponent } from './notice-pannel.component';

describe('NoticePannelComponent', () => {
  let component: NoticePannelComponent;
  let fixture: ComponentFixture<NoticePannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticePannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoticePannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
