import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackOpenAreaComponent } from './stack-open-area.component';

describe('StackOpenAreaComponent', () => {
  let component: StackOpenAreaComponent;
  let fixture: ComponentFixture<StackOpenAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StackOpenAreaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackOpenAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
