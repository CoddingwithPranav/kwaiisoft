import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewritetextComponent } from './rewritetext.component';

describe('RewritetextComponent', () => {
  let component: RewritetextComponent;
  let fixture: ComponentFixture<RewritetextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewritetextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RewritetextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
