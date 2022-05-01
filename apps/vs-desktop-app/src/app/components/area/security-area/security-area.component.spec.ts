import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAreaComponent } from './security-area.component';

describe('SecurityAreaComponent', () => {
  let component: SecurityAreaComponent;
  let fixture: ComponentFixture<SecurityAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurityAreaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
