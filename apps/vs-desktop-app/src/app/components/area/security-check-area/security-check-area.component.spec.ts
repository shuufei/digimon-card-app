import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityCheckAreaComponent } from './security-check-area.component';

describe('SecurityCheckAreaComponent', () => {
  let component: SecurityCheckAreaComponent;
  let fixture: ComponentFixture<SecurityCheckAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityCheckAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityCheckAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
