import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandCardViewDialogComponent } from './expand-card-view-dialog.component';

describe('ExpandCardViewDialogComponent', () => {
  let component: ExpandCardViewDialogComponent;
  let fixture: ComponentFixture<ExpandCardViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpandCardViewDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandCardViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
