import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckCardtypeCardListComponent } from './deck-cardtype-card-list.component';

describe('DeckCardtypeCardListComponent', () => {
  let component: DeckCardtypeCardListComponent;
  let fixture: ComponentFixture<DeckCardtypeCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckCardtypeCardListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckCardtypeCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
