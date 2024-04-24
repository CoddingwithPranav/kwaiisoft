import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootomNavigationComponent } from './bootom-navigation.component';

describe('BootomNavigationComponent', () => {
  let component: BootomNavigationComponent;
  let fixture: ComponentFixture<BootomNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootomNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootomNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
