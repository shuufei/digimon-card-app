import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityOpenAreaComponent } from './security-open-area.component';

describe('SecurityOpenAreaComponent', () => {
  let component: SecurityOpenAreaComponent;
  let fixture: ComponentFixture<SecurityOpenAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurityOpenAreaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityOpenAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
