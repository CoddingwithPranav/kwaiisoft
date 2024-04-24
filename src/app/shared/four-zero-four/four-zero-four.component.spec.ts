import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourZeroFourComponent } from './four-zero-four.component';

describe('FourZeroFourComponent', () => {
  let component: FourZeroFourComponent;
  let fixture: ComponentFixture<FourZeroFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourZeroFourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FourZeroFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
