import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashConfirmDialogComponent } from './trash-confirm-dialog.component';

describe('TrashConfirmDialogComponent', () => {
  let component: TrashConfirmDialogComponent;
  let fixture: ComponentFixture<TrashConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrashConfirmDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
