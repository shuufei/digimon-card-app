import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvolutionOriginDialogComponent } from './add-evolution-origin-dialog.component';

describe('AddEvolutionOriginDialogComponent', () => {
  let component: AddEvolutionOriginDialogComponent;
  let fixture: ComponentFixture<AddEvolutionOriginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEvolutionOriginDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEvolutionOriginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
