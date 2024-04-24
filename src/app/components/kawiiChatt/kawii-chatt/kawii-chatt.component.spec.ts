import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KawiiChattComponent } from './kawii-chatt.component';

describe('KawiiChattComponent', () => {
  let component: KawiiChattComponent;
  let fixture: ComponentFixture<KawiiChattComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KawiiChattComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KawiiChattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
