import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckImportDialogComponent } from './deck-import-dialog.component';

describe('DeckImportDialogComponent', () => {
  let component: DeckImportDialogComponent;
  let fixture: ComponentFixture<DeckImportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckImportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
